import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WallPage() {
  const [participations, setParticipations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1/participations');
      setParticipations(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="WallPage">
      <h2>Participations :</h2>
      <ul>
        {participations.map((participation) => (
          <li key={participation.answer_id}>
            {participation.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WallPage;
