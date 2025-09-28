import Button from "@mui/material/Button"
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../../Components/ProgressBar";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../context/MyContext";
import Chip from "@mui/material/Chip";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "category image", label: "CATEGORY IMAGE", minWidth: 250 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 250 },
  { id: "sub category image", label: "SUB CATEGORY IMAGE", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 250 },
];

// Sample data - in a real app, this would come from an API
const createData = (productName, productImg, productCat, category, subCategory, oldPrice, price, sales, progress) => {
  return { productName, productImg, productCat, category, subCategory, oldPrice, price, sales, progress };
}

const rows = [
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
  createData("", "https://api.spicezgold.com/download/file_1734525239704_foot.png",),
];


const CategoryList = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
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
         Sub Category List
          <span className="font-[400] text-[14px] ">(Material Ui Table)</span>
        </h2>

        <div className="col w-[30%] flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
          <Button className="btn-blue !text-white btn-sm" onClick={()=>context.setIsOpenFullScreenPanel({
            open:true,  
            model:"Add New Sub Category",
          })}> Add New Sub Category</Button>
        </div>

      </div>


      <div className="card my-4 shadow-md sm:rounded-lg bg-white">

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
                inputProps={{ "aria-label": "Without label" }}
              >
                              <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>men</MenuItem>
                <MenuItem value={20}>women</MenuItem>
                <MenuItem value={30}>kids</MenuItem>
              </Select>
            </div>


            <div className="col w-[20%] ml-auto">
              <SearchBox />
            </div>

          </div>

          <TableContainer className="mt-5" sx={{ maxHeight: 440, overflow: "auto" }}>
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
                          <div className="img w-[65px] h-[65px] rounded-full overflow-hidden group">
                            <Link to="/product/45745">
                              <img src={row.productImg}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all" />
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

                      <TableCell>
                       <Chip label="Fashion" />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Chip label="Men" color="primary" />
                          <Chip label="Women" color="primary" />
                          <Chip label="Kids" color="primary" />
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip title="Edit" placement="top">
                            <Link to="/product/45745/edit">
                              <Button className="!p-0 !w-10 !h-10 min-w-auto rounded-full bg-primary text-white"><AiOutlineEdit /></Button>
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete" placement="top">
                            <Button className="!p-0 !w-10 !h-10 min-w-auto rounded-full bg-red-500 text-white"><AiOutlineDelete /></Button>
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

export default CategoryList;
