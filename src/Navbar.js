import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from './Media/Group 66.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from '@mui/material';
import ReactGA from "react-ga";

const pages = ['HOME', 'PRICE LIST', 'GALLERY'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [contact,setContact] = React.useState({})
  const navigate = useNavigate();

  const handleCall =() => {
    ReactGA.event({
      category: 'Call',
      action: 'Click',
      label:'Call Us'
    });
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if(page === 'HOME'){
      navigate('/')
    }
    if(page === 'PRICE LIST'){
      navigate('/pricelist')
    }
    if(page === 'GALLERY'){
      navigate('/gallery')
    }
  };

  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}home`).then(res=>{
      setContact(res.data.data.general)
    })
},[])
  return (
    <AppBar position="fixed" sx={{bgcolor:'#000000',borderBottom:'3px solid #C71B1B'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              padding:'20px'
            }}
          >
            <img src={logo} style={{width:'100px',height:'50px',objectFit:'contain'}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },'.MuiPaper-root':{
                  width:'100%',bgcolor:'black',border:'1px solid #C71B1B',mt:'5px'
                }
              }}
            >
                 <MenuItem>
               <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <img src={logo} style={{objectFit:'cover'}}/>
          </Typography>

          </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>{handleCloseNavMenu(page)}}>
                  <Typography textAlign="center" sx={{color:'white'}}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }
          ,flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu(page)}}
                sx={{ my: 2, color: 'white', display: 'block', fontSize:'12px' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow:0 }}>
            <Tooltip title="CALL US NOW">
            <Link href={`tel:${contact.phone_number}`} style={{textDecoration: 'none'}} onClick={handleCall}>
               <Button sx={{color:'white',bgcolor:'#C71B1B','&:hover':{color:'white',bgcolor:'#C71B1B'}
            ,padding:'5px 20px 5px 20px',mr:'20px'}}>CALL US NOW {contact.phone_number}</Button>
            </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;