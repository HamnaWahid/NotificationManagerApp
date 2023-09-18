import React from 'react';
import { useTags } from './Tag'; // Assuming useTags is in the Tag file

const YourComponent: React.FC = () => {
  const { data: tagData, isLoading, isError } = useTags();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !tagData) {
    return <div>Error fetching tags</div>;
  }

  console.log('tagData.tags:', tagData?.tags);

  return (
    <div>
      {tagData?.tags.map((tag: string, index: number) => (
        <p key={index}>Tag: {tag}</p>
      ))}
    </div>
  );
};

export default YourComponent;
