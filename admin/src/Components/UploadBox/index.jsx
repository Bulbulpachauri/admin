import React, { useContext } from 'react';
import { useState } from 'react';
import {FaRegImages} from "react-icons/fa6";
import MyContext from '../../context/context';
import { uploadImage } from '../../utils/api';

const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const context = useContext(MyContext);
  const selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      console.log('Files selected:', files?.length);
      if (!files || files.length === 0) return;
      
      const newPreviews = [];
      setUploading(true);

      // Create blob URLs for immediate preview
      for (let i = 0; i < files.length; i++) {
        console.log('Processing file:', files[i].name, files[i].type);
        if (files[i] && (files[i].type === "image/jpeg" || files[i].type === "image/jpg" || files[i].type === "image/png" || files[i].type === "image/webp")) {
          const previewUrl = URL.createObjectURL(files[i]);
          console.log('Created blob URL:', previewUrl);
          newPreviews.push(previewUrl);
        } else {
          console.log('Invalid file type:', files[i].type);
          alert("Please select a valid JPG, PNG or webp image file.");
          setUploading(false);
          return;
        }
      }

      console.log('New previews:', newPreviews);
      // Add blob URLs to existing previews
      props.setPreviewsFun(prev => {
        const updated = [...(prev || []), ...newPreviews];
        console.log('Updated previews:', updated);
        return updated;
      });
      setUploading(false);

    } catch (error) {
      console.log('Upload error:', error);
      setUploading(false);
    }
  };

    
  return (
    <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[250px] w-[100%]
     bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
        <FaRegImages className='text-[40px] opacity-35 pointer-events-none'/>
        <h4 className='text-[14px] pointer-events-none'>Image Upload</h4>

        <input type="file" accept='image/*'
        multiple={props.multiple !== undefined ? props.multiple : false} className='absolute top-0 left-0 w-full h-full z-50 opacity-0'
         onChange={(e) => onChangeFile(e, props?.url)}
         name="images"
         disabled={uploading}
        />
        
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-sm">Uploading...</div>
          </div>
        )}
        
        
    </div>
  )
}


export default UploadBox;