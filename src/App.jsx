
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster  } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchQuery, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: searchQuery,
          page: pageNum,
          per_page: 12,
          client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch {
      setError('Error fetching images');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    setImages([]);
    setPage(1);
    setQuery(searchQuery);
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (query) fetchImages(query, 1);
  }, [query]);

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && images.length === 0 && query && (
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#555' }}>
          За запитом "{query}" зображень не знайдено.
        </p>
      )}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {!loading && <LoadMoreBtn onClick={loadMoreImages} />}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
