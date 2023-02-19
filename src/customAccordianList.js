import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import styled from "styled-components";
import { CustomAccordian } from "./customAccordian";
import { convertedDate, download, replaceWithBr } from "./helper";
const ListWrap = styled("div")({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  background: "#d0f5f1",
});
const AccordianDetailWrap = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
});
const TextWrap = styled("div")({
  display: "flex",
  gap: "2rem",
  alignItems: "center",
});
const CodeBlockWrap = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  background: "#e1e1e1",
  padding: "1rem",
  "&>div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
  },
});

export default function AccordionsList({ data, setData }) {
  const [expanded, setExpanded] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleClickOpen = (code) => {
    setCode(code);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getDataPair = (heading, data) => (
    <TextWrap>
      <Typography fontWeight={600} fontSize={14} color="#198c83">
        {heading}
      </Typography>
      <Typography fontSize={14} fontWeight={600} color={"#555"}>
        {data}
      </Typography>
    </TextWrap>
  );

  const getCodeBlock = (data) => (
    <CodeBlockWrap>
      <div>
        <Button variant="contained" onClick={() => handleClickOpen(data)}>
          Update
        </Button>
        <Button variant="contained" onClick={() => download("code", data)}>
          Export
        </Button>
      </div>
      {<p dangerouslySetInnerHTML={{ __html: replaceWithBr(data) }} />}
    </CodeBlockWrap>
  );
  const onSaveChanges = () => {
    const currentTime = new Date();
    setData((prv) => [
      ...prv,
      { ...data[expanded], timestamp: currentTime.getTime(), code_block: code },
    ]);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle>{"Make necessary changes and save!"}</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-multiline-static"
            label="Code"
            multiline
            defaultValue={code}
            variant="filled"
            minRows={4}
            fullWidth
            onChange={evt=>setCode(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSaveChanges}>Save</Button>
        </DialogActions>
      </Dialog>
      <ListWrap>
        {data.map((item, idx) => (
          <CustomAccordian
            expanded={expanded === idx}
            summary={item.id}
            onChange={handleChange(idx)}
          >
            <AccordianDetailWrap>
              {getDataPair("Commited By : ", item.username || "-")}
              {getDataPair("Commited Message : ", item.message || "-")}
              {getDataPair("File Name : ", item.file_name || "-")}
              {getDataPair(
                "Commit Date : ",
                item.timestamp ? convertedDate(item.timestamp) : "-"
              )}
              {getCodeBlock(item.code_block)}
            </AccordianDetailWrap>
          </CustomAccordian>
        ))}
      </ListWrap>
    </>
  );
}
