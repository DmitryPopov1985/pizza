import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(evt) => onChangePage(evt.selected + 1)}
        pageRangeDisplayed={4}
        forcePage={currentPage -1}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination