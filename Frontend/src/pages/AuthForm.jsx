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

// =================== LOGIN FORM ===================
const LoginForm = ({ fadeIn }) => (
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

// =================== SIGNUP FORM ===================
const SignupForm = ({
  fadeIn,
  profileImage,
  handleImageChange,
  singupHandler,
  userNameRef,
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  confirmPassRef
}) => (
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
            {!profileImage && <LockOutlinedIcon />}
          </Avatar>
        </label>
      </Box>
      <TextField inputRef={userNameRef} fullWidth label="User Name" margin="normal" />
      <TextField inputRef={firstNameRef} fullWidth label="First Name" margin="normal" />
      <TextField inputRef={lastNameRef} fullWidth label="Last Name" margin="normal" />
      <TextField inputRef={emailRef} fullWidth label="Email" margin="normal" />
      <TextField inputRef={passwordRef} fullWidth label="Password" type="password" margin="normal" />
      <TextField inputRef={confirmPassRef} fullWidth label="Confirm Password" type="password" margin="normal" />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} size="large" onClick={singupHandler}>
        Sign Up
      </Button>
    </Box>
  </Fade>
);

// =================== MAIN AUTH FORM ===================
const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  // Refs for form inputs
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
      setProfileImage(null);
    }, 300);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const singupHandler = async () => {
    const userName = userNameRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if (!userName || !email || !password || !confirmPass) {
      return alert('Fields should not be empty');
    }
    if (password.length < 8) {
      return alert('Password should be minimum 8 characters long');
    }
    if (password !== confirmPass) {
      return alert('Password & Confirm Password mismatch');
    }

    const data = new FormData();
    data.append('userName', userName);
    data.append('email', email);
    data.append('password', password);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('age', 0);
    data.append('isAdmin', false);
    if (profileFile) data.append('ProfPic', profileFile);

    try {
      await axios.post(`${BASE_URL}/auth/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      ToastAlert({ type: 'success', message: 'User Registered Successfully' });
      setTabIndex(0);
    } catch (err) {
      console.error(err.message);
    }
  };

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

        {tabIndex === 0 ? (
          <LoginForm fadeIn={fadeIn} />
        ) : (
          <SignupForm
            fadeIn={fadeIn}
            profileImage={profileImage}
            handleImageChange={handleImageChange}
            singupHandler={singupHandler}
            userNameRef={userNameRef}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPassRef={confirmPassRef}
          />
        )}
      </StyledPaper>
    </Grid>
  );
};

export default AuthForm;
