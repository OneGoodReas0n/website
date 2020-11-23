import React from "react";
import SliderItem, { Settings } from "react-slick";
import { Box } from "@chakra-ui/core";

export interface SliderProps {
  numOfElemsToShow: number | undefined;
  scrollSpeed?: number;
  scrollDelay?: number;
}

const Slider: React.FC<SliderProps> = ({
  numOfElemsToShow,
  scrollSpeed = 1000,
  scrollDelay = 1500,
  children,
}) => {
  const sliderProps: Settings = {
    slidesToShow: numOfElemsToShow,
    infinite: true,
    autoplay: true,
    speed: scrollSpeed,
    autoplaySpeed: scrollDelay,
    pauseOnHover: true,
  };
  return (
    <Box mt={{ base: 4, sm: 6, md: 8, lg: 12 }}>
      <SliderItem {...sliderProps}>{children}</SliderItem>
    </Box>
  );
};

export default Slider;
