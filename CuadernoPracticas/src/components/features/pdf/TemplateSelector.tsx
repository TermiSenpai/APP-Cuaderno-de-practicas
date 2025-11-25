/**
 * Template Selector Component
 * Allows users to select from available PDF templates
 */

import React from "react";
import type { PDFTemplate } from "../../../core/models/types";
import { getAvailableTemplates } from "../../../core/services/PDFTemplateRegistry";
import { CheckCircle2 } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: PDFTemplate;
  onTemplateChange: (template: PDFTemplate) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  const templates = getAvailableTemplates();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        Selecciona una Plantilla
      </h3>
      <div className="space-y-2">
        {templates.map((template) => {
          const isSelected = template.id === selectedTemplate;

          return (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? "border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-950/20"
                  : "border-neutral-200 dark:border-neutral-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isSelected ? (
                    <CheckCircle2 className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {template.name}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    {template.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
