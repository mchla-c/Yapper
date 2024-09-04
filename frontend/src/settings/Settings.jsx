import { Box, Card, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { cardStyle, containerStyle } from "../components/styles";
import { EditPassword, EditProfile } from "./settingsPage";
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
                <MainProfileCard
                        avatarsrc={user?.profileImg}
                        name={user?.fullName}
                        userid={user?.username}
                        location={memberSinceDate}
                        numFollowers={user?.followers.length}
                        numFollowing={user?.following.length}
                        bio={user?.bio}
                    /> {/* Your existing profile card */}
                </Grid>

                <Grid item xs={12} md={9}>
                    <Card sx={[cardStyle, {padding: 4}]}>
                        <Typography variant="h4" fontWeight={'bold'} sx={{mb: 2}}>Profile Settings</Typography>
                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ flexGrow: 1, }}>
                                <Tab label="Profile" />
                                <Tab label="Auth" />
                            </Tabs>

                        <Divider/>
                        {tabValue === 0 && <EditProfile authUser={authUser}/>}
                        {tabValue === 1 && <EditPassword authUser={authUser}/>}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}