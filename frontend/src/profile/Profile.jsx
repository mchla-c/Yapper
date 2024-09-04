import { Box, Container, Grid, Typography, Card, CardContent, Divider, Tab, Tabs, TextField, AvatarGroup, Avatar, IconButton, Button } from '@mui/material'
import React, { useEffect } from 'react' 
import { useState } from 'react';
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Wc } from '@mui/icons-material';
import { containerStyle, cardStyle, CustomButton } from '../components/styles';
import { FeedCard, ProfileCard } from '../components/Dashboard';
import { FriendList, MainProfileCard, NotUserButtons } from './profileComponents';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


export default function Profile() {
    const {username} = useParams()

    const {data: user, isLoading, refetch, isRefetching} = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }

                return data
            } catch (error) {
                throw new Error(error)
            }
        }
    })

    //const memberSinceDate = formatMemberSinceDate(user?.createdAt)

    useEffect(() => {
        refetch()
    }, [username, refetch])

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const friends = [
    { name: "Alice", imageUrl: "" },
    { name: "Bob", imageUrl: "" },
    { name: "Charlie", imageUrl: "" },
    { name: "Dave", imageUrl: "" }, // Initials will be shown if no image
    { name: "Eve", imageUrl: "" },
  ];

  return (
    <Box sx={containerStyle}>
        <Grid container spacing={3}>
            {/* Left: Fixed Profile Card */}
            <Grid item xs={12} md={3}>
                <Box sx={{ position: 'sticky', top: '60px' }}>
                    <MainProfileCard
                        avatarsrc={''}
                        name={user?.fullName}
                        userid={user?.username}
                        location={''}
                        numFollowers={user?.followers.length}
                        numFollowing={user?.following.length}
                        bio={user?.bio}
                    />
                    <NotUserButtons/>
                </Box>
            </Grid>

        {/* Right: Dynamic Card Posts */}
        <Grid item xs={12} md={9}>
          <FriendList friends={friends} />

          {/* Mini Navbar for Posts, Likes, and Search */}
          <Box mb={3}>
            <Card sx={cardStyle}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                {/* Tabs for Posts and Likes */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{ flexGrow: 1 }}
                >
                  <Tab label="Posts" />
                  <Tab label="Likes" />
                </Tabs>

                {/* Search Bar */}
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  sx={{ marginLeft: "20px", width: "300px" }}
                />
              </CardContent>
            </Card>
          </Box>

          {[1, 2, 3, 4, 5, 6].map((post, index) => (
            <Box key={index} mb={2}>
              <FeedCard />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
