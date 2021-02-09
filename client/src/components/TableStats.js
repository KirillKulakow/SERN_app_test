import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Pagination from "./Pagination";
import styles from "./TableStats.module.scss";
import { getUsers } from "../utils/apiRequest";

const initOptions = [...new Array(41).keys()].map((el, index) => index + 10);

const TableStats = () => {
  const [page, setPage] = useState(1);
  let location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(16);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const handleChangePage = useCallback(
    (data) => {
      let { selected } = data;
      const pageQuery = queryString.parse(location.search);
      pageQuery.page = selected + 1;
      const newQuery = `/users_stat?${queryString.stringify(pageQuery)}`;
      history.push(newQuery);
    },
    [history, location]
  );

  useEffect(() => {
    const pageQuery = Number(queryString.parse(location.search).page);
    const limitQuery = Number(queryString.parse(location.search).limit);
    if (pageQuery && !Number.isNaN(pageQuery)) {
      if (page !== pageQuery) {
        setPage(pageQuery);
      }
    } else {
      setPage(1);
    }
    if (limitQuery && !Number.isNaN(limitQuery)) {
      if (limit !== limitQuery) {
        setLimit(limitQuery);
      }
    } else {
      setLimit(16);
    }
    // only location.search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUsers({ page, limit })
      .then((res) => {
        setData(res.data);
        setPageCount(Number(res.allPage));
        setLoading(false);
      })
      .catch((e) => {
        setError("Some error: " + e.message);
      });
  }, [page, limit]);

  const pushToScreenUser = useCallback(
    (id, first_name, last_name) => () => {
      history.push(
        `/users_stat/${id}?first_name=${first_name}&last_name=${last_name}`
      );
    },
    [history]
  );

  const usersList = useCallback(
    (data) => (
      <tbody>
        {data.map((el) => (
          <tr
            onClick={pushToScreenUser(el.user_id, el.first_name, el.last_name)}
            key={`${el.user_id}${el.date}`}
          >
            <td>{el.user_id}</td>
            <td>{el.first_name}</td>
            <td>{el.last_name}</td>
            <td>{el.email}</td>
            <td>{el.gender.toLowwerCase()}</td>
            <td>{el.ip_address}</td>
            <td>{el.clicks}</td>
            <td>{el.page_views}</td>
          </tr>
        ))}
      </tbody>
    ),
    [pushToScreenUser]
  );

  const setNewLimit = (event) => {
    const query = queryString.parse(location.search);
    query.limit = Number(event.target.value);
    const newQuery = `/users_stat?${queryString.stringify(query)}`;
    history.push(newQuery);
  };

  return (
    <div className={styles.container}>
      <select onChange={setNewLimit} value={limit}>
        {initOptions.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>IP address</th>
            <th>Total clicks</th>
            <th>Total page views</th>
          </tr>
        </thead>
        {data.length > 0 && !loading ? (
          usersList(data)
        ) : error ? (
          <tbody>
            <tr>
              <td colSpan='8' style={{ height: "800px" }}>
                {error}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan='8' style={{ height: "800px" }}>
                Loading...
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {data.length > 0 && !loading && !error ? (
        <Pagination
          pageInit={page}
          pageCount={pageCount}
          handlePageClick={handleChangePage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableStats;
