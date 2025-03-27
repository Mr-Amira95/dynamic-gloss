import { Typography, TextField, Grid, Stack, TextareaAutosize, useMediaQuery, MenuItem, Alert, Container, Button } from '@mui/material';
import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

export default function PriceListForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setemail] = useState('');
    const [service, setService] = useState('');
    const [alerting,setAlerting]= React.useState(false)
    const [message, setMessage] = useState('');
    const [services,setServices]=useState([{name :'s1'},{name :'s2'}])
    const [labelstate,setLabelState]=useState(true)
    const matches = useMediaQuery('(min-width:879px)');

    const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: 'white',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '&::before, &::after': {
                borderBottomColor: 'white',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'white',
              },
              '&.Mui-focused:after': {
                borderBottomColor: 'white',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&::before': {
                borderBottomColor: 'white',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'white',
              },
              '&.Mui-focused:after': {
                borderBottomColor: 'white',
              },
            },
          },
        },
      },
    });
    
    const outerTheme = useTheme();

  return (
    <div style={{backgroundColor:'#141414'}}>
        <Stack sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',padding:'60px'}}>
        <Typography sx={{color:'white',fontSize:'25px',fontFamily:'Racing Sans One, sans-serif'}}>WANT TO PAMPER YOUR CAR?
 </Typography>
<Typography sx={{color:'white',fontSize:'25px',fontFamily:'Racing Sans One, sans-serif'}}>TALK TO US!</Typography>
</Stack>
<ThemeProvider theme={customTheme(outerTheme)}>
<Container sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
<Stack direction={matches ? 'row' : 'column'} gap={2}>
          <Grid>
            <TextField
              placeholder="First Name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
              InputLabelProps={{
                sx: {
                  color: 'white'
                }
              }}
              sx={{borderRadius:'5px',  width: matches?'300px':'310px', border: '1px solid white', 
              '&:focus': { border: '1px solid white' },'.MuiInputBase-input':{color:"white"},"& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                color: "white",opacity:1
              } }}
            />
          </Grid>
          <Grid>
            <TextField
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
              InputLabelProps={{
                sx: {
                  color: 'white' 
                }
              }}
              sx={{borderRadius:'5px',  width: matches?'300px':'310px', border: '1px solid white', 
              '&:hover': { border: '1px solid white' },'.MuiInputBase-input':{color:"white"} ,
              "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                color: "white",opacity:1
              }}}
            />
          </Grid>
        </Stack>

        <Stack sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <Stack direction={matches ? 'row' : 'column'} gap={2} sx={{ marginTop: '20px' }}>
          <Grid>
          <PhoneInput
            country={'us'}
            enableSearch={true}
            value={phone}
            onChange={setPhone}
            inputStyle={{backgroundColor:'transparent',  width: matches?'300px':'310px'
            ,color:'white',fontSize:'13px',border:'1px solid white',
            borderRadius:'5px',height:'57px',marginTop:'-15px'
             }}
          />
          </Grid>
          <Grid>
            <TextField
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => { setemail(e.target.value) }}
              InputLabelProps={{
                sx: {
                  color: 'white' 
                }
              }}
              sx={{ borderRadius:'5px', width: matches?'300px':'310px', 
              border: '2px solid white', '&:hover': { border: '2px solid white' }
               ,'.MuiInputBase-input':{color:"white"},
               "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                color: "white",opacity:1
              }}}
            />
          </Grid>
        </Stack>

        <Grid sx={{ marginTop: '20px',position:'relative' }}>
          {labelstate && <label style={{color:'white',position:'absolute',left:'13px',top:'18px'}}>Services</label>}
            <TextField
              select
              value={service}
              onChange={(e) => { setService(e.target.value) ; setLabelState(false)}}
              InputLabelProps={{
                sx: {
                  color: 'white' 
                }
              }}
              sx={{ borderRadius:'5px', width: matches?'620px':'310px', 
              border: '1px solid white', '&:hover': { border: '1px solid white' } ,
              '.MuiInputBase-input':{color:"white"},'.MuiSvgIcon-root':{color:'white'},
              }}
            >
                {services.map((s) => (
                <MenuItem value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
         </TextField>
          </Grid>


        <Grid sx={{ marginTop: '20px' ,marginBottom:'50px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <TextareaAutosize
        onChange={(e) => { setMessage(e.target.value) }}
        name="message"
        placeholder='Message'
        value={message}
        cols={matches ? 90 : 46}
        className="custom-textarea"
        style={{ resize: 'none', overflow: 'auto', height:'100px',width:matches?'610px':'300px' }}
        />
        </Grid>
        <Button sx={{color:'white',bgcolor:'#C71B1B','&:hover':{color:'white',bgcolor:'#C71B1B'}
            ,paddingLeft:'20px',pr:'20px',width:'100%',mb:'30px'}}>SEND</Button>
        </Stack>
        </Container>
        </ThemeProvider>
    </div>
  )
}
