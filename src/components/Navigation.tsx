import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Navigation.css';
import '../css/home.css';

library.add(faIdCard);

function Navigation() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://api.balldontlie.io/v1/teams', {
          headers: {
            'Authorization': `d599cf75-13b3-413a-a46e-a13fca488265`  // Adjust the header as per the API's requirement
          }
        });

        setTeams(response.data.data); // Assuming the data is stored in `data.data`
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching teams:', err);
      }
    };

    fetchTeams();
  }, []);

  const handleSelectChange = (event) => {
    const teamId = event.target.value;
    if (teamId) {
      navigate(`/roster?teamId=${teamId}`);
    }
  };

  return (
      <header className="header">
        <nav>
          <ul className="nav-list">
            <div className="nav-center">
              <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                <Link to="/Standings" className="nav-link">Standings</Link>
              </li>
              <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                <Link to="/PlayerList" className="nav-link">Players</Link>
              </li>
              <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                <Link to="/leagueLeaders" className="nav-link">Leaders</Link>
              </li>
              <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                <Link to="/users/fantasy" className="nav-link">Fantasy</Link>
              </li>
              <li className="nav-link dropdown-toggle">
                <select onChange={handleSelectChange} className="dropdown-item">
                  <option value="">Select Team</option>
                  {teams.slice(0, 30).map(team => (
                    <option key={team.id} value={team.id}>{team.full_name}</option>
                  ))}
                </select>
              </li>
            </div>
            <li className="nav-item ml-auto">
              <Link to="/users/credentials" className="nav-link">
                <FontAwesomeIcon icon={['far', 'id-card']} size="2x" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>    
  );
}

export default Navigation;
