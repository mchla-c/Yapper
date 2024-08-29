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
import { Card, CardContent } from '@mui/material';


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
      <Container component="main">
      <CssBaseline />
        <Grid container spacing={2} sx={{ minHeight: '90vh', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={cardStyle}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
          {/* Left Side: Logo Section */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main' }}>
            {/* Add your logo image here */}
            <Box
              component="img"
              sx={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'fill',
              }}
              alt="Logo"
              src={logo} // Update the path to your logo image
            />
          </Grid>

          {/* Right Side: Sign-Up Form */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ mx: 4 }}>
              {/* <Card sx={cardStyle}>
                <CardContent> */}
                  <Typography variant="h3" mb={3} fontWeight={'bold'}>
                    See who's Yapping
                  </Typography>
                  <Typography variant="h5" fontWeight={'bold'}>
                    Ready to yap?
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to='/signin' variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                 {/* </CardContent>
              </Card> */}
            </Box>

          </Grid>
          </CardContent>
              </Card>
        </Grid>
      </Container>
   </ThemeProvider>
  );
}

export default SignUp