import React from 'react';
import Story from './Components/Story';

const images: string[] = [
  '/images/16.png',
  '/images/17.png',
  '/images/18.png',
  
  // Add more image URLs
];

const App: React.FC = () => {
  return (
    <div>
      <Story images={images} />
    </div>
  );
};

export default App;
