import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch'; // Assuming useFetch is defined in a separate file

function TeamPage() {
    const { data, error } = useFetch('eastconf');
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (data) {
            // Assuming 'eastconf' data contains all teams
            setTeams(data);
        }
    }, [data]);

    const handleWinLossChange = (e, teamId, field) => {
        const updatedTeams = teams.map((team) => {
            if (team.id === teamId) {
                return {
                    ...team,
                    [field]: parseInt(e.target.value) || 0, // Convert to integer or default to 0
                };
            }
            return team;
        });
        setTeams(updatedTeams);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/teams/update', {
                teams: teams
            });
            console.log('Update successful:', response.data);
        } catch (error) {
            console.error('Update failed:', error.message);
        }
    };
    
    return (
        <div>
            <h2>All Teams</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>W</th>
                            <th>L</th>
                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id}>
                                <td>{team.team}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={team.w}
                                        onChange={(e) => handleWinLossChange(e, team.id, 'w')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={team.l}
                                        onChange={(e) => handleWinLossChange(e, team.id, 'l')}
                                    />
                                </td>
                                {/* Add more table data cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>

            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default TeamPage;
