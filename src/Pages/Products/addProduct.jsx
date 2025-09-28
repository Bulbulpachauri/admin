import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { IoMdClose } from "react-icons/io";


const AddCategory = () => {
  
  const [productCat, setProductCat] = useState('');
  const [productSubCat, setProductSubCat] = useState('');
  const [productFeatured, setProductFeatured] = useState('');
  const [productRAM, setProductRAM] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productSize, setProductSize] = useState('');

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };

  const handleChangeProductRAM = (event) => {
    setProductRAM(event.target.value);
  };

  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };

  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8">
        <div className="scroll mx-h-[72vh] overflow-y-scroll pr-4">
        <div className="grid grid-cols-1 text-black mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">Product Name</h3>
            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)]focus:outline-none
             focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 mb-3 text-black">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">Product Description</h3>
            <textarea type="text" className="w-full h-[140px] border border-[rgba(0,0,0,0.2)]focus:outline-none
             focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-4 mb-3 text-black gap-4">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">Product Category</h3>
            <FormControl fullWidth size="small">
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                labelId="product-category-label"
                id="productCatDrop"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={10}>Fashion</MenuItem>
                <MenuItem value={20}>Beauty</MenuItem>
                <MenuItem value={30}>Wellness</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Sub Category</h3>
            <FormControl fullWidth size="small">
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                labelId="product-category-label"
                id="productCatDrop"
                value={productSubCat}
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Price</h3>
            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)]focus:outline-none
             focus:border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm" />
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Old Price</h3>
            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)]focus:outline-none
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
          </div>

        </div>

        <div className="grid grid-cols-4 mb-3 gap-4">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Is Featured?</h3>
            <FormControl fullWidth size="small">
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                labelId="product-category-label"
                id="productCatDrop"
                value={productFeatured}
                label="Category"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Stock</h3>
            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)]focus:outline-none
             focus:border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm" />
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Brand</h3>
            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)]focus:outline-none
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Discount</h3>
            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)]focus:outline-none
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
          </div>

        </div>

        <div className="grid grid-cols-4 mb-3 text-black gap-4">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">Product RAM</h3>
            <FormControl fullWidth size="small">
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                labelId="product-category-label"
                id="productCatDrop"
                value={productRAM}
                label="Category"
                onChange={handleChangeProductRAM}
              >
                <MenuItem value={'4GB'}>4GB</MenuItem>
                <MenuItem value={'6GB'}>6GB</MenuItem>
                <MenuItem value={'8GB'}>8GB</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Weight</h3>
            <FormControl fullWidth size="small">
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                labelId="product-category-label"
                id="productCatDrop"
                value={productWeight}
                label="Sub Category"
                onChange={handleChangeProductWeight}
              >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'2KG'}>2KG</MenuItem>
                <MenuItem value={'3KG'}>3KG</MenuItem>
                <MenuItem value={'4KG'}>4KG</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Size</h3>
            <FormControl fullWidth size="small">
              <InputLabel id="product-category-label">Category</InputLabel>
              <Select
                labelId="product-category-label"
                id="productCatDrop"
                value={productSize}
                label="Sub Category"
                onChange={handleChangeProductSize}
              >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'XL'}>XL</MenuItem>
                <MenuItem value={'Xs'}>Xs</MenuItem>
                <MenuItem value={'S'}>S</MenuItem>
                <MenuItem value={'Xl'}>Xl</MenuItem>
                <MenuItem value={'Xs'}>XS</MenuItem>
              </Select>
            </FormControl>
          </div>


          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Rating</h3>
            <Rating name="simple-controlled" defaultValue={2} />
          </div>

        </div>



                <div className="col w-full p-5 px-0">
          <h3 className="font-[700] text-[18px] mb-2">Media & Images</h3>

          <div className="grid grid-cols-7 gap-4">
            <div className="uploadBoxWrapper relative">
              <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] 
              -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                <IoMdClose className="text-white text-[17px]" /></span>

              <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[250px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                <LazyLoadImage
                  alt={"product-image"}
                  effect="blur"
                  className="w-full h-full object-cover"
                  src={"https://ecme-react.themenate.net/img/products/product-1.jpg"}
                /> 
              </div>
            </div>

              <div className="uploadBoxWrapper relative">
              <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] 
              -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                <IoMdClose className="text-white text-[17px]" /></span>

              <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[250px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                <LazyLoadImage
                  alt={"product-image"}
                  effect="blur"
                  className="w-full h-full object-cover"
                  src={"https://ecme-react.themenate.net/img/products/product-1.jpg"}
                /> 
              </div>
            </div>

              <div className="uploadBoxWrapper relative">
              <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] 
              -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                <IoMdClose className="text-white text-[17px]" /></span>

              <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[250px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                <LazyLoadImage
                  alt={"product-image"}
                  effect="blur"
                  className="w-full h-full object-cover"
                  src={"https://ecme-react.themenate.net/img/products/product-1.jpg"}
                /> 
              </div>
            </div>

              <div className="uploadBoxWrapper relative">
              <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] 
              -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                <IoMdClose className="text-white text-[17px]" /></span>

              <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[250px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                <LazyLoadImage
                  alt={"product-image"}
                  effect="blur"
                  className="w-full h-full object-cover"
                  src={"https://ecme-react.themenate.net/img/products/product-1.jpg"}
                /> 
              </div>
            </div>
            <UploadBox multiple={true} />
          </div>
          

        </div>
        </div>


        <hr/>
        <br/>
        <Button type="button" className="btn-blue btn-lg w-full flex gap-4">
          <span><FaCloudUploadAlt className="text-[25px] text-white"/></span>
          Publish and View</Button>


      </form>
    </section>
  );
};

export default AddCategory;