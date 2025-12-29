import React, { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UploadBox from '../../Components/UploadBox';
import 'react-lazy-load-image-component/src/effects/blur.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/context';
import { postData, deleteImage, uploadImage } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';


const AddCategory = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  })

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const setPreviewsFun = (PreviewsArr) => {
    console.log('setPreviewsFun called with:', PreviewsArr);
    const newPreviews = typeof PreviewsArr === 'function' ? PreviewsArr(previews) : PreviewsArr;
    console.log('Current previews:', previews);
    console.log('New previews:', newPreviews);
    setPreviews(newPreviews);
    setFormFields((prev) => ({
      ...prev,
      images: newPreviews
    }));
  }

  const removeImg = (image, index) => {
    // If it's a blob URL (local preview), just remove it
    if (image.startsWith('blob:')) {
      URL.revokeObjectURL(image);
      const newPreviews = previews.filter((_, i) => i !== index);
      setPreviews(newPreviews);
      setFormFields((prev) => ({
        ...prev,
        images: newPreviews
      }));
    } else {
      // If it's a server image, delete from server first
      deleteImage(`/api/category/deleteImage?img=${image}`).then((res) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        setFormFields((prev) => ({
          ...prev,
          images: newPreviews
        }));
      }).catch((err) => {
        console.error('Delete failed:', err);
      });
    }
  }

       const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(formFields)

      setIsLoading(true);
  
      // Basic validation
      if (!formFields.name === "") {
        context.alertBox("error","Please enter category name");
        setIsLoading(false);
        return;
      }
  
      if (productCat==="") {
        context.alertBox("error","Please select category");
        setIsLoading(false);
        return;
      }
  
       postData("/api/category/create", formfields).then((res) => {;
        console.log(res)
        setTimeout(()=>{
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          })
        }, 2500);
        })
      }

  return (
    <>
      <div className="flex items-center px-5 py-5 border-b border-gray-200">
        <Button 
          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] mr-4" 
          onClick={() => navigate('/categories')}
        >
          <IoMdClose className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
        
        <h2 className="text-[18px] font-[600]">
          Add Category
          <span className="font-[400] text-[14px] ml-2">(Create New Category)</span>
        </h2>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="card bg-white shadow-md rounded-md p-5 mt-5">
          <form className="form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 text-black mb-3">
              <div className="col w-[25%]">
                <h3 className="text-[14px] font-[500] mb-1">Category Name</h3>
                <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" name="name" value={formFields.name} onChange={onChangeInput} />
              </div>
            </div>

            <br />

            <h3 className="text-[18px] font-[500] mb-1 text-black">Category Images</h3>
            <br />

            <div className="grid grid-cols-7 gap-4">
              {
                previews?.length !== 0 && previews?.map((image, index) => {
                  return (
                    <div className="uploadBoxWrapper relative" key={index}>
                      <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer" onClick={() => removeImg(image, index)}>
                        <IoMdClose className="text-white text-[17px]" /></span>

                      <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[250px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                        <LazyLoadImage src={image} className='w-full h-full group-hover:scale-105 transition-all' effect="blur" />
                      </div>
                    </div>
                  )
                })
              }

              <UploadBox multiple={true} name="images" url="/api/category/uploadImage" setPreviewsFun={setPreviewsFun} />
            </div>

            <br />

            <br />
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
        </div>
      </div>
    </>
  )
}

export default AddCategory;