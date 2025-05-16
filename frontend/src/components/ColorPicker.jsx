import React, { useState } from "react";
import PropTypes from "prop-types";

const defaultPalette = [
  "#ebb6b6", "#ebd1b6", "#ebe6b6", "#d1ebb6",
  "#bee7f3", "#d1bef3", "#a4b7e4", "#d4d3d4",
];

const ColorPicker = ({ selectedColor, onChange, palette = defaultPalette }) => {
  const [showPalette, setShowPalette] = useState(false);

  const togglePalette = () => setShowPalette((prev) => !prev);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          border: "1px solid #ccc",
          backgroundColor: selectedColor,
          cursor: "pointer",
        }}
        onClick={togglePalette}
      />
      {showPalette && (
        <div style={styles.palette}>
          {palette.map((color) => (
            <div
              key={color}
              style={{ ...styles.colorBox, backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setShowPalette(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  palette: PropTypes.arrayOf(PropTypes.string),
};

const styles = {
  palette: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 24px)",
    gap: "8px",
    position: "absolute",
    top: "30px",
    left: 0,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    zIndex: 1000,
  },
  colorBox: {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
};

export default ColorPicker;
