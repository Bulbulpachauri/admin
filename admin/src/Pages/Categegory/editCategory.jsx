import React, { useContext, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UploadBox from '../../Components/UploadBox';
import 'react-lazy-load-image-component/src/effects/blur.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MyContext from '../../context/context';
import { postData, deleteImage, uploadImage, editData, fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';


const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  })

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() =>{
    if(id) {
      fetchDataFromApi(`/api/category/${id}`).then((res)=>{
        if(res && res.success) {
          setFormFields({
            name: res.data.name || "",
            images: res.data.images || []
          });
          setPreviews(res.data.images || []);
        }
      }).catch(err => {
        console.error('Failed to fetch category:', err);
      });
    }
  },[id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const setPreviewsFun = (PreviewsArr) => {
    const newPreviews = typeof PreviewsArr === 'function' ? PreviewsArr(previews) : PreviewsArr;
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
    setIsLoading(true);

    if (!formFields.name.trim()) {
      context.alertBox('error', 'Please enter category name');
      setIsLoading(false);
      return;
    }

    if (previews.length === 0) {
      context.alertBox('error', 'Please select category image');
      setIsLoading(false);
      return;
    }

    try {
      const categoryData = {
        name: formFields.name,
        images: previews
      };

      const res = await editData(`/api/category/${id}`, categoryData);
      
      if (res && res.data && res.data.success) {
        context.alertBox('success', 'Category updated successfully');
        setTimeout(() => navigate('/categories'), 1000);
      } else {
        context.alertBox('error', res?.data?.message || 'Failed to update category');
      }
      
    } catch (err) {
      console.error('Update error:', err);
      context.alertBox('error', 'Failed to update category: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll mx-h-[72vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 text-black mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1">Category Name</h3>
              <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" name="name" value={formFields.name} onChange={onChangeInput} />
            </div>
          </div>

          <br />

          <h3 className="text-[18px] font-[500] mb-1 text-black">Category Images
          </h3>
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
                Update Category
              </>
            }
            </Button>
        </div>

      </form>
    </section>
  )
}

export default EditCategory;
