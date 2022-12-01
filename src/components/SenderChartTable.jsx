import React, { useEffect } from "react";
import styles from "./SenderChartTable.module.css";
import { GlobalContext } from "../context/GlobalState.jsx";
import { useContext } from "react";

const SenderChartTable = (props) => {
  const { currentUserSearchResults, currentUser } = useContext(GlobalContext);

  const sender = props.sender;

  useEffect(() => {
    if (sender === currentUser) {
      console.log(currentUser, currentUserSearchResults);
    }
  }, [currentUserSearchResults]);

  return (
    <div key={sender}>
      {currentUserSearchResults.map((item) => {
        let style = "";
        let tempCurrentUserSearchResults = [...currentUserSearchResults];

        const COUNT_SORTED_DESC = tempCurrentUserSearchResults.sort(
          (objA, objB) => {
            return objB.messageCount - objA.messageCount;
          }
        );

        let biggestCount = COUNT_SORTED_DESC[0];

        if (biggestCount) {
          let { messageCount } = biggestCount;

          let perCentWidth = (item.messageCount / Number(messageCount)) * 100;

          let perCentWidthString = perCentWidth.toString().concat("%");

          style = { width: perCentWidthString };
        }

        return (
          <div key={item._id} className={styles.chartWrapper}>
            <div className={styles.date}>{item.date}</div>
            <div className={styles.count}>
              <div className={styles.topBorder} style={style}></div>
              {item.messageCount}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SenderChartTable;
