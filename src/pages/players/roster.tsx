import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../css/roster.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Roster() {
    const [players, setPlayers] = useState([]);
    const query = useQuery();
    const teamId = query.get('teamId');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Navigate
    const Navigate = useNavigate();

    function goBack(){
        Navigate(-1);
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.balldontlie.io/v1/players?team_ids[]=${teamId}`, { // Corrected to template literals
                    headers: {
                        'Authorization': 'd599cf75-13b3-413a-a46e-a13fca488265' // Adjust the header as per the API's requirement
                    }
                });
                setPlayers(response.data.data); // Assuming the data is stored in `data.data`
               
            } catch (err) {
                setError('Failed to fetch data');
                console.error('Error fetching team data:', err);
            }finally{
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [teamId]); // Dependency on id to re-fetch when it changes


    if (loading) return<div className="center-body">
    <div className="loader-spanne-20">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div>
                <button onClick={goBack}>Back</button>
                <b><p>* Players with no position are players who are retired and prevously played for the team</p></b>
                <h1 style={{ textAlign: 'center'}}>Roster</h1>
            </div>
            <br />
            <hr />
            <br />


            <div className="flip-cards-container">
                {players.map((player) => (
                    <div className="flip-card" key={player.id}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                        <p className="title"><strong>{player.first_name} {player.last_name}</strong></p>
                        <p style={{ color: '#000000' }}><strong>#{player.jersey_number}</strong></p>
                        </div>
                        <div className="flip-card-back">
                        <p className="title">BACK</p>
                        <p style={{ color: '#000000' }}>Position {player.position}</p>
                        <p style={{ color: '#000000' }}>College: {player.college}</p>
                        <p style={{ color: '#000000' }}>Country: {player.country}</p>
                        <button className="button-style">
                            <Link to={`/playerStat?playerId=${player.id}`} className="link-style">
                            View
                            </Link>
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
            </div>


        </>
    );
}

export default Roster;
