import React from 'react';
import axios from 'axios';

function useMetrics(resource) {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const fetchCounter = async () => {
      const result = await axios.get(`/api/v1/metrics/${resource}`);
      setCounter(result.data);
    };
    fetchCounter();
  });
  return counter;
}

export default useMetrics;
