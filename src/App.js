import React, { useState } from 'react';
import './App.css';

import image1 from './images/image-1.webp';
import image2 from './images/image-2.webp';
import image3 from './images/image-3.webp';

const initialImages = [
  { id: '1', url: image1, isFeatured: false },
  { id: '2', url: image2, isFeatured: false },
  { id: '3', url: image3, isFeatured: false },
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

  const setFeatureImage = (id) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isFeatured: image.id === id,
    }));
    setImages(updatedImages);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <div className="image-gallery grid grid-cols-3 gap-5 bg-slate-400">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-item ${image.isFeatured ? 'featured' : ''} ${
              image.isSelected ? 'selected' : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDragEnter={(e) => handleDragEnter(e, image.id)}
          >
            <input
              type="checkbox"
              checked={image.isSelected}
              onChange={() => toggleImageSelection(image.id)}
            />
            <div>
              <img src={image.url} alt={`Image ${image.id}`} />
            </div>
            {image.isFeatured && <div className="featured-label">Featured</div>}
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={deleteSelectedImages}>Delete Selected</button>
        <button onClick={() => setFeatureImage(images[0].id)}>Set as Feature</button>
      </div>
    </div>
  );
}

export default App;
