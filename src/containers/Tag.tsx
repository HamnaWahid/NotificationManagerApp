import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchTags = async () => {
  const response = await axios.get('http://localhost:3000/api/tags');
  console.log(response);
  return response.data;
};

export const useTags = () => {
  return useQuery(
    ['tags'],
    fetchTags,
    {
      staleTime: 1000,
    }
  );
};
