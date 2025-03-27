import React from 'react'
import bg from '../Media/m.png'
import { Button, Container, Stack, Typography,useMediaQuery } from '@mui/material'
import im from '../Media/IDAsticker-Large-300x192.png'
import im2 from '../Media/Certificate.png'
import { useNavigate } from 'react-router-dom';

export default function Mission({mission}) {
  const matches = useMediaQuery('(min-width:1000px)');
  const navigate = useNavigate()
const handleButton =(m) =>{
  if (!m){
  navigate('/gallery')}
  if(m){
    window.open(m, '_blank');
  }
}
  return (
    <div style={{ minHeight:matches?'450px':'600px',backgroundColor:'black'}}>
      <Stack direction={matches?'row':'column'} gap={10}>
        {matches&& <img src={bg} style={{height:'550px',width:'500px',objectFit:'cover'}}/>}


<Container maxWidth='sm' sx={{position:'relative',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
  <Stack gap={2}>
      <Typography sx={{color:'white',fontSize:'30px',fontFamily:'Racing Sans One, sans-serif'}}>
      OUR MISSION
      </Typography>
      <Typography sx={{color:'white',fontSize:'15px'}}>
 {mission.description}
      </Typography>
      {mission.button_text && <Button sx={{color:'white',bgcolor:'#C71B1B','&:hover':{color:'white',bgcolor:'#C71B1B'}
  ,padding:'5px',width:'190px'}}
  onClick={()=>{handleButton(mission.button_action)}}>{mission.button_text}</Button>}

            <img src={im} style={{position:'absolute',top:matches?'80%':'400px',right:matches?'8%':' ',height:'100px'}} />
            <img src={im2} style={{position:'absolute',top:matches?'80%':'500px',right:matches?'40%':' ',height:'100px'}} />
            </Stack>
            </Container>
            </Stack>

    </div>
  )
}
