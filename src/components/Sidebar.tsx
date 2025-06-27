import { useState } from 'react';
import TemplateModal from './TemplateModal';
import ImportExport from './ImportExport';
import DraggableControls from './DraggableControls';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar">
      <button onClick={() => setOpen(true)}>Templates</button>
      {/* TODO integrate DraggableControls with drop targets */}
      <DraggableControls />
      <ImportExport />
      <TemplateModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Sidebar;
