import { useState } from 'react';
import ToolbarHeader from '../../common/Toolbar/ToolBar';
import Dashboard from './Dashboard';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div>
      <ToolbarHeader title="Application" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Dashboard searchTerm={searchTerm} />
    </div>
  );
};

export default Index;
