import React, { useState } from 'react';

export const AccordionItem = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      {React.Children.map(children, child => {
        if (child.type === AccordionTrigger) {
          return React.cloneElement(child, { 
            onClick: () => setIsOpen(!isOpen),
            isOpen 
          });
        }
        if (child.type === AccordionContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
};

export const Accordion = ({ children, type = "single", collapsible = false }) => {
  return (
    <div className="divide-y divide-gray-200">
      {children}
    </div>
  );
};

export const AccordionTrigger = ({ children, onClick, isOpen }) => (
  <button
    className="flex w-full justify-between py-4 text-left text-lg font-medium text-blue-700 hover:text-blue-800"
    onClick={onClick}
  >
    {children}
    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
      ▼
    </span>
  </button>
);

export const AccordionContent = ({ children }) => (
  <div className="pb-4 pt-2 text-gray-700">
    {children}
  </div>
);
