'use client';

import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { ResumeContent } from './resumecontent';
import { ResumeFormData } from '@/types/resume';

interface DraggableResumeContentProps {
  sections: string[];
  formData: ResumeFormData;
  onSectionsChange?: (sections: string[]) => void;
  disableDragAndDrop?: boolean;
}

export const DraggableResumeContent: React.FC<DraggableResumeContentProps> = ({
  sections,
  formData,
  onSectionsChange,
  disableDragAndDrop,
}) => {
  const handleDragEnd = (event: any) => {
    if (disableDragAndDrop) {
      return;
    }

    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.indexOf(active.id);
      const newIndex = sections.indexOf(over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      onSectionsChange?.(newSections);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        id="resume-preview"
        className={`p-8 min-h-[842px] bg-slate-50 rounded-b-2xl ${
          disableDragAndDrop ? 'pointer-events-none' : ''
        }`}
      >
        <div className={disableDragAndDrop ? 'pointer-events-auto' : ''}>
          {!disableDragAndDrop ? (
            <SortableContext
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              <ResumeContent sections={sections} formData={formData} />
            </SortableContext>
          ) : (
            <div className="[&_a]:pointer-events-auto [&_a]:cursor-pointer [&_*:not(a)]:pointer-events-none">
              <ResumeContent sections={sections} formData={formData} />
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
};
