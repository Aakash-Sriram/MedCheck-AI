import  { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/Button';

interface Drug {
  rxcui: string;
  name: string;
}

interface Interaction {
  description: string;
  severity: 'high' | 'medium' | 'low';
  source: string;
}

export function CheckDrugInteractions() {
  const [drugInput1, setDrugInput1] = useState('');
  const [drugInput2, setDrugInput2] = useState('');
//   const [foodInput, setFoodInput] = useState('');
  const [searchResults1, setSearchResults1] = useState<Drug[]>([]);
  const [searchResults2, setSearchResults2] = useState<Drug[]>([]);
  const [selectedDrug1, setSelectedDrug1] = useState<Drug | null>(null);
  const [selectedDrug2, setSelectedDrug2] = useState<Drug | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchDrug = async (query: string, setResults: (drugs: Drug[]) => void) => {
    if (!query.trim()) return;
    
    try {
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      if (data.drugGroup?.conceptGroup) {
        const drugs: Drug[] = data.drugGroup.conceptGroup
          .flatMap((group: any) => group.conceptProperties || [])
          .map((drug: any) => ({
            rxcui: drug.rxcui,
            name: drug.name
          }));
        setResults(drugs);
      }
    } catch (err) {
      setError('Failed to search for drugs. Please try again.');
    }
  };

  const checkInteractions = async () => {
    if (!selectedDrug1 || !selectedDrug2) {
      setError('Please select both medications to check for interactions.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${selectedDrug1.rxcui}+${selectedDrug2.rxcui}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.fullInteractionTypeGroup) {
        const foundInteractions: Interaction[] = data.fullInteractionTypeGroup
          .flatMap((group: { fullInteractionType?: Array<{
            interactionPair: Array<{
              description: string;
              severity: string;
            }>;
          }> }) => group.fullInteractionType || [])
          .map((interaction) => ({
            description: interaction.interactionPair[0].description,
            severity: determineSeverity(interaction.interactionPair[0].severity || 'N/A'),
            source: 'RxNorm'
          }));
        setInteractions(foundInteractions);
      } else {
        setInteractions([]);
      }
    } catch (err) {
      setError('Failed to check drug interactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const determineSeverity = (severity: string): 'high' | 'medium' | 'low' => {
    if (severity?.toLowerCase().includes('high')) return 'high';
    if (severity?.toLowerCase().includes('moderate')) return 'medium';
    return 'low';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Check Drug Interactions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Drug 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter First Drug
          </label>
          <div className="relative">
            <input
              type="text"
              value={drugInput1}
              onChange={(e) => {
                setDrugInput1(e.target.value);
                searchDrug(e.target.value, setSearchResults1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type drug name..."
            />
            {searchResults1.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
                {searchResults1.map((drug) => (
                  <li
                    key={drug.rxcui}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedDrug1(drug);
                      setDrugInput1(drug.name);
                      setSearchResults1([]);
                    }}
                  >
                    {drug.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Drug 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Second Drug
          </label>
          <div className="relative">
            <input
              type="text"
              value={drugInput2}
              onChange={(e) => {
                setDrugInput2(e.target.value);
                searchDrug(e.target.value, setSearchResults2);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type drug name..."
            />
            {searchResults2.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
                {searchResults2.map((drug) => (
                  <li
                    key={drug.rxcui}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedDrug2(drug);
                      setDrugInput2(drug.name);
                      setSearchResults2([]);
                    }}
                  >
                    {drug.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Button
          variant="primary"
          onClick={checkInteractions}
          className="flex items-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Check Interactions
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Checking interactions...</div>
      ) : interactions.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Found Interactions</h2>
          {interactions.map((interaction, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${interaction.severity === 'high' ? 'bg-red-50 border-red-200' : interaction.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${interaction.severity === 'high' ? 'text-red-800' : interaction.severity === 'medium' ? 'text-yellow-800' : 'text-blue-800'}`}>
                    Severity: {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)}
                  </p>
                  <p className="mt-2 text-gray-700">{interaction.description}</p>
                  <p className="mt-1 text-sm text-gray-500">Source: {interaction.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : selectedDrug1 && selectedDrug2 ? (
        <div className="text-center text-gray-600">
          No interactions found between these medications.
        </div>
      ) : null}
    </div>
  );
}