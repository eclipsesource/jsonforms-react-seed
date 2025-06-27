import { useState } from 'react';
import TemplateModal from './TemplateModal';
import ImportExport from './ImportExport';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar">
      <button onClick={() => setOpen(true)}>Templates</button>
      <ImportExport />
      <TemplateModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Sidebar;
