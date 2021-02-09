import axiosAPI from "axios";

const getUsers = ({ page, limit }) => {
  return axiosAPI
    .get(
      page
        ? limit
          ? `/api/users?page=${page}&limit=${limit}`
          : `/api/users?page=${page}`
        : "/users"
    )
    .then((response) => response.data);
};

const getStats = ({ id, dateIn, dateOut }) => {
  return axiosAPI
    .get(
      id
        ? dateIn && dateOut
          ? `/api/stats/${id}?dateIn=${dateIn}&dateOut=${dateOut}`
          : `/api/stats/${id}`
        : "/api/stats/1"
    )
    .then((response) => response.data);
};

export { getUsers, getStats };
