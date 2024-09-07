import { Box, Card, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { cardStyle, containerStyle, CustomButton } from "../components/styles";
import { EditAvatar, EditPassword, EditProfile } from "./settingsPage";
import { MainProfileCard } from "../profile/profileComponents";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../utils/date";


export default function Settings() {

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    const {
        data: user,
        isError,
        error,
        refetch,
      } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await fetch("api/auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        },
      });


    const memberSinceDate = formatMemberSinceDate(user?.createdAt)


    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return(
        <Box sx={containerStyle}>
            <Grid container spacing={5}>

                {/* Right side: Profile Card */}
                <Grid item xs={12} md={3} position='sticky'>
                  <Box>
                <MainProfileCard
                        avatarsrc={user?.profileImg}
                        name={user?.fullName}
                        userid={user?.username}
                        location={memberSinceDate}
                        numFollowers={user?.followers.length}
                        numFollowing={user?.following.length}
                        bio={user?.bio}
                        sx={{width: "100%"}}
                    /> 
                    </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <CustomButton href={`/profile/${user?.username}`}>
                        Go to Profile 
                    </CustomButton>
                  </Box>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Box sx={{width: '100%'}}>
                    <Card sx={[cardStyle, {padding: 4, display: 'flex', flexDirection: 'column', width: "100%"}]}>
                        <Typography variant="h4" fontWeight={'bold'} sx={{mb: 2}}>Profile Settings</Typography>
                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ flexGrow: 1, }}>
                                <Tab label="Profile" />
                                <Tab label="Auth" />
                                <Tab label="Avatar" />
                            </Tabs>

                        <Divider/>
                        {tabValue === 0 && <EditProfile authUser={authUser}/>}
                        {tabValue === 1 && <EditPassword authUser={authUser}/>}
                        {tabValue === 2 && <EditAvatar authUser={user}/>}
                    </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}