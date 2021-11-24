import React from 'react';
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import axios from 'axios';


const Styles = styled.div `
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

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
    
       <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table> 
     <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> 
    </div>
  )
}

function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    console.log("Hii");
    axios.get(`http://localhost:9001/api/payments`).then(res => {
      console.log(res)
      let dataArray=[];
      res.data.results.forEach(e => {
        let payment={};
        payment.amount=e.paymentAmount;
        payment.currency=e.paymentCurrency;
        payment.type=e.paymentType;
        payment.date=e.paymentDate,
        payment.status=e.paymentStatus;
        payment.toAccount=e.toAccaunt.accountNumber;
        payment.fromAccount=e.fromAccount.accountNumber;
        dataArray.push(payment);
      });
      setData(dataArray);
    });
  }, []);
  
  const columns = [
    {
      Header: 'Amount',
      accessor: 'amount'
    }, {
      Header: 'Currency',
      accessor: 'currency'
    }, {
      Header: 'Type',
      accessor: 'type'
    }, {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'ToAccount',
      accessor: 'toAccount'
    },

    {
      Header: 'FromAccount',
      accessor: 'fromAccount'
    },
  ]

  
  return (
    <Styles>
      <Table data={data} columns={columns} />
    </Styles>
  )

}

export default App
