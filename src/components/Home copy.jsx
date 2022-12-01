import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Home.module.css";
import HomeAccordion from "./HomeAccordion.jsx";
import Search from "./Search.jsx";

let allUsersQueryArray = new Array(0);

let allUsersQueryArrayNoBlanks = new Array(0);

let allUsersQueryArrayFinal = new Array(0);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayCandidates, setDisplayCandidates] = useState([])
  const [displayArray, setDisplayArray] = useState([]);

  console.log(currentPage);

  let indexStart;
  let indexEnd;

  useEffect(() => {
    indexStart = currentPage * 25 - 25;
    indexEnd = currentPage * 25 - 1;

    console.log(indexStart);
    console.log(indexEnd);
  }, [currentPage]);

  const { loadDistinctUsers } = useContext(GlobalContext);

  // console.log(allUsers);

  const prevPage = function (e) {
    e.preventDefault();

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    console.log(currentPage);
  };

  const nextPage = function (e) {
    // e.preventDefault();
    console.log(currentPage, allUsersQueryArrayNoBlanks.length);
    const lastPage = Math.ceil(allUsersQueryArrayNoBlanks.length / 25);
    console.log(lastPage, currentPage);
    if (currentPage < lastPage) {
      console.log("Updating Page Number");
      setCurrentPage(currentPage + 1);
    }
  };

  const allUsersQuery = async function () {
    

    const uRL = "http://localhost:5000/api/v1/spamStatsSenders";

    const allUsersQueryResult = await axios.get(uRL);

    if (allUsersQueryResult.status === 200) {
      allUsersQueryArray = allUsersQueryResult.data;

      // allUsersQueryArrayNoBlanks = allUsersQueryArray.filter((el, index) => {
      //   return el !== "";
      // });

      // allUsersQueryArrayFinal = allUsersQueryArrayNoBlanks.filter(
      //   (__, index) => {
      //     return index >= indexStart && index <= indexEnd;
      //   }
      // );
      // setDisplayArray(allUsersQueryArrayFinal);


       allUsersQueryArrayNoBlanks = allUsersQueryArray.filter((el, index) => {
         return el !== "";
       });
      
      setDisplayCandidates(allUsersQueryArrayNoBlanks);

      console.log(displayArray)

       allUsersQueryArrayFinal = displayCandidates.filter(
         (__, index) => {
           return index >= indexStart && index <= indexEnd;
         }
      );
      
      setDisplayArray(allUsersQueryArrayFinal)
       

      loadDistinctUsers(allUsersQueryArrayNoBlanks);

      console.log(displayArray);
    }
  };

  useEffect(() => {
    allUsersQuery();
  }, []);

  return (
    <div>
      <Search searchHandler={setDisplayCandidates} />
      <div className={styles.spacer}></div>
      <HomeAccordion senders={displayArray} />

      <div className={styles.buttonPanel}>
        <button onClick={prevPage} className={styles.btn}>
          <FaChevronLeft />
        </button>
        <div className={styles.btnLabel}>
          <p>Previous</p>
        </div>
        <div className={styles.btnLabel}>
          <p>Next</p>
        </div>
        <button onClick={nextPage} className={styles.btn}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
