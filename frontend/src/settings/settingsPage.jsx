import { Box, Button, Card, Divider, Grid, TextField, Typography } from "@mui/material"
import { MainProfileCard } from "../profile/profileComponents"
import { cardStyle, CustomButton } from "../components/styles"
import useUpdateProfile from "../hooks/useUpdateProfile"
import { useEffect, useState } from "react"

const EditProfileText = ({label}) => {
  return (
    <Grid item>
    <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> {label}</Typography>
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      margin="normal"
      size="small"
      sx={{ mt: 0, mb: 2 }} />
      </Grid>
  )
}

const EditPasswordText = ({title}) => {
  return (
    <Grid item>
      <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> {title}</Typography>
      <TextField
        required
        fullWidth
        type="password"
        size="small"
        margin="normal"
        sx={{ mt: 0, mb: 2 }}
        />
    </Grid>
  )
}

export const EditProfile = ({authUser}) => {

    const [formData, setFormData] = useState({
      fullName: "",
      username: "",
      email: "",
      bio: "",
      // link: "",
    });

    const { updateProfile, isUpdatingProfile } = useUpdateProfile();

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      if (authUser) {
        setFormData({
          fullName: authUser.fullName,
          username: authUser.username,
          email: authUser.email,
          bio: authUser.bio,
          // link: authUser.link,
        });
      }
    }, [authUser]);

    return (
      <Box component="form"
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile(formData);
      }} 
      >
        <Typography variant="h5" fontWeight={'bold'} sx={{mb: 2, mt: 2}}>Edit Profile</Typography>
        <Grid container 
        direction="column" 
        sx={{width: '60%', mt: 2}}>

          <Grid item>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> Full Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ mt: 0, mb: 2 }} 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}/>
          </Grid>

          <Grid item>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> Username</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ mt: 0, mb: 2 }} 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleInputChange}/>
          </Grid>
          
          <Grid item>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> Email</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ mt: 0, mb: 2 }} 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}/>
          </Grid>


          <Grid item>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>Bio</Typography>
            <TextField
              fullWidth
              type="text" 
              label="Bio"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              sx={{ mt: 0, mb: 3 }}
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </Grid>
          
          {/* Add more form fields as needed */}
          <CustomButton
            type="submit"

          >
           {isUpdatingProfile ? "Updating..." : "Save Changes"}
          </CustomButton>
        </Grid>
      </Box>

    )
}

export const EditPassword = ({authUser}) => {

    const [formData, setFormData] = useState({
      newPassword: "",
      currentPassword: "",
    });

    const { updateProfile, isUpdatingProfile } = useUpdateProfile();

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      if (authUser) {
        setFormData({
          newPassword: "",
          currentPassword: "",
        });
      }
    }, [authUser]);

  return (
    <Box component="form" 
      onSubmit={(e) => {
      e.preventDefault();
      updateProfile(formData);
    }}
    >
      <Typography variant="h5" fontWeight={'bold'} sx={{mb: 2, mt: 2}}>Edit Password</Typography>
        <Grid container 
        direction="column" 
        sx={{width: '60%', mt: 2}}>

          <Grid item>
            <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> Current Password</Typography>
            <TextField
              required
              fullWidth
              type="password"
              size="small"
              margin="normal"
              sx={{ mt: 0, mb: 2 }}
              title="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              />
          </Grid>

          <Grid item>
            <Typography variant="h6" gutterBottom sx={{ mb: 0 }}> New Password</Typography>
            <TextField
              required
              fullWidth
              type="password"
              size="small"
              margin="normal"
              sx={{ mt: 0, mb: 2 }}
              title="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              />
          </Grid>

          {/* <EditPasswordText title="Confirm New Password"/> */}
          
          {/* Add more form fields as needed */}
          <CustomButton
            type="submit"
          >
            {isUpdatingProfile ? "Updating..." : "Save Changes"}
          </CustomButton>
        </Grid>
      </Box>
  )
}