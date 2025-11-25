'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/modal/Modal'
interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectionType: 'Payable' | 'Receivable';
  onConnect: (pin: string) => void;
}

export default function PinModal({ 
  isOpen, 
  onClose, 
  connectionType,
  onConnect
}: PinModalProps) {
  const [pin, setPin] = useState('');

  const handleConnect = () => {
    if (pin.trim()) {
      onConnect(pin.trim());
      setPin('');
      onClose();
    }
  };

  const handleBackToSearch = () => {
    setPin('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#19182F]">
          Add a Business
        </h2>
        
        <div className="bg-[#F8FAFC] p-3 rounded-md">
          <p className="text-[#64748B] font-semibold">
            {connectionType} Connection Request
          </p>
          <p className="text-[#64748BCC] text-[10px]">
            Search for a business or enter their PIN to add them to your {connectionType.toLowerCase()}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Enter Business PIN
          </label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter 6 - Digit PIN"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1544] focus:border-[#0A1544]"
            maxLength={6}
          />
          <p className="text-xs text-slate-500 mt-2 pt-2">
            The business should have shared their Aplite PIN with you
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            variant="secondary" 
            onClick={handleBackToSearch} 
            className="flex-1 !bg-white !border !border-[#0A1544] !text-[#0A1544] hover:!bg-blue-50 !px-4 !rounded-lg !font-medium"
          >
            Back to Search
          </Button>
          <Button 
            onClick={handleConnect}
            disabled={!pin.trim()}
            className="flex-1 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Connect Business
          </Button>
        </div>
      </div>
    </Modal>
  );
}