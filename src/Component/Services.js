import { Box, Button, Container, Stack, Typography,useMediaQuery } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import pic from '../Media/Component.png'
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../App.css'
import { useNavigate } from 'react-router-dom';

export default function Services({service}) {
    const [swiper, setSwiper] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const matches = useMediaQuery('(min-width:1000px)');
    
  const handleSlideChange = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex);
    }
  };

 const navigate = useNavigate()
  return (
    <div style={{backgroundColor:'#141414',marginBottom:'30px',position:'relative'}}>
        <Box>
        <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'start'}}>
      <Typography sx={{color:'white',fontSize:'25px',marginTop:'80px',marginBottom:'30px',fontFamily:'Racing Sans One, sans-serif'}}>
      OUR SERVICES
      </Typography>
      </Container>
      </Box>
<Container maxWidth='lg'>
      <Swiper
      loop={true}
      modules={[Autoplay,Pagination,Navigation]} 
      autoplay={{
       delay: 5000,
       disableOnInteraction: false,
        }}
        navigation={{
          prevEl: '.custom-swiper-prev',
          nextEl: '.custom-swiper-next',
        }}
        pagination={{ clickable: true }}
        slidesPerView={matches?4:1}
        spaceBetween={50}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        style={{paddingBottom:'50px' }}
        className="custom-swiper"
      >
        {service.map((s)=> <>
        <SwiperSlide>
        <div class="wrapper">
  <div class="card">
    <img src={s.image} alt='loading' />
    <div class="info">
      <Stack>
      <h1 style={{fontSize:'25px',fontWeight:'bold'}}>{s.title}</h1>
      <p>{`${s.description.substring(0, 250)} `}</p>
      </Stack>
      <button
       onClick={()=>{navigate('/pricelist')}}>RESTORE YOUR CAR NOW</button>
    </div>
  </div>
</div>
        </SwiperSlide>
        </>)}
      </Swiper>
      </Container>
      {matches && <><div className="custom-swiper-prev">
        <ArrowLeftIcon
          style={{
            color: 'white',
            fontSize: '70px',
            position: 'absolute',
            top: '50%',
            left: '10px',
            zIndex: '1',
            cursor: 'pointer',
          }}
        />
      </div>
      <div className="custom-swiper-next">
        <ArrowRightIcon
          style={{
            color: 'white',
            fontSize: '70px',
            position: 'absolute',
            top: '50%',
            right: '10px',
            zIndex: '1',
            cursor: 'pointer',
          }}
        />
      </div></>}
    </div>
  )
}
