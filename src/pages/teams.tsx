import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../css/team.css";


function Teams () {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);
    const { data } = useFetch('eastconf'); // Grabs the standings in teamStats.json

    // Seperates the conferences into East & West
    const EastConf = data; 
    const WestConf = data;

    // Calculates the win/loss percentage
    const calculateWinningPercentage = (w, l) => {
        if (w + l === 0) return '0.000';
        return (w / (w + l)).toFixed(3);
      };

      // If error displays the message of the error
  if (error) {
      return <p>Error: {error}</p>;
  }

  // If data cant be pulled displayed this error message
  if (!data) {
      return <p>No data found.</p>;
  }

  // If west cant be grabbed will display, this would work for east too
  if (!WestConf) {
    return <p>No data found.</p>;
}

    return(
        <>
                { /* Standings Table */ } 
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <table style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Team</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>W</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>L</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>WIN%</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>GB</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>CONF</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>HOME</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>AWAY</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>L10</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Strk</th>
                        </tr>

                    </thead>
                    <tbody>
                    {/* Display Eastern Conference Standings Sorted by win percentages */ }
                    {EastConf.slice(15, 30).sort((a, b) => calculateWinningPercentage(b.w, b.l) - calculateWinningPercentage(a.w, a.l)).map((team) => (
                      <tr key={team.id} style={{ border: '1px solid black', padding: '8px' }}>
                          <td>{team.team}</td>
                          <td>{team.w}</td>
                          <td>{team.l}</td>
                          <td>{calculateWinningPercentage(team.w, team.l)}</td>
                          <td>{team.gb}</td> {/* Assuming you'll update this later */}
                          <td>{team.conf}</td> {/* Assuming you'll update this later */}
                          <td>{team.home}</td> {/* Assuming you'll update this later */}
                          <td>{team.away}</td> {/* Assuming you'll update this later */}
                          <td>{team.L10}</td> {/* Assuming you'll update this later */}
                          <td>{team.Strk}</td> {/* Assuming you'll update this later */}
                      </tr>
                  ))}
                    </tbody>
                </table>
                <table style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Team</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>W</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>L</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>WIN%</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>GB</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>CONF</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>HOME</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>AWAY</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>L10</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Strk</th>
                        </tr>

                    </thead>
                    <tbody>
                    {/* Display Western Conference Standings Sorted by win percentages*/ }
                    {EastConf.slice(15, 30).sort((a, b) => calculateWinningPercentage(b.w, b.l) - calculateWinningPercentage(a.w, a.l)).map((team)=> (
                            <tr key={team.id} style={{ border: '1px solid black', padding: '8px' }}>
                                <td>{team.team}</td>
                                <td>{team.w}</td>
                                <td>{team.l}</td>
                                <td>{calculateWinningPercentage(team.w, team.l)}</td>
                                <td>{team.gb}</td> {/* Assuming you'll update this later */}
                                <td>{team.conf}</td> {/* Assuming you'll update this later */}
                                <td>{team.home}</td> {/* Assuming you'll update this later */}
                                <td>{team.away}</td> {/* Assuming you'll update this later */}
                                <td>{team.L10}</td> {/* Assuming you'll update this later */}
                                <td>{team.Strk}</td> {/* Assuming you'll update this later */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    );
}

export default Teams;