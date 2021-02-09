import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";

const Pagination = ({ pageInit, pageCount, handlePageClick }) => {
  const previous = (
    <div className={styles.previous}>
      <svg
        width='17'
        height='28'
        viewBox='0 0 17 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15 2L3 14L15 26'
          stroke='#3A80BA'
          strokeWidth='4'
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
  const next = (
    <div className={styles.next}>
      <svg
        width='17'
        height='28'
        viewBox='0 0 17 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15 2L3 14L15 26'
          stroke='#3A80BA'
          strokeWidth='4'
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
  const clickPage = (data) => {
    handlePageClick(data);
  };

  return (
    <ReactPaginate
      previousLabel={previous}
      nextLabel={next}
      breakLabel={"..."}
      breakClassName={styles.break_me}
      pageCount={pageCount}
      forcePage={pageInit - 1}
      pageClassName={styles.page}
      pageLinkClassName={styles.page_link}
      marginPagesDisplayed={3}
      pageRangeDisplayed={4}
      onPageChange={clickPage}
      containerClassName={styles.pagination_container}
      subContainerClassName={styles.pagination_container_sub}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      nextLinkClassName={styles.link}
      previousLinkClassName={styles.link}
      previousClassName={styles.link_container}
      nextClassName={styles.link_container}
      disableInitialCallback={true}
    />
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func,
  pageInit: PropTypes.number,
};

export default Pagination;
