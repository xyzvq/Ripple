import React from 'react';
import { Box, Slider, Stack, Typography, Grid, useMediaQuery } from '@mui/material';

const Sliders = ({ sliders, small, spacing}) => {

    const isMobile = useMediaQuery('(max-width: 600px)');
    
    return (
        <Box width='100%' height='100%' paddingTop='10%' >
            <Stack spacing={spacing} direction='column' alignItems='center'>
                {sliders.map((slider, index) => (
                    <Grid container spacing={isMobile ? 0 : 1} alignItems='center' key={index} style={{ width: '88%', marginLeft:'-1%' }}>
                        <Grid item xs={12} sm={3}>
                            <Typography variant='BUTTON TEXT'>{slider.label}</Typography>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Slider 
                                aria-label={slider.label} 
                                value={slider.value} 
                                onChange={(e, newVal) => slider.setter(newVal)} 
                                valueLabelDisplay="auto" 
                                min={slider.min} 
                                max={slider.max} 
                                step={slider.step}
                                size={small ? 'small' : 'medium'}
                                
                            />
                        </Grid>
                    </Grid>
                ))}
            </Stack>
        </Box>
    );
};

export default Sliders;
