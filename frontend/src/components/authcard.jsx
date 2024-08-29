import { Box, Card, CardContent, CardMedia, Container, CssBaseline, Grid, Typography } from '@mui/material'
import { cardStyle } from './styles'

export const AuthCard = ({logosrc, children, title, subtitle}) => {
    return(
        <Container component="main" maxWidth="lg"
        sx={{
        minHeight: '100vh',         
        display: 'flex',            
        alignItems: 'center',       
        justifyContent: 'center',   
      }}>
      <CssBaseline />
        <Grid container spacing={2} sx={{ minHeight: '90vh', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={[cardStyle, {width: 1200, height: 600}]}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', flexGrow:1, p:0, '&:last-child': { pb: 0 }}}>
                    {/* Left Side: Logo Section */}
                    <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main' }}>
                        <CardMedia
                        component="img"
                        sx={{
                            maxHeight: '50%',
                            maxWidth: '50%',
                            objectFit: 'contain', 
                        }}
                        alt="Logo"
                        src={logosrc} 
                        />
                    </Grid>

                    {/* Right Side: Form */}
                    <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Box sx={{ mx: 4 }}>
                        <Typography variant="h3" mb={3} mt={5} fontWeight={'bold'}>
                            {title}
                            </Typography>
                            <Typography variant="h5" fontWeight={'bold'}>
                                {subtitle}
                        </Typography>
                            {children}
                        </Box>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Container>
    )
}