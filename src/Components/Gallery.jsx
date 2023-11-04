/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import image1 from "../images/image-1.webp";
import image2 from "../images/image-2.webp";
import image3 from "../images/image-3.webp";
import image4 from "../images/image-4.webp";
import image5 from "../images/image-5.webp";
import image6 from "../images/image-6.webp";
import image7 from "../images/image-7.webp";
import image8 from "../images/image-8.webp";
import image9 from "../images/image-9.webp";
import image10 from "../images/image-10.jpeg";
import image11 from "../images/image-11.jpeg";
import imageUPload from "../images/placeholder.png";

const initialImages = [
  { id: "1", url: image1, isFeatured: false },
  { id: "2", url: image2, isFeatured: false },
  { id: "3", url: image3, isFeatured: false },
  { id: "4", url: image4, isFeatured: false },
  { id: "5", url: image5, isFeatured: false },
  { id: "6", url: image6, isFeatured: false },
  { id: "7", url: image7, isFeatured: false },
  { id: "8", url: image8, isFeatured: false },
  { id: "9", url: image9, isFeatured: false },
  { id: "10", url: image10, isFeatured: false },
  { id: "11", url: image11, isFeatured: false },
];

function Gallery() {
  const [fileInput, setFileInput] = useState(null);
  const [images, setImages] = useState(initialImages);
  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (image) => {
    setDragging(true);
    setDraggedImage(image);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    setDraggedIndex(id);
  };
//for drag and drop
  const handleDrop = () => {
    setDragging(false);

    if (draggedImage) {
      const updatedImages = images.filter(
        (image) => image.id !== draggedImage.id
      );

      const targetIndex = images.findIndex((image) => image.id === draggedIndex);
      updatedImages.splice(targetIndex, 0, draggedImage);

      setImages(updatedImages);
      setDraggedImage(null);
      setDraggedIndex(null);
    }
  };
//-----toggle image position-----
  const toggleImageSelection = (id) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return { ...image, isSelected: !image.isSelected };
      }
      return image;
    });
    setImages(updatedImages);
  };
//-----for delete selected image---
  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.isSelected);
    setImages(updatedImages);
  };

  ///----count selected image---
  const selectedImageCount = images.filter((image) => image.isSelected).length;

  // const setFeatureImage = (id) => {
  //   const updatedImages = images.map((image) => ({
  //     ...image,
  //     isFeatured: image.id === id,
  //   }));
  //   setImages(updatedImages);
  // };

  //-----------for upload a image----
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file, index) => ({
      id: images.length + index + 1,
      url: URL.createObjectURL(file),
      isFeatured: false,
      isSelected: false,
    }));

    setImages([...images, ...newImages]);
  };

  return (
    <div className="App p-10 lg:w-[1100px] md:w-[800px] lg:mx-auto">
      <h1 className="text-center text-3xl font-semibold">Image Gallery</h1>
      <div className=" flex justify-between items-center gap-5 py-4 px-5">
      
      {
        selectedImageCount === 0 ? (
          <h2 className=" text-2xl font-semibold">Gallery</h2>
        ) :
        (
          <h2 className=" text-lg"><span className="text-blue-700"> <FontAwesomeIcon icon={faCheckSquare} /> </span>
            {selectedImageCount} {selectedImageCount === 1 ? 'File' : 'Files'} Selected
          </h2>
        )
      }
      {/* Delete Section */}
        <div className="actions">
          <button
            className="btn bg-green-400 hover:bg-red-700 hover:text-white px-2 py-1 rounded-lg"
            onClick={deleteSelectedImages}
          >
            Delete Selected
          </button>
        </div>
      </div>
      <hr />
      {/* mapped and displayed all images */}
      <div className=" grid lg:grid-cols-5 md:grid-cols-2 gap-5 pt-5">
      
          {images.map((image, index) => (
          <div
            key={image.id}
            className={`
              image-item
              ${image.isFeatured ? "featured" : ""}
              h-[340px] w-[335px] lg:h-[186px] lg:w-[186px] rounded-lg text-center relative border-2
              ${index === 0 ? 'lg:row-span-2 lg:col-span-2 lg:h-[390px] lg:w-[390px]' : ''}
            `}
            draggable
            onDragStart={() => handleDragStart(image)}
            onDragOver={(e) => handleDragOver(e, image.id)}
            onDrop={handleDrop}
          >
            {dragging && Number(draggedIndex) === Number(image.id) && (
              <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white border-2 border-dashed rounded-lg">
                Drop Here
              </div>
            )}
            <input
              className="absolute top-0 left-0 m-2"
              type="checkbox"
              checked={image.isSelected}
              onChange={() => toggleImageSelection(image.id)}
            />
            <div className="">
              <img
                className=" rounded-lg"
                src={image.url}
                alt="watch"
              />
            </div>
            {image.isFeatured && <div className="featured-label">Featured</div>}
          </div>
        ))}
      {/* for Upload file */}
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
    </div>
  );
}

export default Gallery;
