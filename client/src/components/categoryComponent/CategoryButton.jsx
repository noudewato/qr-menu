import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// const images = [
//   {
//     url: "https://media.istockphoto.com/id/868408746/photo/assorted-indian-dish.webp?b=1&s=170667a&w=0&k=20&c=ae-29IvyAog_Bth2OhAWLvsIs_Ry7wY5wBgk3UfqvAM=",
//     title: "Breakfast",
//     width: "100%",
//   },
//   {
//     url: "https://media.istockphoto.com/id/500466008/photo/beef-steak.webp?b=1&s=170667a&w=0&k=20&c=_Cp7gTDs4eFLLWgJomzTzT-x-Mdy_Ar4Vkz00FWqku8=",
//     title: "Dinner",
//     width: "100%",
//   },
//   {
//     url: "https://media.istockphoto.com/id/1212768319/photo/healthy-lunch-table-scene-with-nutritious-lettuce-wraps-buddha-bowl-vegetables-sandwiches-and.webp?b=1&s=170667a&w=0&k=20&c=v5KiMC9zxDe3ne2XDBd7BpOsk3aJVOAAxzv4-L2stMM=",
//     title: "Lunch ",
//     width: "100%",
//   },
// ];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 200,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
  borderRadius: '1rem',
}))

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderRadius: '1rem',
})

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: '1rem',
}))

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius: '1rem',
}))

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
  borderRadius: '1rem',
}))

const CategoryButton = ({ category }) => {
  const { name, image, _id } = category
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 200,
        width: '100%',
        backgroundColor: 'red',
        borderRadius: '1rem',
      }}
    >
      <ImageButton
        focusRipple
        key={_id}
        style={{
          width: '100%',
        }}
      >
        <Link to={`/menuList/${_id}`}>
          <ImageSrc style={{ backgroundImage: `url(${image})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </Link>
      </ImageButton>
    </Box>
  )
}

export default CategoryButton

CategoryButton.propTypes = {
  category: PropTypes.arrayOf(PropTypes.any).isRequired,
}
