import { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/team.css";
import React from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.sportradar.com/nba/trial/v8/en/seasons/2023/REG/standings.json',
          { params: { api_key: 'aC2Tp4E42T2l0i7K1kSGy5GGkbmds4Im5X6WuIRS' } }
        );
        
        console.log("Response received:", response.data); // Log full response for debugging

        // Extract teams from the nested response structure
        const teams = response.data.conferences.flatMap(conference =>
          conference.divisions.flatMap(division =>
            division.teams.map(team => ({
              ...team,
              conference: conference.name,
              division: division.name
            }))
          )
        );
        
        // Sort teams by wins in descending order
        teams.sort((a, b) => b.wins - a.wins);
        
        // Group teams by conference
        const groupedTeams = teams.reduce((acc, team) => {
          if (!acc[team.conference]) {
            acc[team.conference] = [];
          }
          acc[team.conference].push(team);
          return acc;
        }, {});

        setTeams(groupedTeams); // Update state with the grouped teams

      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching team data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // If loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // If error
  if (error) {
    return <p>Error: {error}</p>;
  }

  // If no teams data is available
  if (!teams || Object.keys(teams).length === 0) {
    return <p>No teams data available.</p>;
  }

  return (
    <>
      <h1>NBA Teams List 2023</h1>
      <div className="st_wrap_table">
        {Object.keys(teams).map(conference => (
          <div key={conference}>
            <h2>{conference} Conference</h2>
            <table className="st_table">
              <thead className="st_table_header">
                <tr>
                  <th>Team</th>
                  <th>Division</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Streak</th>
                  <th>Win %</th>
                </tr>
              </thead>
              <tbody>
                {teams[conference].map((team) => (
                  <tr key={team.id}>
                    <td>{team.market} {team.name}</td>
                    <td>{team.division}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.streak.kind} ({team.streak.length})</td>
                    <td>{team.win_pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

export default Teams;
