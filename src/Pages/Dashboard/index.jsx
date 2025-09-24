import React, { useState, PureComponent } from "react";
import DashboardBoxes from "../../Components/DasboardBoxes";
import Button from "@mui/material/Button";
import Badge from "../../Components/Badge";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import { rows } from './data';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  // { id: 'select', label: <Checkbox {...label} />, minWidth: 20 },
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


const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState('');

  const [Char1tData, setChart1Data] = useState([
    {
      name: 'JAN',
      TotalSales: 4000,
      TotalUses: 2400,
      amt: 2400,
    },
    {
      name: 'FEB',
      TotalSales: 3000,
      TotalUses: 1398,
      amt: 2210,
    },
    {
      name: 'MARCH',
      TotalSales: 2000,
      TotalUses: 9800,
      amt: 2290,
    },
    {
      name: 'APRIL',
      TotalSales: 2780,
      TotalUses: 3908,
      amt: 2000,
    },
    {
      name: 'MAY',
      TotalSales: 1890,
      TotalUses: 4800,
      amt: 2181,
    },
    {
      name: 'JUNE',
      TotalSales: 2390,
      TotalUses: 3800,
      amt: 2500,
    },
    {
      name: 'JULY',
      TotalSales: 3490,
      TotalUses: 4300,
      amt: 2100,
    },
    {
      name: 'AUS',
      TotalSales: 3490,
      TotalUses: 2400,
      amt: 2100,
    },
    {
      name: 'SEP',
      TotalSales: 3490,
      TotalUses: 4300,
      amt: 2100,
    },
    {
      name: 'OCT',
      TotalSales: 3490,
      TotalUses: 4900,
      amt: 2100,
    },
    {
      name: 'NOV',
      TotalSales: 3490,
      TotalUses: 6500,
      amt: 2100,
    },
    {
      name: 'DEC',
      TotalSales: 3490,
      TotalUses: 2300,
      amt: 2100,
    },
  ]);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <>
      <div className="w-full p-5 border border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-8 mb-5">
        <div className="info">
          <h1 className="text-[30px] font-[600]">Good Morning,<br /> Cameron</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam et tempore dolorum.</p>
          <br />
          <Button className="btn-blue !capitalize" startIcon={<FaPlus />}>
            New Product
          </Button>
        </div>

        <img src="https://img.freepik.com/premium-vector/online-shopping-e-commerce-flat-design-illustration_510308-196.jpg" className="w-[250px]" />
      </div>

      <DashboardBoxes />

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Products <span className="font-[400] text-[14px] ">(Tailwind Css Table)</span></h2>
        </div>


        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              label="Category">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Women</MenuItem>
              <MenuItem value={20}>Man</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
            <Button className="btn-blue !text-white btn-sm">Add Product</Button>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3" width="10%">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-6 pr-2 py-3" width="10%">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sub Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sales
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>


              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>


              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>


              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>


              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>


              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>
                    sale</p>
                  <ProgressBar progress={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                      <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>


              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 pr-0 py-2 text-center">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  Electronic
                </td>
                <td className="px-6 py-2">
                  Women
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span>
                    sale</p>
                  <ProgressBar progress={40} type='success' />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Tooltip title="Add" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                        <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip><Tooltip title="View Product Details" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Remove Product Details" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                        <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end pt-4 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Products {" "} <span className="font-[400] text-[14px] ">
            (Material Ui Table)</span></h2>
        </div>


        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              label="Category">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Women</MenuItem>
              <MenuItem value={20}>Man</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
            <Button className="btn-blue !text-white btn-sm">Add Product</Button>
          </div>
        </div>

        <br />
        <TableContainer sx={{ maxHeight: 440 }}>
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
                )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745" data-discover="true">
                        <img src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all" />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h2 className="font-[600] text-[12px] leading-4 hover:text-primary">
                        <Link to="/product/45745">
                          A-Line Kurti Sharare & Dupatta
                        </Link>
                      </h2>
                      <span className="text-[12px]">
                        Books
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronic
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  women
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">$58.00</span>
                    <span className="price text-primary text-[14px] font-[600]">$58.00</span>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span>
                    sale</p>
                  <ProgressBar progress={40} type='success' />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Tooltip title="Add" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                        <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip><Tooltip title="View Product Details" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Remove Product Details" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]" style={{ minWidth: "35px" }}>
                        <AiOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>

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

        <div className="flex items-center justify-end pt-4 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Order</h2>
        </div>


        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <Checkbox {...label} />
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Paymant Id
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>

              </tr>

            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 font-[500]">
                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderdProduct(1)}
                  >
                    {
                      isOpenOrderdProduct === 1 ? <FaAngleUp className="text-[16px] 
                            text-[rgba(0,0,0,0.7)]" /> : <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    }
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">66e120733d42dc4rd19335ab</span>
                </td>

                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">pay_PTPOqEXFhrtpy8</span>
                </td>

                <td className="px-6 py-4 font-[500]">Bulbul</td>

                <td className="px-6 py-4 font-[500]">8171306923</td>


                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">GLA93lhovanbagichi ,Mathura 281204</span>
                </td>

                <td className="px-6 py-4 font-[500]">110053</td>

                <td className="px-6 py-4 font-[500]">3800</td>

                <td className="px-6 py-4 font-[500]">bulbulpachauri21@gmail.com</td>

                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">66e120733d42dc4rd19335ab</span>
                </td>

                <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">20-9-2025</td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 font-[500]">
                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderdProduct(1)}
                  >
                    {
                      isOpenOrderdProduct === 1 ? <FaAngleUp className="text-[16px] 
                            text-[rgba(0,0,0,0.7)]" /> : <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    }
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">66e120733d42dc4rd19335ab</span>
                </td>

                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">pay_PTPOqEXFhrtpy8</span>
                </td>

                <td className="px-6 py-4 font-[500]">Bulbul</td>

                <td className="px-6 py-4 font-[500]">8171306923</td>


                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">GLA93lhovanbagichi ,Mathura 281204</span>
                </td>

                <td className="px-6 py-4 font-[500]">110053</td>

                <td className="px-6 py-4 font-[500]">3800</td>

                <td className="px-6 py-4 font-[500]">bulbulpachauri21@gmail.com</td>

                <td className="px-6 py-4 font-[500]">
                  <span className="text-red-500">66e120733d42dc4rd19335ab</span>
                </td>

                <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">20-9-2025</td>
              </tr>


              {isOpenOrderdProduct === 1 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Product Id
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Product Tittle
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Image
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Quantity
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Price
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Sub Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-700">66e120733d42dc4rd19335ab</span>
                            </td>

                            <td className="px-6 py-4 font-[500]">
                              <span className="text-red-500">A-Line Kurti Sharare & Du...</span>
                            </td>

                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                                alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </td>

                            <td className="px-6 py-4 font-[500]">2</td>


                            <td className="px-6 py-4 font-[500]">
                              <span className="text-red-500">1300</span>
                            </td>

                            <td className="px-6 py-4 font-[500]">
                              <span className="text-red-500">1300</span>
                            </td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-700">66e120733d42dc4rd19335ab</span>
                            </td>

                            <td className="px-6 py-4 font-[500]">
                              <span className="text-red-500">A-Line Kurti Sharare & Du...</span>
                            </td>

                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                                alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </td>

                            <td className="px-6 py-4 font-[500]">2</td>


                            <td className="px-6 py-4 font-[500]">
                              <span className="text-red-500">1300</span>
                            </td>

                            <td className="px-6 py-4 font-[500]">
                              <span className="text-red-500">1300</span>
                            </td>
                          </tr>


                          <tr>
                            <td className="bg-[#f1f1f1]" colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Total User & Total Sales</h2>
        </div>

        <div className="flex items-center gap-4 px-5 pt-1"> 
          <span className="flex items-center gap-2 text-[14px]">
            <span className="block w-[18px] h-[8px] rounded-full" style={{ backgroundColor: '#8884d8' }}></span>
            <span>Total Sales</span>
          </span>

           <span className="flex items-center gap-2 text-[14px]">
            <span className="block w-[18px] h-[8px] rounded-full" style={{ backgroundColor: '#82ca9d' }}></span>
            <span>Total Users</span>
          </span>

        </div>

        <div className="px-5 py-5">
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Char1tData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12}} />
                <YAxis tick={{ fontSize: 12}} />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone"
                 dataKey="TotalSales"
                  stroke="#8884d8"
                   strokeWidth={3}
                    activeDot={{ r: 6 }}
                     />
                <Line type="monotone" dataKey="TotalUses" stroke="#82ca9d" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;