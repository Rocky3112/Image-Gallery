import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

import image1 from './images/image-1.webp'
import image2 from './images/image-2.webp'
import image3 from './images/image-3.webp'

const initialImages = [
  { id: '1', url: image1, isFeatured: false },
  { id: '2', url: image2, isFeatured: false },
  { id: '3', url: image3, isFeatured: false },
];

function App() {
  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = [...images];
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);
    setImages(reorderedImages);
  };

  const toggleImageSelection = (id) => {
    const updatedSelectedImages = [...selectedImages];
    if (updatedSelectedImages.includes(id)) {
      updatedSelectedImages.splice(updatedSelectedImages.indexOf(id), 1);
    } else {
      updatedSelectedImages.push(id);
    }
    setSelectedImages(updatedSelectedImages);
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="image-gallery"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`image-item ${image.isFeatured ? 'featured' : ''}`}
                      onClick={() => toggleImageSelection(image.id)}
                    >
                      <img src={image.url} alt={`Image ${image.id}`} />
                      {image.isFeatured && <div className="featured-label">Featured</div>}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="actions">
        <button onClick={deleteSelectedImages} disabled={selectedImages.length === 0}>
          Delete Selected
        </button>
        <button onClick={() => setFeatureImage(images[0].id)}>
          Set as Feature
        </button>
      </div>
    </div>
  );
}

export default App;
