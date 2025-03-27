import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  Divider,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../Component/LoadingPage";
import Form from "../Component/Form";
import ReactGA from "react-ga";

export default function PriceList() {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [contact, setContact] = useState({});
  const [discription, setDiscription] = useState("");

  const matches = useMediaQuery("(min-width:650px)");
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${process.env.REACT_APP_API_URL}price-list`).then((res) => {
      setCategories(res.data.categories);
      setOpen(false);
      setDiscription(res.data.categories[0].description);
    });
    axios.get(`${process.env.REACT_APP_API_URL}home`).then((res) => {
      setContact(res.data.data.general);
    });
    const currentPageUrl = window.location.href;
    const hashIndex = currentPageUrl.indexOf("#");
      const hashFragment = currentPageUrl.substring(hashIndex + 2);  
        ReactGA.pageview(hashFragment)
  }, []);
  const [active, setActive] = useState(0);

  return (
    <div style={{ backgroundColor: "#141414" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "130px",
          paddingBottom: "30px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "30px",
            marginTop: "20px",
            fontFamily: "Racing Sans One, sans-serif",
          }}
        >
          PRICE LIST
        </Typography>
      </Box>
      {open && <LoadingPage open={open} />}
      <Stack
        direction={matches ? "row" : "column"}
        gap={matches ? 1 : 2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          mb: "70px",
        }}
      >
        {categories.map((p, i) => (
          <>
            <Button
              sx={{
                width: matches ? "200px" : "100px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                color: i === active ? "#C71B1B" : "white",
                alignItems: "center",
                fontWeight: "bold",
                padding: "5px",
                "&:focus": { color: "#C71B1B", backgroundColor: "transparent" },
              }}
              onClick={() => {
                setActive(i);
                setDiscription(p.description);
                  ReactGA.event({
                      category: 'Category Click',
                      action: 'Click',
                      label:p.title
                    });
                
              }}
            >
              {p.title}
            </Button>
            {matches && (
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                color="white"
              />
            )}
          </>
        ))}
      </Stack>
      <Typography
        sx={{ color: "white", fontSize: "14px", mt: "10px", mb: "100px" }}
      >
        <Container maxWidth="md">{discription}</Container>
      </Typography>

      {!open && (
        <>
          <Stack gap={10}>
            {categories[active].services.map((paint) => (
              <>
                <Container maxWidth="md">
                  <Stack
                    direction={matches ? "row" : "column"}
                    gap={matches ? 10 : 2}
                  >
                    <img
                      src={paint.image}
                      style={{ height: "280px", width: "300px" }}
                    />
                    <Stack>
                      <Typography sx={{ color: "white", fontSize: "25px" }}>
                        {paint.title}
                      </Typography>
                      <Typography
                        sx={{ color: "white", fontSize: "15px", mt: "20px" }}
                      >
                        {paint.description}
                      </Typography>
                      <Typography
                        sx={{ color: "white", fontSize: "12px", mt: "50px" }}
                      >
                        Starting from
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {paint.price}$
                      </Typography>
                      <Link
                        href={`tel:${contact.phone_number}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          sx={{
                            color: "white",
                            bgcolor: "#C71B1B",
                            "&:hover": { color: "white", bgcolor: "#C71B1B" },
                            paddingLeft: "20px",
                            pr: "20px",
                            mt: "20px",
                            width: "150px",
                          }}
                        >
                          START NOW
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Container>
              </>
            ))}
          </Stack>
        </>
      )}
      <Form />
    </div>
  );
}
