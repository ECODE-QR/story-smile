import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StoryContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 100%;
  display: flex;
`;

interface ProgressBarSegmentProps {
  filled: boolean;
  currentProgress?: number;
}

const ProgressBarSegment = styled.div<ProgressBarSegmentProps>`
  height: 5px;
  flex: 1; // Changed from flex-grow for equal distribution
  margin-right: 3px; // Margin for separation
  background-color: ${(props) => (props.filled ? '#fff' : '#888')};
  transition: background-color 0.5s ease;

  &:last-child {
    margin-right: 0; // No margin for the last segment
  }

  &::after {
    content: '';
    display: ${(props) => (props.currentProgress !== undefined ? 'block' : 'none')};
    height: 5px;
    background-color: #fff;
    width: ${(props) => props.currentProgress || 0}%;
    transition: width linear;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 90%;
`;

interface StoryProps {
  images: string[];
}

const Story: React.FC<StoryProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const imageDisplayDuration = 8000; // Duration for each image in milliseconds

  useEffect(() => {
    const intervalTime = 50; // Interval for progress bar update
    const increment = (intervalTime / imageDisplayDuration) * 100; // Increment progress based on interval

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          setIndex((oldIndex) => (oldIndex + 1) % images.length);
          return 0;
        }
        return oldProgress + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [index, images.length]);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
    setProgress(0);
  };

  return (
    <StoryContainer onClick={handleClick}>
      <ProgressBarContainer>
        {images.map((_, idx) => (
          <ProgressBarSegment
            key={idx}
            filled={idx < index}
            currentProgress={idx === index ? progress : undefined}
          />
        ))}
      </ProgressBarContainer>
      <Image src={images[index]} alt={`Story ${index}`} />
    </StoryContainer>
  );
};

export default Story;
