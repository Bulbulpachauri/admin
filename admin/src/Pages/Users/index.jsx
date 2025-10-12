import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@mui/material/Checkbox";
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../context/MyContext';
import {MdOutlineMarkEmailRead, MdPhone, MdCalendarToday} from 'react-icons/md'

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
  { id: 'cuserName', label: 'USER NAME', minWidth: 100 },
  {
    id: 'UserEmail',
    label: 'USER EMAIL',
    minWidth: 150,
  },
  {
    id: 'userPh',
    label: 'USER PHONE NO',
    minWidth: 100,
  },
    {
    id: 'createdDate',
    label: 'CREATED',
    minWidth: 100,
  },
];

// Sample data - in a real app, this would come from an API
const createData = (userImg, userName, userEmail, userPhone, createdDate) => {
  return { userImg, userName, userEmail, userPhone, createdDate };
}

const rows = [
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-23'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-24'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-25'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-26'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-27'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-28'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-29'),
  createData('https://api.spicezgold.com/download/file_1734526836571_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-1-202403231855.jpg', 'Bulbulpachauri', 'bulbulpachaui21@gmail.com', '+91-8171306923', '2024-03-30'),
];


const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className="card bg-white shadow-md rounded-md p-5 mt-5">
          <div className="flex items-center w-full px-5 justify-between">
            <div className="col w-[20%]">
              
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">
          Users List
          <span className="font-[400] text-[14px] ">(Material Ui Table)</span>
        </h2>

             </div>
            </div>

            <div className="col w-[40%] ml-auto">
              <SearchBox />
            </div>

          </div>

          <TableContainer className='mt-5' sx={{ maxHeight: 440, overflow: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>

              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <img src={row.userImg}
                              className="w-full group-hover:scale-105 transition-all" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MdOutlineMarkEmailRead className="text-primary" />
                          {row.userEmail}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MdPhone className="text-primary" />
                          {row.userPhone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MdCalendarToday className="text-primary" />
                          {row.createdDate}
                        </div>
                      </TableCell>
                     
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Users;