import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "../../styles/FiltersCss/ColorFilter.css";
import PropTypes from "prop-types";

function ColorFilter({ colorChange, maxColValue, minColValue }) {
  return (
    <div className="color-filter">
      <MultiRangeSlider
        min={0}
        max={45}
        step={5}
        minValue={minColValue}
        maxValue={maxColValue}
        ruler
        labels={[0, 5, 10, 15, 20, 25, 30, 35, 40, "40+"]}
        stepOnly
        onInput={(e) => {
          colorChange(e);
        }}
      />
    </div>
  );
}

ColorFilter.propTypes = {
  colorChange: PropTypes.func.isRequired,
  minColValue: PropTypes.func.isRequired,
  maxColValue: PropTypes.func.isRequired,
};

export default ColorFilter;
