import { Facebook, Instagram, LinkedIn, LocationOn, Twitter } from "@mui/icons-material"
import { Avatar, Box, Card, CardContent, Divider, IconButton, Typography } from "@mui/material"
import { cardStyle, CustomButton } from "../components/styles"
import { Link } from "react-router-dom"
import useFollow from "../hooks/useFollow"
import { useQuery } from "@tanstack/react-query"


export const MainProfileCard = ({sx, avatarsrc, name, userid, location, numFollowers, numFollowing, bio}) => {
    return (
            <Card sx={[cardStyle, {height: 500, maxHeight: 500, ...sx}]}>
                <CardContent>
                    {/* Avatar at the top */}
                    <Avatar 
                    alt="User Name" 
                    src={avatarsrc}
                    sx={{ width: 100, height: 100, margin: '0 auto', marginTop: 2 }} 
                    />

                    {/* Name and Username */}
                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Typography variant="h5" component="div" sx={{ marginTop: 2}}>
                        {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        @{userid}
                        </Typography>

                        {/* Location and Pronouns Side-by-Side */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, marginBottom: 2 }}>
                            {/* Location */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn fontSize="small" sx={{ marginRight: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {location}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">{numFollowers}</Typography>
                            <Typography variant="body2" color="text.secondary">Followers</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">{numFollowing}</Typography>
                            <Typography variant="body2" color="text.secondary">Following</Typography>
                        </Box>
                    </Box>

                    {/* Bio */}
                    <Box sx={{ marginBottom: 3, margin: 2, maxheight:150, height: 100 }}>
                        <Typography variant="body1" component="div">
                        {bio} 
                        </Typography>
                    </Box>

                    {/* Social Media Icons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton href="https://facebook.com">
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://twitter.com">
                            <Twitter />
                        </IconButton>
                        <IconButton href="https://instagram.com">
                            <Instagram />
                        </IconButton>
                        <IconButton href="https://linkedin.com">
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
    )
}

export const NotUserButtons = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 2 }}>
                <CustomButton>Follow</CustomButton>
                <CustomButton>Message</CustomButton>
        </Box>
    )
}

export const UserButtons = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 2 }}>
                <CustomButton component={Link} to="/settings">Edit</CustomButton>
                <CustomButton>Share</CustomButton>
        </Box>
    )
}

export const FriendList = ({authUser}) => {
    const { data: user } = useQuery({ queryKey: ["userProfile"] });
    const friends = user.followers;

    return(
        <Box mb={3}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Typography variant='h5' gutterBottom>Friends</Typography>
                    <Divider/>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                            {friends.map((friend, index) => (
                            <Avatar 
                                component={Link}
                                to={`/profile/${friend.username}`}
                                key={index} 
                                alt={friend.fullName} 
                                src={friend.profileImg} 
                                style={{border: '0.5px solid #322F35'}}
                                sx={{ width: 44, height: 44, marginRight: 1 }} // Adjust size if needed
                            >
                                {/* Fallback to initials if no image */}
                            </Avatar>
                            ))}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

