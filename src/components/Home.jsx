import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState.jsx";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import styles from "./Home.module.css";
import HomeAccordion from "./HomeAccordion.jsx";
import Search from "./Search.jsx";

let allUsersQueryArray = new Array(0);

let allUsersQueryArrayNoBlanks = new Array(0);

let allUsersQueryArrayFinal = new Array(0);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [indexStart, setIndexStart] = useState();
  const [indexEnd, setIndexEnd] = useState();
  const [displayCandidates, setDisplayCandidates] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [searchVisible, setSearchVisible] = useState(false);

  const searchVisibilityHandler = () => {
    setSearchVisible(!searchVisible);
  };

  console.log(currentPage);

  useEffect(() => {
    setIndexStart(currentPage * 25 - 25);
    setIndexEnd(currentPage * 25 - 1);

    console.log(indexStart);
    console.log(indexEnd);
  }, [currentPage]);

  const { loadDistinctUsers } = useContext(GlobalContext);

  const prevPage = function (e) {
    e.preventDefault();

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    console.log(currentPage);
  };

  const nextPage = function (e) {
    console.log(currentPage, allUsersQueryArrayNoBlanks.length);

    console.log(lastPage, currentPage);
    if (currentPage < lastPage) {
      console.log("Updating Page Number");
      setCurrentPage(currentPage + 1);
    }

    // const setPanelVisibility = function () {
    //   const accordion = document.getElementsByClassName("chakra-accordion");

    //   const accordionArray = Array.from(accordion);

    //   const accordionItems = Array.from(accordionArray[0].childNodes);

    //   accordionItems.forEach((item) => {
    //     item.childNodes[1].outerHTML.replace(
    //       "display: block;",
    //       "display: none;"
    //     );
    //   });

    //   accordionItems.forEach((item) => {
    //     console.log(item.childNodes[1].outerHTML);
    //   });
    // };

    // setPanelVisibility();
  };

  const allUsersQuery = async function () {
    const uRL = "https://mailstats-api.onrender.com/api/v1/spamStatsSenders";

    const allUsersQueryResult = await axios.get(uRL);

    if (allUsersQueryResult.status === 200) {
      allUsersQueryArray = allUsersQueryResult.data;

      allUsersQueryArrayNoBlanks = allUsersQueryArray.filter((el, index) => {
        return el !== "";
      });

      setDisplayCandidates(allUsersQueryArrayNoBlanks);
      loadDistinctUsers(allUsersQueryArrayNoBlanks);
      console.log(allUsersQueryArrayNoBlanks);
      console.log(indexStart, indexEnd);
      renderPagedResults();
      console.log("setting last page");
    }
  };

  useEffect(() => {
    allUsersQuery();
  }, []);

  const renderPagedResults = () => {
    setLastPage(Math.ceil(displayCandidates.length / 25));

    allUsersQueryArrayFinal = displayCandidates.filter((__, index) => {
      return index >= indexStart && index <= indexEnd;
    });

    setDisplayArray(allUsersQueryArrayFinal);
  };

  useEffect(() => {
    console.log(displayCandidates);
    console.log(currentPage);
    console.log(lastPage);
    console.log(allUsersQueryArrayFinal);
    console.log(indexStart, indexEnd);
    renderPagedResults();

    setDisplayArray(allUsersQueryArrayFinal);
  }, [displayCandidates, indexStart]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerLabel}>Top Senders</div>
        <div onClick={searchVisibilityHandler} className={styles.searchIcon}>
          <FaSearch />
        </div>
      </div>
      {searchVisible && (
        <Search
          searchHandler={setDisplayCandidates}
          pageHandler={setCurrentPage}
        />
      )}
      <div className={styles.spacer}></div>
      <HomeAccordion senders={displayArray} />
      <div className={styles.buttonPanelWrapper}>
        <div className={styles.buttonPanel}>
          {currentPage > 1 ? (
            <>
              <button onClick={prevPage} className={styles.btn}>
                <FaChevronLeft />
              </button>
              <div className={styles.btnLabel}>
                <p>Previous</p>
              </div>
              <div></div>
            </>
          ) : (
            <>
              <div></div>
              <div></div>
              <div></div>
            </>
          )}

          {currentPage < lastPage ? (
            <>
              <div className={styles.btnLabel}>
                <p>Next</p>
              </div>
              <button onClick={nextPage} className={styles.btn}>
                <FaChevronRight />
              </button>
            </>
          ) : (
            <>
              <div></div>
              <div></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
