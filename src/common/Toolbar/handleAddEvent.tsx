import { useQueryClient } from '@tanstack/react-query';
import { addEvent } from '../../containers/EventGrid'; // Update the import path to the EventGrid container

// Custom hook to handle adding an event and query invalidation
const useHandleAddEvent = () => {
  const queryClient = useQueryClient();

  const handleAddEvent = async (formData: {
    eventName: string;
    eventDescription: string;
    applicationId: string | number;
  }) => {
    try {
      await addEvent(formData);

      // Invalidate the 'events' query when an event is added
      queryClient.invalidateQueries(['events']);
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  return handleAddEvent;
};

export default useHandleAddEvent;
