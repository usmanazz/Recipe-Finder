import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 225,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ value, setValue, unit, min, max, step }) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" style={{ fontWeight: "bold" }} gutterBottom>
        {value[0]} {unit} - {value[1]} {unit}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
