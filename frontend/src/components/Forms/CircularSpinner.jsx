import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function CircularSpinner() {
  const loading = useSelector((state) => state.loading.loading);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed", 
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        zIndex: 10000, 
      }}
    >
      <CircularProgress size="10rem" />
    </div>
  );
}

export default CircularSpinner;


