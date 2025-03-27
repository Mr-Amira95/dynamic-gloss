import React, { useEffect, useState } from 'react'
import { Typography, useMediaQuery, Container } from '@mui/material'
import axios from 'axios'
import LoadingPage from '../Component/LoadingPage';

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(true);
  const [privacy,setPrivacy] = useState({})
  const matches = useMediaQuery('(min-width:900px)')

  useEffect(()=>{
    window.scrollTo(0,0)
    axios.get(`${process.env.REACT_APP_API_URL}privacy`).then(res=>{
      setPrivacy(res.data.data)
      setOpen(false)
    })
},[])
  return (
    <div style={{backgroundColor:'black'}}>
      {open && <LoadingPage open={open} />}
      {!open &&<>
              <div
                        style={{
                            height: 450,
                            maxWidth: '100%',
                            width: '100%',
                            backgroundImage: `url(${privacy.image})` 
                            ,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'
                        }}
                    ></div>
                   <div 
                   style={{position:'absolute',top:matches?'90px':'50px',width:'100%'
                   ,backgroundColor:'rgba(0, 0, 0,0.5)',
                   height:450}}>
                    </div>   
                    <>
                    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                    <Typography sx={{color:'white',position:'absolute',top:matches?'250px':'220px',
                    fontWeight:'bold',fontSize:'40px'}}>Privacy Policy</Typography>
                    </div>
                    <Container maxWidth='lg'>
                    <div style={{marginTop:'50px',display:'flex',flexWrap:'wrap'
                    ,justifyContent:'center',alignItems:'center',backgroundColor:'black'}}>
                      <Typography sx={{fontSize:'20px',color:'white',marginBottom:'50px',marginTop:'20px'}}
                                dangerouslySetInnerHTML={{ __html: privacy.privacy_policy }}
                                >
                      </Typography>
                    </div>                
                          </Container>
</>
                    </>}
    </div>
  )
}
