import React from 'react';
import api from '../api';

function useMetrics(resource) {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const fetchCounter = async () => {
      const result = await api.get(`/api/v1/metrics/${resource}`);
      setCounter(result.data);
    };
    fetchCounter();
  });
  return counter;
}

export default useMetrics;
