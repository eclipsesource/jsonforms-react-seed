import SplitPane from 'react-split-pane-next';
import Sidebar from './Sidebar';
import PreviewPane from './PreviewPane';
import SchemaTabs from './SchemaTabs';
import StatusBar from './StatusBar';

const DesignerLayout = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <SplitPane split="vertical" minSize={150} defaultSize={200} className="pane">
          <Sidebar />
          <SplitPane split="vertical" minSize={200} defaultSize={600}>
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
