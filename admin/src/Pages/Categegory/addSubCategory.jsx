import React, { useContext, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';

const AddSubCategory = () => {
const [productCat,setProductCat] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [formfields, setFormFields ] = useState({
  name: '',
  parentCatName: null,
  parentId:null
});

const context = useContext(MyContext);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

    const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true);
  
      // Basic validation
      if (formfields.name === "") {
        context.alertBox("error","Please enter category name");
        setIsLoading(false);
        return;
      }
  
      if (productCat==="") {
        context.alertBox("error","Please select parent category");
        setIsLoading(false);
        return;
      }
  
       // postData("/api/category/create", formfields).then((res) => {
        setTimeout(()=>{
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
        }, 2500);
      };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll mx-h-[72vh] overflow-y-scroll pr-4">
           <div className="grid grid-cols-4 mb-3 gap-5">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">
              Product Category</h3>
                                                <Select
                          labelId="demo-simple-select-label"
                          id="productCatDrop"
                          size="small"
                          className='w-full'
                          value={productCat}
                          label="Category"
                          onChange={handleChangeProductCat}
                        >
                          <MenuItem value={10}>Fashion</MenuItem>
                        </Select>
          </div>

           <div className="col">
            <h3 className="text-[14px] font-[500] mb-1">Sub Category Name</h3>
            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" name="name" value={formfields.name} onChange={onChangeInput} />
          </div>

        </div>

        <br/>

        </div>

        <div className='w-[250px]'>
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-4" disabled={isLoading}>
                {
                  isLoading === true ? <CircularProgress color="inherit" />
                  : 
                  <>
                    <FaCloudUploadAlt className='text-[25px] text-white' />
                    Publish and View
                  </>
                }
              </Button>
        </div>

      </form>
    </section>
  );
};

export default AddSubCategory;