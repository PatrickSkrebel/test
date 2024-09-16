import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../../css/playerStats.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Stats() {
    const [players, setPlayers] = useState([]);
    const query = useQuery();
    const playerId = query.get('playerId');
    const [error, setError] = useState(null);
    const [playerInfo, setPlayerInfo] = useState([]);

    // Navigate
    const Navigate = useNavigate();

    function goBack(){
        Navigate(-1);
    }

    // API calls player stats
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`, { // Corrected to template literals
                    headers: {
                        'Authorization': 'd599cf75-13b3-413a-a46e-a13fca488265' // Adjust the header as per the API's requirement
                    }
                });
                setPlayers(response.data.data); // Assuming the data is stored in `data.data`
            } catch (err) {
                setError('Player Info Failed to fetch data'); //set error message
                console.error('Error fetching player info data:', err);
            }
        };

        fetchPlayers();
    }, []); // Dependency on id to re-fetch when it changes


    // API is calling player info
    useEffect(() => {
        const fetchPlayerStat = async () => {
            try {
                const response = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, { // Corrected to template literals
                    headers: {
                        'Authorization': 'd599cf75-13b3-413a-a46e-a13fca488265' // Adjust the header as per the API's requirement
                    }
                });
                setPlayerInfo(response.data.data); // Assuming the data is stored in `data.data`
            } catch (err) {
                setError('Stats Failed to fetch data'); // set error message
                console.error('Error fetching player stat data:', err);
            }
        };

        fetchPlayerStat();
    }, [playerId]); // Dependency on id to re-fetch when it changes

    if(error) return <p>Error: {error}</p> // displays error message if data cant be pulled

    return (
        <>
            <div>
                <button onClick={goBack}>Back</button>
                <h1 style={{ textAlign: 'center' }}>Player Stats</h1>
                <b><p>* Players with no stats are retired or don't have access to stats</p></b>
            </div>
            <br />
            <hr />
            <br />

            {players.map((player) => (
                <>

                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                    <div className="cards-wrapper" key={player.id}>
                        <div className="top-card card">
                            <div className="container">
                                <h4 style={{ color: `#000000`}}><b>{playerInfo.first_name} {playerInfo.last_name} #{playerInfo.jersey_number}</b> </h4>
                                <p className="inline-draft"><b>Draft Year: {playerInfo.draft_year}</b></p>
                                <p className="inline-draft"><b>Draft Round: {playerInfo.draft_round}</b></p>
                                <p className="inline-draft"><b>Draft Pick: {playerInfo.draft_number}</b></p>
                                <p className="inline-draft"><b>Current: {playerInfo.team.full_name}</b></p>
                            </div>
                        </div>
                        <div className="bottom-cards">
                            <div className="card">
                                <div className="container">
                                    <h4 style={{ color: `#000000`}}><b>Points</b></h4>
                                    <hr />
                                    <p style={{ color: `#000000`}}><b>{parseFloat(player.pts).toFixed(1)}</b></p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="container">
                                    <h4 style={{ color: `#000000`}}><b>Rebounds</b></h4>
                                    <hr />
                                    <p style={{ color: `#000000`}}><b>{parseFloat(player.reb).toFixed(1)}</b></p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="container">
                                    <h4 style={{ color: `#000000`}}><b>Assists</b></h4>
                                    <hr />
                                    <p style={{ color: `#000000`}}><b>{parseFloat(player.ast).toFixed(1)}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <h1 style={{ textAlign: 'center' }}>Advanced Stats</h1>
                    <br />
                    <hr />
                    <br />


                    <table style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse', width: '80%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Season</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FGA</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FGM</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FG %</th>                                
                                <th style={{ border: '1px solid black', padding: '8px' }}>FG3A</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FG3M</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FG3 %</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FTA</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FTM</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FT %</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>OREB</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>DREB</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>STL</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>BLK</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>TO</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr key={player.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{player.season}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fga).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fgm).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fg_pct).toFixed(2)}</td>                       
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fg3a).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fg3m).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fg3_pct).toFixed(2)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.fta).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.ftm).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.ft_pct).toFixed(2)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.oreb).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.dreb).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.stl).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.blk).toFixed(1)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{parseFloat(player.turnover).toFixed(1)}</td>
                            </tr>

                        </tbody>
                    </table>

                 
                </div>

                <p  style={{color: `#000000`}}>* Advanced Stats</p>
                <li style={{color: `#000000`}}>FGA - Field Goals Attempts</li>
                <li style={{color: `#000000`}}>FGM - Field Goals Made</li>
                <li style={{color: `#000000`}}>FG % - Field Goal Percentage</li>
                <li style={{color: `#000000`}}>FG3A - Field Goals 3's Attempts</li>
                <li style={{color: `#000000`}}>FG3M - Field Goals 3's Made</li>
                <li style={{color: `#000000`}}>FG3 % - Field Goal 3 Percentage</li>
                <li style={{color: `#000000`}}>FTA - Free Throw's Attempts</li>
                <li style={{color: `#000000`}}>FTM - Free Throw's Made</li>
                <li style={{color: `#000000`}}>FT % - Free Throw Percentage</li>
                <li style={{color: `#000000`}}>OREB - Offense Rebounds</li>
                <li style={{color: `#000000`}}>DREB - Defense Rebounds</li>
                <li style={{color: `#000000`}}>STL - Steals</li>
                <li style={{color: `#000000`}}>BLK - Blocks</li>
                <li style={{color: `#000000`}}>TO - Turnovers</li>
                </>
         ))}

        </>
    );
}

export default Stats