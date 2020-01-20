import React from 'react';
import axios from 'axios';

const useRandomImages = (limit) => {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      const result = await axios.get(`/api/v1/questionnaires/answers?limit=${limit}`);
      setImages(result.data);
    };
    fetchImages();
  }, [limit]);

  return images;
};

export default useRandomImages;
