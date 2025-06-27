import { useDraggable } from '@dnd-kit/core';

const controls = ['Control', 'VerticalLayout', 'HorizontalLayout'];

const DraggableControl = ({ type }: { type: string }) => {
  // TODO connect useDraggable to enable drag behavior
  const { attributes, listeners, setNodeRef } = useDraggable({ id: type });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="draggable-control">
      {type}
    </div>
  );
};

const DraggableControls = () => (
  <div className="draggable-controls">
    {/* TODO render additional controls for drag-and-drop */}
    {controls.map(type => (
      <DraggableControl key={type} type={type} />
    ))}
  </div>
);

export default DraggableControls;
