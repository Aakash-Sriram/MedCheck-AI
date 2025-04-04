import React, { useState, useRef } from 'react';
import { Scan, Camera } from 'lucide-react';
import { Button } from '../components/Button';

export function ScanPrescriptions() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        // For prototyping, we'll analyze this specific prescription format
        setResult('Prescription Analysis:\n\nPatient: John A. Doe, MHA, USN\nFacility: U.S.S. Neverforgotten (DD 178)\nDate: 23 Jul 99\n\nMedication:\n- Tetracycline Ampoules 15 ml\n- 120 ml\n\nInstructions:\nSig: 3ml tid ac\n\nPrescribed by: Dr. J. Doe\nExpiration Date: 21/02\n\nNote: This is a prototype demonstration. In a real application, OCR and advanced image processing would be used for prescription analysis.')
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Scan size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Scan Prescriptions
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Upload or take a photo of your prescription for instant analysis.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  capture="environment"
                />
                <Button
                  onClick={handleCameraClick}
                  variant="primary"
                  className="w-full justify-center"
                >
                  <Camera className="mr-2" size={20} />
                  Take Photo or Upload
                </Button>
              </div>

              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Prescription"
                    className="mx-auto max-h-64 rounded-lg"
                  />
                </div>
              )}

              {result && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">{result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}