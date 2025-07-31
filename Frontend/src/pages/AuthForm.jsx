import React, { useState } from 'react';
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
      setProfileImage(URL.createObjectURL(file));
    }
  };

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
        <TextField fullWidth label="Full Name" variant="outlined" margin="normal" />
        <TextField fullWidth label="Email" variant="outlined" margin="normal" />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} size="large">
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
