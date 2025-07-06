import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const templates = [
  { id: 'classic', name: 'Classic', description: 'Traditional and professional' },
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated design' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and focused' },
  { id: 'colorful', name: 'Colorful', description: 'Eye-catching accents' },
  { id: 'creative', name: 'Creative', description: 'Unique and artistic' },
  { id: 'business', name: 'Business', description: 'Corporate standard' }
];

export const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant={selectedTemplate === template.id ? 'default' : 'outline'}
              className="flex flex-col h-auto p-3"
              onClick={() => onTemplateChange(template.id)}
            >
              <span className="font-medium">{template.name}</span>
              <span className="text-xs text-white text-muted-foreground mt-1">
                {template.description} 
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
