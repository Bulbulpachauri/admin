import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MyContext } from '../../context/MyContext';
import {MdOutlineMarkEmailRead, MdPhone, MdCalendarToday} from 'react-icons/md'
import { fetchDataFromApi } from '../../utils/api'

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
  {
    id: 'actions',
    label: 'ACTIONS',
    minWidth: 100,
  },
];




const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchDataFromApi('/api/user/all-users');
      if (response && response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log('Error fetching user details: ', error);
      if (error.response?.status === 401) {
        context.alertBox('error', 'Please login to access this page');
      } else {
        context.alertBox('error', 'Failed to fetch users');
      }
    } finally {
      setLoading(false);
    }
  };

  const searchUser = async () => {
    if (!searchEmail.trim()) {
      context.alertBox('error', 'Please enter an email to search');
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetchDataFromApi(`/api/user/search?email=${searchEmail}`);
      if (response && response.success) {
        setSearchResult(response.data);
        context.alertBox('success', 'User found!');
      }
    } catch (error) {
      console.log('Error fetching user details: ', error);
      setSearchResult(null);
      if (error.response?.status === 401) {
        context.alertBox('error', 'Please login to access this page');
      } else {
        context.alertBox('error', 'User not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchEmail('');
    setSearchResult(null);
  };

  const displayUsers = searchResult ? [searchResult] : users;

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

            <div className="col w-[40%] ml-auto flex gap-2">
              <TextField
                size="small"
                placeholder="Search by email (e.g., user@example.com)"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={searchUser} disabled={loading}>Search</Button>
              <Button onClick={clearSearch} variant="outlined">Clear</Button>
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
                {displayUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user._id || index}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <img src={user.avatar?.secure_url || '/default-avatar.png'}
                              className="w-full group-hover:scale-105 transition-all" 
                              onError={(e) => {
                                e.target.src = '/default-avatar.png';
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MdOutlineMarkEmailRead className="text-primary" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MdPhone className="text-primary" />
                          {user.phone || user.mobile || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MdCalendarToday className="text-primary" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/user-details/${user._id}`} className="text-blue-500 hover:text-blue-700 text-sm">
                          View Details
                        </Link>
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
            count={displayUsers.length}
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