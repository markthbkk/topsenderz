// import { Text, Accordion } from "@contentful/f36-components";
import { useContext, useState } from "react";
import SenderChartTable from "./SenderChartTable.jsx";
import { GlobalContext } from "../context/GlobalState.jsx";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Collapse,
} from "@chakra-ui/react";

import "./HomeAccordion.css";
let clickedUser = "";

const HomeAccordion = (props) => {
  const { switchCurrentUser, updateCurrentUserSearchResults } =
    useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(true);

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
      width="min(100vw, 800px)"
      marginLeft=""
      allowToggle
      defaultIndex={[-1]}
      display="flex"
      // alignItems="center"
      justifyContent="flex-start"
      flexWrap="wrap"
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
            flexBasis="100%"
            boxShadow="lg"
            borderLeftWidth="5px"
            borderLeftColor={borderClr}
            marginBottom="1vh"
          >
            <h2>
              <AccordionButton maxWidth="100vw" overflow="hidden">
                <Box
                  flex="1"
                  textAlign="left"
                  overflowWrap="break-word"
                  wordwrap="break-word"
                  w="85%"
                  fontSize=".8em"
                >
                  {item}
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel
              display={item === clickedUser ? "block" : "none"}
              pb={2}
            >
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
