import { Box , Container, Typography, useMediaQuery} from '@mui/material'
import React, { useEffect, useState } from 'react'
import im1 from '../Media/im1.png'
import im2 from '../Media/im2.png'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Form from '../Component/Form';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from 'axios';
import LoadingPage from '../Component/LoadingPage';
import ReactGA from "react-ga";

export default function Gallery() {
  const [open, setOpen] = useState(true);
  const [gallery , setGallery] = useState([])
    const matches = useMediaQuery('(min-width:948px)');
    useEffect(()=>{
      const currentPageUrl = window.location.href;
      const hashIndex = currentPageUrl.indexOf("#");
      const hashFragment = currentPageUrl.substring(hashIndex + 2);  
      ReactGA.pageview(hashFragment)
        window.scrollTo(0,0)
        axios.get(`${process.env.REACT_APP_API_URL}gallery`).then(res=>{
          setGallery(res.data.gallery)
          setOpen(false)
        })
    },[])
  return (
    <div style={{backgroundColor:'#141414',position:'relative'}}>
      <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',paddingTop:'130px',paddingBottom:'70px'}}>
      <Typography sx={{color:'white',fontSize:'30px',fontFamily:'Racing Sans One, sans-serif'}}>
      GALLERY
      </Typography>
      </Box>
      {open && <LoadingPage open={open} />}

      {!open && <>
      <Swiper
    loop={true}
    allowTouchMove={false}
  modules={[ Navigation,Pagination]}
  centeredSlides={true}
  pagination={{ clickable: true }}
  navigation={{
    prevEl: '.custom-swiper-prev',
    nextEl: '.custom-swiper-next',
  }}
  slidesPerView={1}
  spaceBetween={50}
  className="custom-swiper"
  style={{paddingBottom:'70px'}}
>
{gallery.map((g)=>
    <SwiperSlide>
      <Container maxWidth='md' sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
      <ReactCompareSlider style={{height:'480px',width:'90%'}}
      itemOne={<ReactCompareSliderImage src={g.before_image} alt="Image one" style={{objectFit:'cover'}}/>}
      itemTwo={<ReactCompareSliderImage src={g.after_image} alt="Image two" style={{objectFit:'cover'}} />}
    />
      </Container>
      </SwiperSlide>)}
      </Swiper>
    
      <div className="custom-swiper-prev">
        <ArrowLeftIcon
          style={{
            color: 'white',
            fontSize: '70px',
            position: 'absolute',
            top: matches?'35%':'710px',
            left: '40px',
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
            top: matches?'35%':'710px',
            right: '40px',
            zIndex: '1',
            cursor: 'pointer',
          }}
        />
      </div>
  </>  }
      <Form />
    </div>
  )
}
