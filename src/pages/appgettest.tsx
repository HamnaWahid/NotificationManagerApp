import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Application {
  appName: string;
  appDescription: string;
  dateCreated: Date;
  dateUpdated: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
}

const fetchData = async () => {
  const response = await axios.get('http://localhost:3000/api/applications/');
  return response.data;
};

const YourComponent = () => {
  const { data, isLoading, isError } = useQuery(['applications'], fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {data &&
        data.applications.map((item: Application) => (
          <div key={item._id}>
            <h2 color='black'>{item.appName}</h2>
            <p color='black'>{item.appDescription}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
    </div>
  );
};

export default YourComponent;
