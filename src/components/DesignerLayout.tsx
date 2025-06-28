import { useState } from 'react';
import SplitPane from 'react-split-pane-next';
import Sidebar from './Sidebar';
import PreviewPane from './PreviewPane';
import SchemaTabs from './SchemaTabs';
import StatusBar from './StatusBar';

const DesignerLayout = () => {
  // TODO implement collapse/expand toggle for sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true);
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <SplitPane
          split="vertical"
          minSize={150}
          defaultSize={200}
          className="pane">
          {sidebarVisible && <Sidebar />}
          {/* TODO persist sidebar size between sessions */}
          <SplitPane split="vertical" minSize={200} defaultSize={600}>
            {/* TODO designate this area as a drop zone for controls */}
            <SchemaTabs />
            <PreviewPane />
          </SplitPane>
        </SplitPane>
      </div>
      <StatusBar />
    </div>
  );
};

export default DesignerLayout;
