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
import axios from 'axios';
import { BASE_URL, ToastAlert } from '../utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/slices/authSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 420,
  margin: 'auto',
  marginTop: theme.spacing(10),
  borderRadius: 16,
  boxShadow: '0px 4px 30px rgba(0,0,0,0.1)',
}));

// ✅ Signup Form (separate component)
const SignupForm = ({ fadeIn, formData, handleChange, handleImageChange, profileImage, signupHandler }) => (
  <Fade in={fadeIn}>
    <Box>
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
          <Avatar src={profileImage} sx={{ width: 80, height: 80, cursor: 'pointer' }}>
            {!profileImage && <LockOutlinedIcon />}
          </Avatar>
        </label>
      </Box>
      <TextField name="userName" value={formData.userName} onChange={handleChange} fullWidth label="User Name" variant="outlined" margin="normal" />
      <TextField name="firstName" value={formData.firstName} onChange={handleChange} fullWidth label="First Name" variant="outlined" margin="normal" />
      <TextField name="lastName" value={formData.lastName} onChange={handleChange} fullWidth label="Last Name" variant="outlined" margin="normal" />
      <TextField name="email" value={formData.email} onChange={handleChange} fullWidth label="Email" variant="outlined" margin="normal" />
      <TextField name="password" value={formData.password} onChange={handleChange} fullWidth label="Password" type="password" variant="outlined" margin="normal" />
      <TextField name="confirmPass" value={formData.confirmPass} onChange={handleChange} fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} size="large" onClick={signupHandler}>
        Sign Up
      </Button>
    </Box>
  </Fade>
);

// ✅ Login Form (separate component)
const LoginForm = ({ fadeIn, loginData, handleLoginChange, loginHandler }) => (
  <Fade in={fadeIn}>
    <Box>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={loginData.email}
        onChange={handleLoginChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        value={loginData.password}
        onChange={handleLoginChange}
        type="password"
        variant="outlined"
        margin="normal"
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} size="large" onClick={loginHandler}>
        Login
      </Button>
    </Box>
  </Fade>
);

// ✅ Main Component
const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setFadeIn(false);
    setTimeout(() => {
      setTabIndex(newValue);
      setFadeIn(true);
      setProfileImage(null);
    }, 300);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const signupHandler = async () => {
    const { userName, firstName, lastName, email, password, confirmPass } = formData;
    if (!userName || !email || !password || !confirmPass)
      return alert('Fields should not be empty');
    if (password.length < 8)
      return alert('Password should be minimum 8 characters long');
    if (password !== confirmPass)
      return alert('Password & confirm password mismatch');

    try {
      const data = new FormData();
      data.append('userName', userName);
      data.append('email', email);
      data.append('password', password);
      data.append('firstName', firstName);
      data.append('lastName', lastName);
      data.append('age', 0);
      data.append('isAdmin', false);
      if (profileFile) data.append('ProfPic', profileFile);

      await axios.post(`${BASE_URL}/auth/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      ToastAlert({ type: 'success', message: 'User Registered Successfully' });
      setTabIndex(0);
      setFormData({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
      });
    } catch (err) {
      console.error(err);
      ToastAlert({ type: 'error', message: err.response?.data?.message || 'Signup failed' });
    }
  };

  const loginHandler = async () => {
    const { email, password } = loginData;
    if (!email || !password) return alert('Enter both fields');

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password }, { withCredentials: true });
      console.log(res);
      const user = res.data.data;
      console.log(user);

      // localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user)); // Redux me user save kar

      ToastAlert({ type: 'success', message: `Welcome back ${user.userName}!` });
      navigate("/");
    } catch (err) {
      console.error(err);
      ToastAlert({ type: 'error', message: err.response?.data?.message || 'Invalid credentials' });
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
          <LoginForm
            fadeIn={fadeIn}
            loginData={loginData}
            handleLoginChange={handleLoginChange}
            loginHandler={loginHandler}
          />
        ) : (
          <SignupForm
            fadeIn={fadeIn}
            formData={formData}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            profileImage={profileImage}
            signupHandler={signupHandler}
          />
        )}
      </StyledPaper>
    </Grid>
  );
};

export default AuthForm;
