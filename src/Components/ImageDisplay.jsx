import React from 'react';

const ImageDisplay = ({image, dragging,draggedIndex,toggleImageSelection}) => {
    return (
        <div className='group relative  before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors  hover:before:bg-gray-500/70 before:right-0'>
            {dragging && Number(draggedIndex) === Number(image.id) && (
              <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white border-2  rounded-lg ">
                Drop Here
              </div>
            )}
            <input
              className="absolute top-0 left-0 m-2"
              type="checkbox"
              checked={image.isSelected}
              onChange={() => toggleImageSelection(image.id)}
            />
            {/* gallery */}
            
            <div className="">
              <img
                className=" rounded-lg "
                src={image.url}
                alt="watch"
              />
            </div>
            {/* {image.isFeatured && <div className="featured-label">Featured</div>} */}
        </div>
    );
};

export default ImageDisplay;