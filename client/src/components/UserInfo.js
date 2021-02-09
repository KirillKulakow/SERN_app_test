import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import { getStats } from "../utils/apiRequest";
import LinearCharts from "./LinearCharts";
import Title from "./Title";
import styles from "./UserInfo.module.scss";

const initialData = {
  date: [],
  dataArray: [],
};

const setLengthDate = (num) => {
  const numString = num + "";
  if (numString.length === 1) {
    return "0" + num;
  } else {
    return num;
  }
};

const initialOptions = [...Array(29).keys()].map(
  (el, index) => `2019-10-${setLengthDate(index + 2)}`
);

const UserInfo = () => {
  let { id } = useParams();
  const { search } = useLocation();
  const [name, setName] = useState(null);
  const [dataClicks, setDataClicks] = useState(initialData);
  const [dataViews, setDataViews] = useState(initialData);
  const [dateIn, setDateIn] = useState("2019-10-02");
  const [dateOut, setDateOut] = useState("2019-10-08");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchArray = useMemo(() => queryString.parse(search), [search]);

  useEffect(() => {
    searchArray.first_name && searchArray.last_name
      ? setName(`${searchArray.first_name} ${searchArray.last_name}`)
      : setName("Unknown");
  }, [searchArray]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getStats({ id, dateIn, dateOut })
      .then((res) => {
        groupInfo(res.data, "clicks", setDataClicks);
        groupInfo(res.data, "page_views", setDataViews);
        setLoading(false);
      })
      .catch((e) => setError("Some error: " + e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dateIn, dateOut]);

  const groupInfo = useCallback((data, type, cb) => {
    let date = data.map(
      (el) =>
        `${new Date(el.date).getMonth() + 1}-${new Date(el.date).getDate()}`
    );
    let dataArray = data.map((el) => (el[type] ? el[type] : 0));
    cb({ date, dataArray });
  }, []);

  const setNewDateIn = (event) => {
    setDateIn(event.target.value);
  };
  const setNewDateOut = (event) => {
    setDateOut(event.target.value);
  };

  const getDateInOptions = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    return initialOptions.map((el) => {
      let date = new Date(el).getDate();
      let _dateOut = new Date(dateOut).getDate();
      if (date < _dateOut) {
        return (
          <option key={el} value={el}>
            {el}
          </option>
        );
      }
    });
  }, [dateOut]);

  const getDateOutOptions = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    return initialOptions.map((el) => {
      let date = new Date(el).getDate();
      let _dateIn = new Date(dateIn).getDate();
      if (date > _dateIn) {
        return (
          <option key={el} value={el}>
            {el}
          </option>
        );
      }
    });
  }, [dateIn]);

  return (
    <>
      <div className={styles.container_title}>
        <Title text={name} />
        <select onChange={setNewDateIn} value={dateIn}>
          {getDateInOptions}
        </select>
        <select onChange={setNewDateOut} value={dateOut}>
          {getDateOutOptions}
        </select>
      </div>

      <div className={styles.container}>
        <h3 className={styles._info_first}>Clicks</h3>
        {error ? (
          <div className={styles.loading}>{error}</div>
        ) : !loading && dataClicks.dataArray[0] ? (
          <LinearCharts data={dataClicks} />
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
        <h3 className={styles._info_second}>Views</h3>
        {error ? (
          <div className={styles.loading}>{error}</div>
        ) : !loading && dataViews.dataArray[0] ? (
          <LinearCharts data={dataViews} />
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
    </>
  );
};

export default UserInfo;
