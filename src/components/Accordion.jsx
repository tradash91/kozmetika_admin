import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const StyledAccordion = styled(Accordion)`
  font-size: 18px;
  
`;
const StyledAccordionSummary = styled(AccordionSummary)`
  cursor: pointer;
  font-size: 20px;
  
`;
const StyledAccordionBody = styled.div``;
function SimpleAccordion({ children, title, onClick }) {
  return (
    <StyledAccordion onClick={onClick}>
      <StyledAccordionSummary>{title}</StyledAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
}

export default SimpleAccordion;
