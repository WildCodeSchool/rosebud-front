import React from 'react';
import api from '../api';

const useRandomImages = (limit, QuestionnaireId) => {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      const result = await api.get(`/api/v1/questionnaires/${QuestionnaireId}/answers?limit=${limit}`);
      setImages(result.data);
    };
    fetchImages();
  }, [QuestionnaireId, limit]);

  return images;
};

export default useRandomImages;
