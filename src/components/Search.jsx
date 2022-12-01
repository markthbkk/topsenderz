import React, { useContext, useState, useEffect } from "react";
import { Flex, SearchField } from "gestalt";
import "gestalt/dist/gestalt.css";
import styles from "./Search.module.css";
import { GlobalContext } from "../context/GlobalState.jsx";

function Search(props) {
  const [queryString, setQueryString] = useState("");

  const { allUsers } = useContext(GlobalContext);

    const searchHandler = props.searchHandler;
    
    const pageHandler = props.pageHandler

  useEffect(() => {
    pageHandler(1);

    const timeoutId = setTimeout(
      searchHandler(
        allUsers.filter((el) => {
          return el.toLowerCase().includes(queryString.toLowerCase());
        })
      ),
      2000
    );

    return () => clearTimeout(timeoutId);
  }, [queryString]);

  return (
    <Flex alignItems="center" flex="grow" className={styles.flexContainer}>
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label=""
          id="searchSendersExample"
          onChange={({ value }) => setQueryString(value)}
          placeholder="Search by Email address"
          value={queryString}
        />
      </Flex.Item>
    </Flex>
  );
}

export default Search;
