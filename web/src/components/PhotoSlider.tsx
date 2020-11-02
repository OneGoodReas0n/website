import { Box, BoxProps, Image, Link } from "@chakra-ui/core";
import React from "react";
import Slider, { Settings } from "react-slick";

export interface PhotoSliderProps extends BoxProps {}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ ...props }) => {
  const settings: Settings = {
    customPaging: function (i) {
      return (
        <Box mt={2}>
          <Link>
            <Image src={`https://via.placeholder.com/30${i + 1}`} h="60px" />
          </Link>
        </Box>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Box {...props}>
      <Slider {...settings}>
        <Box>
          <Image src="https://via.placeholder.com/400x250" mx="auto" />
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/400x250" mx="auto" />
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/400x250" mx="auto" />
        </Box>
      </Slider>
    </Box>
  );
};

export default PhotoSlider;
