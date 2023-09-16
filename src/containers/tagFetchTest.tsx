import React from 'react';
import { useTags } from './Tag'; // Assuming useTags is in the Tag file

interface Tag {
  _id: number;
  tags: string;
}

const YourComponent: React.FC = () => {
  const { data: tagData, isLoading, isError } = useTags();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !tagData) {
    return <div>Error fetching tags</div>;
  }

  return (
    <div>
      {tagData.tags.map((tag: Tag) => (
        <p key={tag._id}>
          ID: {tag._id}, Display: {tag.tags}
        </p>
      ))}
    </div>
  );
};

export default YourComponent;
