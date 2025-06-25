
import React from 'react';
import { Badge } from '@/components/ui/badge';

const DocumentPriorities: React.FC = () => {
  const documents = [
    { name: 'CV/Resume', priority: 'High', color: 'red' },
    { name: 'Right to Work Document', priority: 'High', color: 'red' },
    { name: 'Proof of ID', priority: 'High', color: 'red' },
    { name: 'Medical Questionnaire', priority: 'Medium', color: 'yellow' },
    { name: 'Professional References', priority: 'Medium', color: 'yellow' },
    { name: 'Care Certificate', priority: 'Low', color: 'green' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Priorities</h2>
        <p className="text-gray-600">Let's identify which documents you need to upload first</p>
      </div>
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">{doc.name}</span>
            <Badge className={`
              ${doc.color === 'red' ? 'bg-red-100 text-red-800' :
                doc.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'}
            `}>
              {doc.priority} Priority
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPriorities;
