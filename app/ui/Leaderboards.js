import { useState, useEffect } from 'react';

export default function Leaderboards() {
  const [ scores, setScores ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/leaderboards')
      .then(data => data.json())
      .then(data => {
        if (!ignore)
          setScores(data);
      });

    return () => { ignore = true; };
  }, []);

  return (
    <>
      <h1>Leaderboards</h1>
      <p>{JSON.stringify(scores)}</p>
    </>
  );
};