import { Box, BoxProps, Image, Link } from "@chakra-ui/core";
import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import { RegularPictureFragment } from "../generate/graphql";
import BigPhotoModal from "./BigPhotoModal";

export interface PhotoSliderProps extends BoxProps {
  pictures: RegularPictureFragment[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ pictures, ...props }) => {
  const [isBigPictureOpen, setBigPictureOpen] = useState(false);
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const settings: Settings = {
    customPaging: function (i) {
      return (
        <Box mt={2}>
          <Link>
            <Image src={pictures[i].url} h="40px" />
          </Link>
        </Box>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    swipe: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const Pictures = (() => {
    return pictures.map((pic) => {
      return (
        <Box
          className="picture"
          as="button"
          key={pic.id}
          onClick={() => {
            setPictureUrl(pic.url);
            setBigPictureOpen(true);
          }}
        >
          <Image src={pic.url} mx="auto" />
        </Box>
      );
    });
  })();

  return (
    <>
      <Box {...props}>
        <Slider {...settings} className="slider">
          {Pictures}
        </Slider>
      </Box>
      <BigPhotoModal
        isOpen={isBigPictureOpen}
        setOpen={setBigPictureOpen}
        url={pictureUrl}
      />
    </>
  );
};

export default PhotoSlider;
