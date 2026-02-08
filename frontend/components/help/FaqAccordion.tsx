'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items, label }: { items: FaqItem[]; label: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-6 ml-2">
      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {label}
      </h4>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-bg-card/50 border border-border-subtle rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition"
            >
              <span className="text-sm font-medium text-gray-300">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 shrink-0 ml-3 transition-transform duration-200 ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ${
                openIndex === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
