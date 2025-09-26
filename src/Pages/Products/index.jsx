import Button from '@mui/material/Button'
import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from '../../Components/ProgressBar';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../context/MyContext';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  {
    id: 'Subcategory',
    label: 'SUB CATEGORY',
    minWidth: 150,
  },
  {
    id: 'price',
    label: 'PRICE',
    minWidth: 100,
  },
  {
    id: 'sales',
    label: 'SALES',
    minWidth: 100,
  },
  {
    id: 'active',
    label: 'Active',
    minWidth: 100,
  },
];

// Sample data - in a real app, this would come from an API
const createData = (productName, productImg, productCat, category, subCategory, oldPrice, price, sales, progress) => {
  return { productName, productImg, productCat, category, subCategory, oldPrice, price, sales, progress };
}

const rows = [
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
  createData('A-Line Kurti Sharare & Dupatta', 'https://ecme-react.themenate.net/img/products/product-1.jpg', 'Books', 'Electronic', 'Women', '$58.00', '$58.00', 234, 40),
];


const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const context = useContext(MyContext);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>

      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">
          Products{" "}
          <span className="font-[400] text-[14px] ">(Material Ui Table)</span>
        </h2>

        <div className="col w-[25%] flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
          <Button className="btn-blue !text-white btn-sm" onClick={()=>context.setIsOpenFullScreenPanel({
            open:true,
            model:'Add Product',
          })}>Add Product</Button>
        </div>

      </div>


      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>

        <div className="card bg-white shadow-md rounded-md p-5 mt-5">
          <div className="flex items-center w-full px-5 justify-between">
            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              <Select
                className="w-full"
                size="small"
                value={categoryFilterVal}
                onChange={handleChangeCatFilter}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Women</MenuItem>
                <MenuItem value={20}>Man</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </div>

            <div className="col w-[20%] ml-auto">
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
                            <Link to="/product/45745">
                              <img src={row.productImg}
                                className="w-full group-hover:scale-105 transition-all" />
                            </Link>
                          </div>
                          <div className="info">
                            <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                              <Link to="/product/45745">
                                {row.productName}
                              </Link>
                            </h2>
                            <span className="text-[12px]">
                              {row.productCat}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.subCategory}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 flex-col">
                          <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">{row.oldPrice}</span>
                          <span className="price text-primary text-[14px] font-[600]">{row.price}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className='text-[14px] w-[100px]'><span className='font-[600]'>{row.sales}</span>
                          sale</p>
                        <ProgressBar progress={row.progress} type='success' />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip title="Edit">
                            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full">
                              <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>
                          </Tooltip>
                          <Tooltip title="View">
                            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full">
                              <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full">
                              <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>
                          </Tooltip>
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

export default Products;