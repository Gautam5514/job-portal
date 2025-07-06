'use client';

import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import Image from 'next/image'; // Using next/image for optimization

// Placeholder template data - Use more descriptive hints
const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and professional', previewUrl: 'https://picsum.photos/200/283?random=1', hint: 'modern resume design blue accent' },
  { id: 'classic', name: 'Classic', description: 'Traditional and formal', previewUrl: 'https://picsum.photos/200/283?random=2', hint: 'classic resume template serif font' },
  { id: 'creative', name: 'Creative', description: 'Stylish and unique', previewUrl: 'https://picsum.photos/200/283?random=3', hint: 'creative resume layout graphic design' },
];

export function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={cn(
            'cursor-pointer transition-all hover:shadow-lg hover:scale-105', // Add subtle hover effect
            selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-2 shadow-md' : 'border-border hover:border-primary/50' // Clearer selection and hover indication
          )}
          onClick={() => onSelectTemplate(template.id)}
          role="radio"
          aria-checked={selectedTemplate === template.id}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectTemplate(template.id)}
        >
          <CardContent className="p-2 flex flex-col items-center space-y-1.5"> {/* Reduced space */}
            <div className="w-full aspect-[2/2.83] relative overflow-hidden rounded-sm bg-muted shadow-inner"> {/* Added inner shadow */}
               <Image
                 src={template.previewUrl}
                 alt={`${template.name} Template Preview`}
                 fill
                 sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" // Optimized sizes
                 style={{ objectFit: 'cover' }}
                 data-ai-hint={template.hint} // Use the specific hint
                 priority={template.id === 'modern'} // Prioritize loading the default
                 className="transition-transform duration-300 group-hover:scale-105" // Image zoom on hover
               />
            </div>
            <span className="text-xs font-medium">{template.name}</span> {/* Smaller font */}
            {/* Description can be added back if desired, maybe in a tooltip */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
