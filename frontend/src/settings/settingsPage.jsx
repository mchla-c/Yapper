import { Box, Button, Card, Divider, Grid, TextField, Typography } from "@mui/material"
import { MainProfileCard } from "../profile/profilepage"
import { cardStyle, CustomButton } from "../components/styles"

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
        id="password"
        size="small"
        margin="normal"
        sx={{ mt: 0, mb: 2 }}
        />
    </Grid>
  )
}

export const EditProfile = () => {
    return (
      <Box component="form" >
        <Typography variant="h5" fontWeight={'bold'} sx={{mb: 2, mt: 2}}>Edit Profile</Typography>
        <Grid container 
        direction="column" 
        sx={{width: '60%', mt: 2}}>

          <EditProfileText label="Full Name"/>
          
          <EditProfileText label="Email"/>

          <EditProfileText label="Location"/>
          <Grid item>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>Bio</Typography>
            <TextField
              fullWidth
              label="Bio"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              sx={{ mt: 0, mb: 3 }}
            />
          </Grid>
          
          {/* Add more form fields as needed */}
          <CustomButton
            type="submit"
          >
            Save Changes
          </CustomButton>
        </Grid>
      </Box>

    )
}

export const EditPassword = () => {
  return (
    <Box component="form" >
      <Typography variant="h5" fontWeight={'bold'} sx={{mb: 2, mt: 2}}>Edit Password</Typography>
        <Grid container 
        direction="column" 
        sx={{width: '60%', mt: 2}}>

          <EditPasswordText title="Current Password"/>

          <EditPasswordText title="New Password"/>

          <EditPasswordText title="Confirm New Password"/>
          
          {/* Add more form fields as needed */}
          <CustomButton
            type="submit"
          >
            Save Changes
          </CustomButton>
        </Grid>
      </Box>
  )
}