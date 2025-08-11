import React, { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Fade,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { BASE_URL, ToastAlert } from '../utils';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 420,
  margin: 'auto',
  marginTop: theme.spacing(10),
  borderRadius: 16,
  boxShadow: '0px 4px 30px rgba(0,0,0,0.1)',
}));

const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);


  const userNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setFadeIn(false);
    setTimeout(() => {
      setTabIndex(newValue);
      setFadeIn(true);
      setProfileImage(null); // Reset image on tab switch
    }, 300);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file)
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const singupHandler = async () => {

    let userName = userNameRef.current.value;
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let confirmPass = confirmPassRef.current.value;
    let imageUrl = ''

    const data = new FormData();
    data.append('userName', userName);
    data.append('email', email);
    data.append('password', password);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('age', 0);
    data.append('isAdmin', false);
    if (profileImage) {
      data.append('ProfPic', profileImage);
    }

    if (!userName || !email || !password || !confirmPass) {
      return alert("Fields should not be empty")
    }

    if (password.length < 9) {
      return alert("Password should be minimum 8 character long")

    }

    if (password !== confirmPass) {
      return alert("Password & confirm password mismatch");
    }



    try {
    

        const user = await axios.post(`${BASE_URL}/auth/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      

      // const RegData = {
      //   userName, email, password, firstName, lastName, profilePic: imageUrl, age: 0, isAdmin: false
      // }
      // const user = await axios.post(`${BASE_URL}/auth/register`, RegData);
      ToastAlert({ type: 'success', message: 'User Register Successfully' })
      setTabIndex(0);
    } catch (err) {
      console.log(err.message)
    }


  }

  const LoginForm = () => (
    <Fade in={fadeIn}>
      <Box component="form" noValidate autoComplete="off">
        <TextField fullWidth label="Email" variant="outlined" margin="normal" />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} size="large">
          Login
        </Button>
      </Box>
    </Fade>
  );

  const SignupForm = () => (
    <Fade in={fadeIn}>
      <Box component="form" noValidate autoComplete="off">
        <Box display="flex" justifyContent="center" mb={2}>
          <label htmlFor="upload-photo">
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Avatar
              src={profileImage}
              sx={{ width: 80, height: 80, cursor: 'pointer' }}
            >
              {profileImage ? '' : <LockOutlinedIcon />}
            </Avatar>
          </label>
        </Box>
        <TextField inputRef={userNameRef} fullWidth label="User Name" variant="outlined" margin="normal" />
        <TextField inputRef={firstNameRef} fullWidth label="First Name" variant="outlined" margin="normal" />
        <TextField inputRef={lastNameRef} fullWidth label="Last Name" variant="outlined" margin="normal" />
        <TextField inputRef={emailRef} fullWidth label="Email" variant="outlined" margin="normal" />
        <TextField inputRef={passwordRef} fullWidth label="Password" type="password" variant="outlined" margin="normal" />
        <TextField inputRef={confirmPassRef} fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} size="large" onClick={singupHandler}>
          Sign Up
        </Button>
      </Box>
    </Fade>
  );

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          {tabIndex === 0 ? 'Login to Your Account' : 'Create a New Account'}
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        {tabIndex === 0 ? <LoginForm /> : <SignupForm />}
      </StyledPaper>
    </Grid>
  );
};

export default AuthForm;
