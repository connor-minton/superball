import { useState } from 'react';

import styles from './LeaderboardsEnterName.module.css';

export default function LeaderboardsEnterName({onEnterName}) {
  const [ username, setUsername ] = useState('');
  const [ alreadyExists, setAlreadyExists ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');

  async function handleEnterName(e) {
    e.preventDefault();

    // The player is acknowledging that the name already exists and they wish to use
    // it anyway
    if (alreadyExists === username) {
      onEnterName(username);
      return;
    }

    setLoading(true);
    let data;
    try {
      data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/leaderboards/${username}`);
    }
    catch (err) {
      setError('There was a problem validating the name. Try again later');
      setLoading(false);
      return;
    }

    if (data.status === 200) {
      // the name is unavailable
      setAlreadyExists(username);
    }
    else {
      // the name is available. take it
      try {
        await submitHighScore(username, 0);
      }
      catch (err) {
        setError('There was a problem setting your name. Try again later');
        setLoading(false);
        return;
      }

      onEnterName(username);
    }

    setLoading(false);
  }

  async function submitHighScore(username, score) {
    await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/leaderboards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        score: score
      })
    });
  }

  return (
    <>
      <p>Enter a name to use for the leaderboards. You can only do this once.</p>
      {(alreadyExists && alreadyExists === username) &&
      <p>This name already exists. Press enter to use it anyway.</p>}
      {error &&
      <p style={{color: 'red'}}>{error}</p>}
      <form>
        <div className={styles.container}>
          <input className={styles.textInput} type="text" name="username" placeholder="Your Name"
            onChange={e => setUsername(e.target.value)} />
          <input className="modal-button" disabled={!username || loading} type="submit" value="Enter"
            onClick={handleEnterName} />
        </div>
      </form>
    </>
  );
};