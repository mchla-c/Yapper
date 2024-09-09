import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Divider,
    Tab,
    Tabs,
    TextField,
    AvatarGroup,
    Avatar,
    IconButton,
    Button,
    AppBar,
  } from "@mui/material";
import { cardStyle, CustomButton } from "../styles";
import { useTheme } from '@mui/material/styles';

import { useMutation } from "@tanstack/react-query";

// Seach Component
export function SearchCard() {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };

  return (
    <Grid>
        <Card sx={{ borderRadius: "17px", border: "1px solid #79747E", boxShadow: 3, marginBottom: "20px "}}>
            <CardContent sx={{display: "flex", justifyContent: "center"}}>
                <Box>
                    <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    sx={{ marginLeft: "20px", width: "500px", backgroundColor:'#9e9e9e', marginTop: "20px"}}
                    />
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{marginTop: '20px'}}>
                        <Tab label={(<Typography variant="h6" fontWeight={'fontWeightBold'}>Top</Typography>)}/>
                        <Tab label={(<Typography variant="h6" fontWeight={'fontWeightBold'}>Latest</Typography>)}/>
                        <Tab label={(<Typography variant="h6" fontWeight={'fontWeightBold'}>People</Typography>)}/>
                        <Tab label={(<Typography variant="h6" fontWeight={'fontWeightBold'}>Photos</Typography>)}/>
                        <Tab label={(<Typography variant="h6" fontWeight={'fontWeightBold'}>Videos</Typography>)}/>
                    </Tabs>
                </Box>
            </CardContent>
        </Card>
    </Grid>
  );
}
