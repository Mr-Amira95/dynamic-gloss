import { useMediaQuery, Stack, Typography, Container, Button } from '@mui/material';
import React, { useState } from 'react';
import bg from '../Media/reviews.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import 'swiper/css/pagination';
import ReviewDialog from './ReviewDialog';

export default function Reviews({ reviews }) {
  const matches = useMediaQuery('(min-width:740px)');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');

  const handleReadMore = (selectedData) => {
    setOpen(true);
    setData(selectedData);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '60px',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          padding: matches ? '60px' : '0px 0px 100px 0px',
        }}
      >
        <Typography sx={{ color: 'white', fontSize: '25px', fontFamily: 'Racing Sans One, sans-serif', mt: matches ? '' : '50px' }}>
          WHAT OUR
        </Typography>
        <Typography sx={{ color: 'white', fontSize: '25px', fontFamily: 'Racing Sans One, sans-serif' }}>CUSTOMERS SAY</Typography>
      </Stack>

      <Container maxWidth="lg">
        <Swiper
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          navigation={{
            prevEl: '.custom-swiper-prev',
            nextEl: '.custom-swiper-next',
          }}
          pagination={{ clickable: true }}
          slidesPerView={matches ? 3 : 1}
          spaceBetween={20}
          initialSlide={1}
          style={{ paddingBottom: '100px' }}
          className="custom-swiper"
        >
          {reviews.map((r) => (
            <SwiperSlide
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
              key={r.id}
            >
              <div className="card-container">
                <img src={r.profile_photo_url} alt="user" style={{ borderRadius: '100%', width: '120px', height: '120px' }} referrerPolicy="no-referrer" /><br />
                <Rating name="read-only" value={r.rating} readOnly sx={{ marginTop: '30px' }} />
                <Container maxWidth="xs">
                  <p>{`${r.text.substring(0, 150)} `}</p>
                  {r.text.length > 150 && (
                    <Button
                      sx={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}
                      onClick={() => handleReadMore({ profile_photo_url: r.profile_photo_url, rating: r.rating, text: r.text, author_name: r.author_name })}
                    >
                      Read More
                    </Button>
                  )}
                </Container>
                <Container sx={{ position: 'absolute', bottom: '10px', left: '0px', fontWeight: 'bold' }}>
                  <p>{r.author_name}</p>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <ReviewDialog open={open} setOpen={setOpen} data={data} />
    </div>
  );
}