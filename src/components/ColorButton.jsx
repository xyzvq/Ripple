import React from 'react';
import { ChromePicker } from 'react-color';
import { Button, Typography } from '@mui/material';

class ColorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: this.props.color || {
        r: '69',
        g: '69',
        b: '69',
        a: '1',
      },
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  // handleChange = (color) => {
  //   this.setState({ color: color.rgb })
  // };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.props.onChange && this.props.onChange(color); // Call the passed onChange function
  };

  rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('');
  }

  getTextColor = (r, g, b) => {
    // Calculate relative luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? '#000' : '#FFF';
  };



  render() {
    const { r, g, b, a } = this.state.color;
    const backgroundColor = `rgba(${r}, ${g}, ${b}, ${1})`;
    const hexColor = this.rgbToHex(r, g, b);
    const textColor = this.getTextColor(r, g, b);

    const popover = {
      position: 'absolute',
      zIndex: '3',
      top: '14%',
      left: '20%',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return (
      <div>
        <Button onClick={this.handleClick} style={{ backgroundColor: backgroundColor, }} size="small" sx={{ height: '30px', width: '100%'}}>
          <Typography>COLOR</Typography>
        </Button>
        {this.state.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose}/>
            <ChromePicker color={this.state.color} onChange={this.handleChange} disableAlpha={true} />
          </div>
        ) : null}
      </div>
    )
  }
}

export default ColorButton;