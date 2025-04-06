import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DoneTopBar = ({ logo, buttonLabel, onButtonClick }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.topBar}>
      <span style={styles.logo} onClick={() => navigate("/timelineview")}>Dayfull</span>
      {buttonLabel && <button style={styles.button} onClick={onButtonClick}>{buttonLabel}</button>}
    </div>
  );
};

DoneTopBar.propTypes = {
  logo: PropTypes.string,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
};

const styles = {
  topBar: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#56c8d8",
    cursor: "pointer",
    marginLeft: "10px",
  },
  button: {
    background: "none",
    border: "none",
    fontSize: "14px",
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default DoneTopBar;
