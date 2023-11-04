import React from 'react';

const ImageUpload = ({handleImageUpload, setFileInput, imageUPload}) => {
    return (
        <div>
           <div className="upload-container h-[340px] w-[335px] lg:h-[186px] lg:w-[186px] border-2 border-dashed rounded-lg p-4 hover:bg-gray-500 transition-colors ease-linear opacity-60 cursor-pointer">
        <label className="upload-label">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            ref={(input) => setFileInput(input)}
            style={{ display: 'none' }}
            className=" cursor-pointer "
          />
          <div className="">
          <img className="h-[270px] w-[300px] lg:h-[120px] lg:w-[150px] cursor-pointer" src={imageUPload} alt="" />
          <h2 className=" text-xl text-center cursor-pointer">Add Image</h2>
          </div>
        </label>
      </div> 
        </div>
    );
};

export default ImageUpload;