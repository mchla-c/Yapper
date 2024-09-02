import { Box, Card, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { cardStyle, containerStyle } from "../components/styles";
import { EditPassword, EditProfile } from "./settingsPage";
import { MainProfileCard } from "../profile/profilepage";
import { useState } from "react";


export default function Settings() {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return(
        <Box sx={containerStyle}>
            <Grid container spacing={5}>

                {/* Right side: Profile Card */}
                <Grid item xs={12} md={3} position='sticky'>
                    <MainProfileCard /> {/* Your existing profile card */}
                </Grid>

                <Grid item xs={12} md={9}>
                    <Card sx={[cardStyle, {padding: 4}]}>
                        <Typography variant="h4" fontWeight={'bold'} sx={{mb: 2}}>Profile Settings</Typography>
                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ flexGrow: 1, }}>
                                <Tab label="Profile" />
                                <Tab label="Auth" />
                            </Tabs>

                        <Divider/>
                        <EditProfile/>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}