import * as React from "react";
import { Box } from "@mui/material";
import "../../App.css";
import theme from "../../theme/index";

function Navbar() {
  return (
    <Box
      item
      style={{
        backgroundColor: theme.palette.secondary.main,
        height: "85px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <h2
        style={{
          color: "white",
        }}
      >
        MERN stack developer practical task
      </h2>
    </Box>
  );
}

export default Navbar;
