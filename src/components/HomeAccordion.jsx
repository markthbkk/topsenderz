// import { Text, Accordion } from "@contentful/f36-components";
import { useContext } from "react";
import SenderChartTable from "./SenderChartTable.jsx";
import { GlobalContext } from "../context/GlobalState.jsx";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import "./HomeAccordion.css";
let clickedUser = "";

const HomeAccordion = (props) => {
  const { switchCurrentUser, updateCurrentUserSearchResults } =
    useContext(GlobalContext);

  console.log(props.senders);

  const senders = props.senders;

  const clickHandler = async function (idx) {
    // e.preventDefault();

    switchCurrentUser(senders[idx]);
    updateCurrentUserSearchResults(senders[idx]);
    clickedUser = senders[idx];
  };

  return (
    <Accordion
      allowToggle
      onChange={(idx) => {
        console.log(senders[idx]);
        clickHandler(idx);
      }}
    >
      {senders.map((item) => {
        let borderClr = "orange.300";

        item === clickedUser
          ? (borderClr = "green.700")
          : (borderClr = "orange.300");

        return (
          <AccordionItem
            key={item}
            boxShadow="lg"
            borderLeftWidth="5px"
            borderLeftColor={borderClr}
          >
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {item}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <Box w="100%" flex="1" mt={4}>
                <SenderChartTable sender={item} />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default HomeAccordion;
