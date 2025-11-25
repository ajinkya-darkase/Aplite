import { useState } from 'react';
import Modal from '@/components/modal/Modal';


import { Eye, EyeOff } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  expectedPin?: string;
}

export default function PinModal({ isOpen, onClose, onSubmit, expectedPin }: PinModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = () => {
    if (pin.length === 6) {
      onSubmit(pin);
      setPin('');
      setError('');
    } else {
      setError('Please enter a 6-character PIN.');
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Enter Business PIN">
      <div className="p-6 text-center">
        <div className="flex gap-2 justify-center mb-6">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type={showPin ? "text" : "password"}
              value={pin[index] || ''}
              onChange={(e) => {
                const newPin = pin.split('');
                newPin[index] = e.target.value;
                setPin(newPin.join(''));
                // Auto-focus next input
                if (e.target.value && index < 5) {
                  const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                  nextInput?.focus();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text').slice(0, 6);
                setPin(pastedText);
                // Focus the last filled input or the last input
                const lastIndex = Math.min(pastedText.length - 1, 5);
                const lastInput = document.querySelector(`input[data-index="${lastIndex}"]`) as HTMLInputElement;
                lastInput?.focus();
              }}
              onKeyDown={(e) => {
                // Handle backspace to focus previous input
                if (e.key === 'Backspace' && !pin[index] && index > 0) {
                  const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
                  prevInput?.focus();
                }
              }}
              data-index={index}
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-lg font-mono bg-gray-50"
            />
          ))}
        </div>
        
        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1 mx-auto"
        >
          {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
          {showPin ? 'Hide' : 'Show'}
        </button>
        
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-black"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}