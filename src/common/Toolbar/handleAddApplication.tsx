import { useQueryClient } from "@tanstack/react-query";
import { addApplication } from "../../containers/AppTiles";

// Custom hook to handle adding an application and query invalidation
const useHandleAddApplication = () => {
  const queryClient = useQueryClient();

  const handleAddApplication = async (formData: {
    appName: string;
    appDescription: string;
  }) => {
    try {
      await addApplication(formData);

      // Invalidate the 'applications' query when an application is added
      queryClient.invalidateQueries(["applications"]);
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  return handleAddApplication;
};

export default useHandleAddApplication;
