import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import '../../css/Fantasy.css';
import { Link } from "react-router-dom";

function Fantasy() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotPlayers, setSlotPlayers] = useState({ slot1: null, slot2: null });

    const openPopup = (slot) => {
        setSelectedSlot(slot);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedSlot(null);
    };

    const handlePlayerSelect = (player) => {
        setSlotPlayers((prev) => ({ ...prev, [selectedSlot]: player }));
        closePopup();
    };

    const Popup = ({ onClose, onSelectPlayer }) => {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <div className="player-list">
                        <List onSelectPlayer={onSelectPlayer} />
                    </div>
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
            </div>
        );
    };

    

    const List = ({ onSelectPlayer }) => {
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
                setLoading(true);
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
                } finally {
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

            if (event.target.value === '10') {
                setTotalPages(310);
            } else if (event.target.value === '25') {
                setTotalPages(124);
            } else if (event.target.value === '50') {
                setTotalPages(62);
            } else {
                setTotalPages(31);
            }
        };

        if (loading) return (
            <div className="center-body">
                <div className="loader-spanne-20">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );

        if (error) return <p>{error}</p>;

        return (
            <>
                <div>
                    <h1 style={{ textAlign: 'center' }}>Every Player</h1>
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

                <hr />

                <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                    <div>
                        <label>Player Name: </label>
                        <input type="text" value={searchPlayer} onChange={handleSearchChange} />
                        <button type="submit">Search</button>
                    </div>
                </form>

                <div className="table-container">
                    <table style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ border: '1px solid black', padding: '8px' }}>#</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Position</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.id} style={{ border: '1px solid black', padding: '8px' }}>
                                    <td>{player.jersey_number}</td>
                                    <td>
                                        <button className="button-player-name" onClick={() => onSelectPlayer(player)}>
                                            {player.first_name} {player.last_name}
                                        </button>
                                    </td>
                                    <td>{player.position}</td>
                                    <td>{player.team.full_name}</td>                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="parent">
                <div className="player-slot">
                    <div className="player-slot__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill="#fff" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
                        </svg>
                    </div>
                    <div className="player-slot__title">
                        {slotPlayers.slot1 ? `${slotPlayers.slot1.first_name} ${slotPlayers.slot1.last_name}` : "Player 1"}
                    </div>
                    <div className="player-slot__add">
                        {!isPopupOpen && (
                            <button className="button-fantasy" onClick={() => openPopup("slot1")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className="svg-icon">
                                    <g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a">
                                        <circle r="7.5" cy="10" cx="10"></circle>
                                        <path d="m9.99998 7.5v5"></path>
                                        <path d="m7.5 9.99998h5"></path>
                                    </g>
                                </svg>
                                <span className="label">Add</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="player-slot">
                    <div className="player-slot__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill="#fff" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
                        </svg>
                    </div>
                    <div className="player-slot__title">
                        {slotPlayers.slot2 ? `${slotPlayers.slot2.first_name} ${slotPlayers.slot2.last_name}` : "Player 2"}
                    </div>
                    <div className="player-slot__add">
                        {!isPopupOpen && (
                            <button className="button-fantasy" onClick={() => openPopup("slot2")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className="svg-icon">
                                    <g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a">
                                        <circle r="7.5" cy="10" cx="10"></circle>
                                        <path d="m9.99998 7.5v5"></path>
                                        <path d="m7.5 9.99998h5"></path>
                                    </g>
                                </svg>
                                <span className="label">Add</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {isPopupOpen && <Popup onClose={closePopup} onSelectPlayer={handlePlayerSelect} />}
        </>
    );
}

export default Fantasy;
