import React, { useState, useEffect, ReactNode } from "react";
import {Button} from './button';

// Generic type for buttons
interface ButtonItem<T> {
  label: ReactNode;
  value: T;
}

// Props type for the component
interface InlineNavigationProps<T> {
  buttons: ButtonItem<T>[];
  value?: T; // Controlled value from parent
  onChange?: (value: T) => void; // Callback to notify parent
  activeButtonClass?: string;
  inactiveButtonClass?: string;
  containerClass?: string;
}

function InlineNavigation<T extends string>({
  buttons,
  value,
  onChange,
  activeButtonClass = "bg-blue-500 text-white",
  inactiveButtonClass = "bg-white text-gray-800",
  containerClass = "flex gap-2 itmes-center",
}: InlineNavigationProps<T>) {
  const [currentValue, setCurrentValue] = useState<T>(
    value || (buttons.length > 0 ? buttons[0].value : ("" as T))
  );

  // Sync with external value prop
  useEffect(() => {
    if (value !== undefined && value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: T) => {
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className={containerClass}>
      {buttons.map((btn, index) => {
        const isActive = currentValue === btn.value;
        return (
          <Button
            key={index}
            size="md"
            variant={isActive ? 'ghost' : 'secondary'}
            onClick={() => handleValueChange(btn.value)}
            className={`transition-all duration-300 transform rounded-none ${
              isActive ? activeButtonClass : inactiveButtonClass
            }`}
          >
            {btn.label}
          </Button>
        );
      })}
      {/* <span className="ml-3 font-bold">Active: {currentValue}</span> */}
    </div>
  );
}

export default InlineNavigation;
