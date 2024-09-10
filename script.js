// Fetch and display the gallery
const fetchGallery = async () => {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';
    
    try {
      const response = await fetch('http://localhost:5000/api/gallery');
      const images = await response.json();
  
      images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
          <img src="${image.imageUrl}" alt="${image.title}">
          <h3>${image.title}</h3>
          <p>${image.description}</p>
          <p><strong>Tags:</strong> ${image.tags.join(', ')}</p>
          <button class="delete-btn" data-id="${image._id}">Delete</button>
        `;
  
        // Delete button event listener
        galleryItem.querySelector('.delete-btn').addEventListener('click', async () => {
          const imageId = image._id;
          await deleteImage(imageId);
          fetchGallery(); // Refresh gallery after deletion
        });
  
        galleryContainer.appendChild(galleryItem);
      });
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };
  
  // Upload image
  const uploadForm = document.getElementById('uploadForm');
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('image', document.getElementById('image').files[0]);
    formData.append('tags', document.getElementById('tags').value);
  
    try {
      const response = await fetch('http://localhost:5000/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      document.getElementById('uploadStatus').textContent = 'Image uploaded successfully!';
      uploadForm.reset(); // Reset the form
      fetchGallery(); // Refresh gallery
    } catch (error) {
      document.getElementById('uploadStatus').textContent = 'Failed to upload image';
      console.error('Error uploading image:', error);
    }
  });
  
  // Delete image
  const deleteImage = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  
  // Initial load
  fetchGallery();
  