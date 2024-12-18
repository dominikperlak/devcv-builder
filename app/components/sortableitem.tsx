import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition || 'transform 200ms ease',
    boxShadow: transform ? '0 4px 8px rgba(0, 0, 0, 0.2)' : undefined,
    cursor: transform ? 'grabbing' : 'grab',
    zIndex: transform ? 999 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
