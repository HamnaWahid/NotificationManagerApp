import { useState } from 'react';
import ToolbarHeader from '../../common/Toolbar/ToolBar';
import Dashboard from './Dashboard';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('appName'); // Initialize with default sort option
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Initialize with default sort order

  return (
    <div>
      <ToolbarHeader
        title='Application'
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder} // Pass sortOrder to ToolbarHeader
        setSortBy={setSortBy} // Pass setSortBy to ToolbarHeader
        setSortOrder={setSortOrder} // Pass setSortOrder to ToolbarHeader
      />
      <Dashboard
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default Index;
