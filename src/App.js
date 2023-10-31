import React, { useState } from 'react';
import './App.css';

import image1 from './images/image-1.webp';
import image2 from './images/image-2.webp';
import image3 from './images/image-3.webp';
import image4 from './images/image-4.webp';
import image5 from './images/image-5.webp';
import image6 from './images/image-6.webp';
import image7 from './images/image-7.webp';
import image8 from './images/image-8.webp';
import image9 from './images/image-9.webp';
import image10 from './images/image-10.jpeg';
import image11 from './images/image-11.jpeg';

const initialImages = [
  { id: '1', url: image1, isFeatured: false },
  { id: '2', url: image2, isFeatured: false },
  { id: '3', url: image3, isFeatured: false },
  { id: '4', url: image4, isFeatured: false },
  { id: '5', url: image5, isFeatured: false },
  { id: '6', url: image6, isFeatured: false },
  { id: '7', url: image7, isFeatured: false },
  { id: '8', url: image8, isFeatured: false },
  { id: '9', url: image9, isFeatured: false },
  { id: '10', url: image10, isFeatured: false },
  { id: '11', url: image11, isFeatured: false },
  
];

function App() {
  const [images, setImages] = useState(initialImages);
  const [draggedImage, setDraggedImage] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedImage(id);
  };

  const handleDragEnter = (e, id) => {
    if (draggedImage === null || id === draggedImage) return;

    const updatedImages = [...images];
    const draggedIndex = images.findIndex((image) => image.id === draggedImage);
    const targetIndex = images.findIndex((image) => image.id === id);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedImage] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(targetIndex, 0, draggedImage);
      setImages(updatedImages);
    }

    setDraggedImage(null);
  };

  const toggleImageSelection = (id) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return { ...image, isSelected: !image.isSelected };
      }
      return image;
    });
    setImages(updatedImages);
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.isSelected);
    setImages(updatedImages);
  };
  const selectedImageCount = images.filter((image) => image.isSelected).length;


  // const setFeatureImage = (id) => {
  //   const updatedImages = images.map((image) => ({
  //     ...image,
  //     isFeatured: image.id === id,
  //   }));
  //   setImages(updatedImages);
  // };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <h2>Selected Image Count: {selectedImageCount}</h2>
      <div className="actions">
        <button className='btn bg-green-400 hover:bg-red-700 px-2 py-1 rounded-lg' onClick={deleteSelectedImages}>Delete Selected</button>
        {/* <button onClick={() => setFeatureImage(images[0].id)}>Set as Feature</button> */}
      </div>
      <div className="image-gallery grid grid-cols-3 gap-5 h-[700px]">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-item ${image.isFeatured ? 'featured' : ''} ${
              image.isSelected ? 'selected' : ''
            }  shadow-2xl h-[300px] w-[300px]`}
            draggable
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDragEnter={(e) => handleDragEnter(e, image.id)}
          >
            <input
            className=''
              type="checkbox"
              checked={image.isSelected}
              onChange={() => toggleImageSelection(image.id)}
            />
            <div className=''>
              <img className='bg-slate-500 ' src={image.url} alt={`Image ${image.id}`} />
            </div>
            {image.isFeatured && <div className="featured-label">Featured</div>}
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
