import PhotoAlbum from "react-photo-album";
import { Container, Typography } from "@mui/material";
import i1 from '../../assets/i1.jpg'
import i2 from '../../assets/i-2.jpg'
import i3 from '../../assets/i3.jpg'
import i4 from '../../assets/i4.jpg'
import i5 from '../../assets/i5.jpg'
import i6 from '../../assets/i6.jpg'
import i7 from '../../assets/i7.jpg'
import i8 from '../../assets/i8.jpg'
import i9 from '../../assets/i9.jpg'

const photos = [
  {
    src: i1,
    width: 800,
    height: 600,
  },
  {
    src: i2,
    width: 1600,
    height: 900,
  },
  {
    src: i3,
    width: 1300,
    height: 900,
  },
  {
    src: i9,
    width: 1500,
    height: 800,
  },
  {
    src: i5,
    width: 1600,
    height: 900,
  },
  {
    src: i6,
    width: 1200,
    height: 800,
  },
  {
    src: i4,
    width: 1000,
    height: 700,
  },
  {
    src: i7,
    width: 1500,
    height: 900,
  },
  {
    src: i8,
    width: 1200,
    height: 700,
  },
];

const Gallery = () => {
  return (
    <div>
      <Container maxWidth="lg" className="my-16 mx-auto">
        <Typography variant="h3" align="center" className="mb-8">
          Photo Gallery
        </Typography>
        <div className="animate__animated animate__fadeIn">
          <PhotoAlbum layout="rows" photos={photos} />
        </div>
      </Container>
    </div>
  );
};

export default Gallery;
