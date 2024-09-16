import React , { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/playerList.css';
import { Link } from "react-router-dom";


function List () {
    const [players, setPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(31);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchPlayer, setSearchPlayer] = useState([]);

    const [playerCount, setPlayerCount] = useState(100);
    const [cursor, setCursor] = useState(0);      
    const [selectedValue, setSelectedValue] = useState('');


    useEffect(() => {
        const fetchPlayers = async () => {
          try {
            const response = await axios.get(`https://api.balldontlie.io/v1/players?per_page=${playerCount}&cursor=${cursor}`, {
              headers: {
                'Authorization': `d599cf75-13b3-413a-a46e-a13fca488265`
              }
            });
            setPlayers(response.data.data);            
          } catch (error) {
            setError('Failed to fetch data');
            console.error('Error fetching players:', error);
          } finally{
            setLoading(false);
          }

        };

      
        fetchPlayers();

      }, [playerCount, currentPage]); // Dependency on currentPage to refetch when it changes


    const handleSearchChange = (event) => {
        setSearchPlayer(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`https://api.balldontlie.io/v1/players?search=${searchPlayer}`, {
                headers: { 'Authorization': `d599cf75-13b3-413a-a46e-a13fca488265` }
            });
            setPlayers(response.data.data); // Display the searched players
        } catch (error) {
            setError('Failed to fetch player search');
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCursor(cursor - playerCount);
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCursor(cursor + playerCount);
        setCurrentPage(currentPage + 1);
      }
    };

      const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setPlayerCount(Number(event.target.value));
        setCursor(0); // Reset cursor
        setCurrentPage(1); // Reset to first page
        console.log(`Selected: ${event.target.value}`);

        if(event.target.value == 10)
          {
            setTotalPages(310);
          }
          else if(event.target.value == 25)
            {
              setTotalPages(124);
            }
            else if(event.target.value == 50)
              {
                setTotalPages(62);
              }
                else{
                  setTotalPages(31);
                }
      };


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
      if (error) return <p>{error}</p>;



      return (
          <>
          
              <div>
                  <h1 style={{ textAlign: 'center'}}>Every Player</h1>
                  <button className="button" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                  <button className="button" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                 
                  <span> Page {currentPage} of {totalPages} </span>

              </div>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <label htmlFor="exampleDropdown">Choose an option: </label>
                <select id="exampleDropdown" value={selectedValue} onChange={handleChange}>
                  <option value="">--Please choose an option--</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                {selectedValue && <p>You selected: {selectedValue}</p>}

                
              </div>

              <hr/>
              
              <form style={{ textAlign: 'center'}} onSubmit={handleSubmit}>
                <div>
                    <label>Player Name: </label>
                    <input type="text" value={searchPlayer} onChange={handleSearchChange} />
                    <button type="submit">Search</button>
                </div>
              </form>

            {/* Player Info table */}

            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <table style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid black', padding: '8px' }}>#</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Position</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>College</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Country</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Team</th>
                        </tr>

                    </thead>
                    <tbody>

                        {players.map((player) => (
                            <tr key={player.id} style={{ border: '1px solid black', padding: '8px' }}>
                                <td>{player.jersey_number}</td>
                                <td><Link to={`/playerStat?playerId=${player.id}`}>{player.first_name} {player.last_name}</Link></td>
                                <td>{player.position}</td>
                                <td>{player.college}</td> {/* Assuming you'll update this later */}
                                <td>{player.country}</td> {/* Assuming you'll update this later */}
                                <td>{player.team.full_name}</td> {/* Assuming you'll update this later */}
                            </tr>
                        ))}
                        
                    </tbody>
                </table>

            </div>

    
        </>
    );
}

export default List;
