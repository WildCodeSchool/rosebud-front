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
      {participations.length > 0
        && (
        <ul>
          <h2>Participations :</h2>
          {participations.map((participation) => (
            <li key={participation.answer_id}>
              {participation.question}
              <br />
              {participation.answer}
              <hr />
            </li>
          ))}
        </ul>
        )}
    </div>
  );
}

export default WallPage;
