import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios'
import { theme } from './components/palette';
import logo from './assets/logo.png'; 
import { cardStyle } from './components/styles';
import { Card, CardContent, CardMedia } from '@mui/material';
import { AuthCard } from './components/authcard';


const defaultTheme = createTheme();

function SignUp() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/signup', {name, email, password})
        .then(result => {console.log(result)
            navigate('/home')
        })
        .catch(err => console.log(err))
    }

  return (
    <ThemeProvider theme={theme}>
        <AuthCard logosrc={logo} title="See who's Yapping" subtitle="Ready to yap?">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, mr: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Full Name"
                          name="name"
                          autoComplete="family-name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                     <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, 
                    color: 'white', 
                    borderRadius: '17px', 
                    boxShadow: 2,
                    padding: 1.2, }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end" sx={{mb: 3}}>
                    <Grid item>
                      <Link to='/signin' variant="body2">
                        Already have an account? Sign in
                      </Link>
                  </Grid>
                </Grid>
              </Box>
        </AuthCard>
   </ThemeProvider>
  );
}

export default SignUp