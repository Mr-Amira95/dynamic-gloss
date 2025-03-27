import {
  Typography,
  TextField,
  Grid,
  Stack,
  TextareaAutosize,
  useMediaQuery,
  Button,
  Alert,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import axios from "axios";
import ReactGA from "react-ga";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setemail] = useState("");
  const [alerting, setAlerting] = React.useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("form");
  const matches = useMediaQuery("(min-width:879px)");
  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: "white",
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              "&::before, &::after": {
                borderBottomColor: "white",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "&.Mui-focused:after": {
                borderBottomColor: "white",
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              "&::before": {
                borderBottomColor: "white",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "&.Mui-focused:after": {
                borderBottomColor: "white",
              },
            },
          },
        },
      },
    });

  const outerTheme = useTheme();
  const handleForm = () => {
    if (firstName && lastName && email && phone && message) {
      ReactGA.event({
        category: 'Form Submit',
        action: 'Click',
        label:'Form'
      });
      
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", phone);
      formData.append("email", email);
      formData.append("service_id", "");
      formData.append("message", message);

      axios
        .post(`${process.env.REACT_APP_API_URL}feed`, formData)
        .then((res) => {
          alert("Message Send Successfully");
          setFirstName("");
          setLastName("");
          setPhone("");
          setMessage("");
          setemail("");
        });
    } else {
      setAlerting(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#141414" }} id={id}>
      <Stack
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: matches ? "center" : "start",
          padding: "60px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "25px",
            fontFamily: "Racing Sans One, sans-serif",
          }}
        >
          WANT TO PAMPER YOUR CAR?
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "25px",
            fontFamily: "Racing Sans One, sans-serif",
          }}
        >
          TALK TO US!
        </Typography>
      </Stack>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction={matches ? "row" : "column"} gap={2}>
            <Grid>
              <TextField
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                sx={{
                  borderRadius: "5px",
                  width: matches ? "300px" : "310px",
                  border: "1px solid white",
                  "&:focus": { border: "1px solid white" },
                  ".MuiInputBase-input": { color: "white" },
                  "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />
            </Grid>
            <Grid>
              <TextField
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                sx={{
                  borderRadius: "5px",
                  width: matches ? "300px" : "310px",
                  border: "1px solid white",
                  "&:hover": { border: "1px solid white" },
                  ".MuiInputBase-input": { color: "white" },
                  "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />
            </Grid>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction={matches ? "row" : "column"}
              gap={2}
              sx={{ marginTop: "20px" }}
            >
              <Grid>
                <PhoneInput
                  country={"us"}
                  enableSearch={true}
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{
                    backgroundColor: "transparent",
                    width: matches ? "300px" : "310px",
                    color: "white",
                    fontSize: "13px",
                    border: "2px solid white",
                    borderRadius: "5px",
                    height: "57px",
                    marginTop: "-15px",
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  sx={{
                    borderRadius: "5px",
                    width: matches ? "300px" : "310px",
                    border: "1px solid white",
                    "&:hover": { border: "1px solid white" },
                    ".MuiInputBase-input": { color: "white" },
                    "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder":
                      {
                        color: "white",
                        opacity: 1,
                      },
                  }}
                />
              </Grid>
            </Stack>
            <Grid
              sx={{
                marginTop: "20px",
                marginBottom: "50px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextareaAutosize
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                name="message"
                placeholder="Message"
                value={message}
                cols={matches ? 90 : 46}
                className="custom-textarea"
                style={{
                  resize: "none",
                  overflow: "auto",
                  height: "100px",
                  width: matches ? "610px" : "299px",
                }}
              />
            </Grid>
            {alerting && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: "20px",
                  width: matches ? "600px" : "280px",
                }}
              >
                All fields must be filled.
              </Alert>
            )}
            <Button
              sx={{
                color: "white",
                bgcolor: "#C71B1B",
                "&:hover": { color: "white", bgcolor: "#C71B1B" },
                paddingLeft: "20px",
                pr: "20px",
                width: matches ? "630px" : "310px",
                mb: "30px",
              }}
              onClick={handleForm}
            >
              SEND
            </Button>
          </Stack>
        </Container>
      </ThemeProvider>
    </div>
  );
}
