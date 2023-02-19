import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CustomAccordian = (props) => {
  const { summary, children, onChange, expanded } = props;
  return (
    <Accordion onChange={onChange} expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        id="panel1bh-header"
        sx={{ background: "#198c83" }}
      >
        <Typography
          fontWeight={600}
          color={"white"}
          fontSize={14}
          width="100%"
          textAlign={"center"}
        >
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
