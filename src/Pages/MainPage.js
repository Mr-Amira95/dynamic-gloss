import React, { useEffect, useState } from "react";
import Slider from "../Component/Slider";
import { Link, Stack, useMediaQuery } from "@mui/material";
import WhatsAppimage from "../Media/Group.png";
import insta from "../Media/insta.png";
import Services from "../Component/Services";
import Mission from "../Component/Mission";
import Reviews from "../Component/Reviews";
import Form from "../Component/Form";
import axios from "axios";
import LoadingPage from "../Component/LoadingPage";
import ReactGA from "react-ga";

export default function MainPage() {
  const [sliders, setSliders] = useState([]);
  const [service, setService] = useState([]);
  const [mission, setMission] = useState({});
  const [open, setOpen] = useState(true);
  const [contact, setContact] = useState({});
  const [reviews, setReviews] = useState([]);

  const matches = useMediaQuery("(min-width:800px)");
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    window.scrollTo(0, 0);
    axios.get(`${process.env.REACT_APP_API_URL}home`).then((res) => {
      setSliders(res.data.data.sliders);
      setService(res.data.data.categories);
      setMission(res.data.data.mission);
      setContact(res.data.data.general);
      setReviews(res.data.data.reviews.result.reviews);
      setOpen(false);
    });
  }, []);

  const handleWhatsAppClick=() =>{
    ReactGA.event({
        category: 'WhatsUp Click',
        action: 'Click',
        label:'WhatsUp'
      });
  }
  const handleInastagramClick=() =>{
    ReactGA.event({
        category: 'Inastagram Click',
        action: 'Click',
        label:'Inastagram'
      });
  }

  return (
    <div style={{ backgroundColor: "black" }}>
      <Stack direction="column">
        <Link href={`${contact.instagram}`} target="_blank" onClick={handleInastagramClick}>
          <img
            style={{
              position: "fixed",
              zIndex: 10,
              objectFit: "contain",
              top: "80%",
              right: matches ? "10px" : "10px",
              width: matches ? "70px" : "45px",
              height: matches ? "55px" : "45px",
              cursor: "pointer",
            }}
            src={insta}
          />
        </Link>

        <Link href={`https://wa.me/${contact.whatsapp}`} target="_blank" onClick={handleWhatsAppClick}>
          <img
            style={{
              position: "fixed",
              zIndex: 10,
              objectFit: "contain",
              top: matches ? "90%" : "87%",
              right: matches ? "10px" : "12px",
              width: matches ? "70px" : "40px",
              height: matches ? "35px" : "30px",
              cursor: "pointer",
            }}
            src={WhatsAppimage}
          />
        </Link>
      </Stack>
      {open && <LoadingPage open={open} />}
      {!open && (
        <>
          <Slider sliders={sliders} />
          <Services service={service} />
          <Mission mission={mission} />
          <Reviews reviews={reviews} />
          <Form />
        </>
      )}
    </div>
  );
}
