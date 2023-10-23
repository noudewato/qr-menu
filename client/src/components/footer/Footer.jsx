import * as React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import { Box } from '@mui/material'
import { CContainer } from '@coreui/react'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgb(255, 235, 120)',
        p: ' 50px 10px',
        mt: '2rem',
        borderRadius: 2,
        boxShadow: 4,
        color: 'black',
      }}
    >
      <CContainer>
        <>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight={'bold'} color="text.primary" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero harum nemo libero
                ullam laboriosam quam earum molestiae quisquam vitae nesciunt.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom fontWeight={'bold'}>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accra, Nima Market, Ghana
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: tablemenu@gmail.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +233509747736
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" fontWeight={'bold'} gutterBottom>
                Follow Us
              </Typography>
              <Link href="https://www.facebook.com/" color="inherit">
                <Facebook />
              </Link>
              <Link href="https://www.instagram.com/" color="inherit" sx={{ pl: 1, pr: 1 }}>
                <Instagram />
              </Link>
              <Link href="https://www.twitter.com/" color="inherit">
                <Twitter />
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit">SoftPro</Link> {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </>
      </CContainer>
    </Box>
  )
}
