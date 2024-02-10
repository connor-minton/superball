export default function LeaderboardsTable({scores}) {
  const rows = scores.map(score =>
    <tr key={score.name}>
      <td>{score.name}</td>
      <td>{score.score}</td>
    </tr>
  );

  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};