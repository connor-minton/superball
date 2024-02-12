import { useState, useEffect } from 'react';

import LeaderboardsEnterName from './LeaderboardsEnterName';
import LeaderboardsTable from './LeaderboardsTable';

export default function Leaderboards() {
  const [ username, setUsername ] = useState(localStorage.getItem('username'));
  const [ scores, setScores ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/leaderboards')
      .then(data => data.json())
      .then(data => {
        if (!ignore) {
          setScores(data);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
      });

    return () => { ignore = true; };
  }, []);

  function handleEnterName(name) {
    setUsername(name);
    localStorage.setItem('username', name);
  }

  return (
    <>
      <h1>Leaderboards</h1>
      {username && <p>Welcome back, {username}.</p>}
      {loading && <p>This might take a while because I'm too cheap to buy a server.</p>}
      {loading && <div style={{display:'flex',justifyContent:'center'}}>
        <div className="loader"></div>
      </div>}
      {username
        ? <LeaderboardsTable scores={scores} />
        : <LeaderboardsEnterName onEnterName={handleEnterName} />}
    </>
  );
};