import { Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import AccordionsList from "./customAccordianList";
import { mockdata } from "./helper";
import "./index.css";

const AppBody = styled("div")({
  padding: "1rem",
  background: "#d0f5f1",
  margin: "0px",
  height: "100vh",
});
function App() {
  const [data, setData] = useState(mockdata || []);

  return (
    <AppBody>
      <Typography
        variant="h1"
        textAlign={"center"}
        fontWeight={800}
        padding={4}
        overflow={"auto"}
      >
        Cloud Configuration
      </Typography>
      <AccordionsList
        data={data.sort((a, b) => a.timestamp - b.timestamp)}
        setData={setData}
      />
    </AppBody>
  );
}

export default App;
