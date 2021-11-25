import React from 'react';
import { useTable, usePagination } from 'react-table'
import PureTable from './PureTable';
import Pagination from './Pagination';

function Table({columns, data}) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    )
  
  
    return (
      <div>
        <PureTable  getTableProps={getTableProps}
      getTableBodyProps = {getTableBodyProps}
      headerGroups={headerGroups}
      prepareRow ={prepareRow}
      page ={page}
 />

<Pagination  canPreviousPage= {canPreviousPage}
      canNextPage = {canNextPage}
      pageOptions={pageOptions}
      pageCount= {pageCount}
      gotoPage = {gotoPage}
      nextPage ={nextPage}
      previousPage={previousPage}
      setPageSize={setPageSize}
       pageIndex= {pageIndex}
        pageSize ={pageSize}
 />
      </div>
    )
  }

  export default Table;