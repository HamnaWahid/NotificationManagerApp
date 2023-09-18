import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiServices/serviceClient';

export const fetchTags = async () => {
  const response = await apiClient.get('/tags');

  console.log(response);
  return response.data;
};

export const useTags = () => {
  return useQuery(['tags'], fetchTags, {
    staleTime: 1000,
  });
};
