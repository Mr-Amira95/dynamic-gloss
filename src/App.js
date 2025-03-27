import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Navbar from './Navbar';
import Footer from './Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import PriceList from './Pages/PriceList';
import Gallery from './Pages/Gallery';
import {  createTheme , ThemeProvider} from '@mui/material';

function App() {
  const theme = createTheme({
    typography: {
    }
  });
  return (
    <div >
       <HelmetProvider>
        <HashRouter>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
          <Route path="/" element= {<MainPage />}/>
          <Route path="/privacypolicy" element= {<PrivacyPolicy />}/>
          <Route path="/pricelist" element= {<PriceList />}/>
          <Route path="/gallery" element= {<Gallery />}/>
          </Routes>
          <Footer />
          </ThemeProvider>
        </HashRouter>
        </HelmetProvider>
    </div>
  );
}

export default App;
