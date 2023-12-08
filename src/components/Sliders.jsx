import React from 'react';
import { Box, Slider, Stack, Typography, Grid } from '@mui/material';

const Sliders = ({ xMultiplier, setXMultiplier, yMultiplier, setYMultiplier, rippleSpeed, setRippleSpeed, noiseStrength, setNoiseStrength, color1 }) => {
    return (
        <Box width='100%' paddingTop='10%'>
            <Stack spacing={1} direction='column' alignItems='center'>
                
                <Grid container spacing={1} alignItems='center'  style={{ width: '80%' }}>
                        <Grid item xs={12} sm={4}>
                            <Typography  variant='BUTTON TEXT'>X</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Slider aria-label='xMultiplier' value={xMultiplier} onChange={(e, newVal) => setXMultiplier(newVal)} valueLabelDisplay="auto" min={0.0} max={20.0} step={0.1} />
                        </Grid>
                </Grid>

                <Grid container spacing={1} alignItems='center'  style={{ width: '80%' }}>
                    <Grid item xs={12} sm={4}>
                        <Typography  variant='BUTTON TEXT'>Y</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Slider aria-label='yMultiplier' value={yMultiplier} onChange={(e, newVal) => setYMultiplier(newVal)} valueLabelDisplay="auto" min={0.0} max={20.0} step={0.1} />
                    </Grid>
                </Grid>

               <Grid container spacing={1} alignItems='center' style={{ width: '80%' }}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='BUTTON TEXT'>Speed</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Slider aria-label='rippleSpeed' value={rippleSpeed} onChange={(e, newVal) => setRippleSpeed(newVal)} valueLabelDisplay="auto" min={0.1} max={1.5} step={0.05} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems='center'  justifyContent={'space-around'} style={{ width: '80%' }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant='BUTTON TEXT'>Strength</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Slider aria-label='noiseStrength' value={noiseStrength} onChange={(e, newVal) => setNoiseStrength(newVal)} valueLabelDisplay="auto" min={0.1} max={4.0} step={0.1} />
                    </Grid>
                </Grid>

            </Stack>
        </Box>
    );
};

export default Sliders;

