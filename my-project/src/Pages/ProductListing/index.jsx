import React, { useState } from "react"
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/Productitem";
import ProductItemListView from "../../components/ProductItemListView";
import Button from "@mui/material/Button";
import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import Pagination from '@mui/material/Pagination';

const ProductListing = () => {
  const [itemView, setItemView] = useState('grid');
  const { categoryName } = useParams();
  
  // Capitalize first letter of category name for display
  const displayCategoryName = categoryName ? 
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'All Products';

  return (
    <section className="py-5 pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home" className="link transition">
            Home
          </Link>
          <Typography color="text.primary">
            {displayCategoryName}
          </Typography>
        </Breadcrumbs>
      </div>

      <div className="bg-white py-5 mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] h-full bg-white">
            <Sidebar />
          </div>

          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center ItemViewActions">
                <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${itemView === "list" && 'active'}`}
                  onClick={() => setItemView('list')}>
                  <LuMenu className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${itemView === "grid" && 'active'}`}
                  onClick={() => setItemView('grid')}>
                  <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                </Button>

                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">There are 27 products.</span>

              </div>


              <div className="col2 ml-auto flex items-center justify-end gap-3">

                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">Short By.</span>



                <select className="p-2 border border-gray-300 rounded-md outline-none">
                  <option>Sales,height to lowest</option>
                  <option>Relevance</option>
                  <option>Name, A to Z</option>
                  <option>Name, A to Z</option>
                  <option>Price, low to high</option>
                  <option>Price, hight to low</option>
                </select>
              </div>
            </div>

            <div className={`grid ${itemView === 'grid' ? 'grid-cols-4 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-1'} gap-4`}>
              {itemView === 'grid' ? (
                <>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </>

              ) : (
                <>
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                </>
              )}
            </div>

            <div className="flex items-center justify-center mt-10">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListing;
