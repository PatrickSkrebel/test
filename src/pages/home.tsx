import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useLocation } from 'react-router-dom';
import '../css/home.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function Home () {
    const { data, error, loading } = useFetch('news');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [newArticle, setNewsArticle] = useState([]);

    // Variables for grabbing api games
    const [games, setGames] = useState([]);
    const query = useQuery();
    const gameId = query.get('gameId');
    const [ errorGames, setError ] = useState('');

    // Keep Track of page
    const [cursor, setCursor] = useState(0);      
    const [selectedValue, setSelectedValue] = useState('');

    // API calls news articles
    // Will call from sports data


    // API calls games
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`https://api.balldontlie.io/v1/games?per_page=7&start_date=2024-06-06&postseason=true`, { // Corrected to template literals
                    headers: {
                        'Authorization': 'd599cf75-13b3-413a-a46e-a13fca488265' // Adjust the header as per the API's requirement
                    }
                });
                setGames(response.data.data); // Assuming the data is stored in `data.data`
            } catch (err) {
                setError('Failed to fetch data for games'); //set error message
                console.error('Error fetching player info data:', err);
            }
        };

        fetchPlayers();
    }, []); // Dependency on id to re-fetch when it changes


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>No data found.</p>;
    }

    const news = data;



    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };


    return(
    <>
        <div className="home-container">
            <h1 className="title">NBA News</h1>
            <div className="articles-container">
                <div className="side-articles">
                    {news.map((article) => (
                        <div key={article.id} className="article-summary" onClick={() => handleArticleClick(article)}>
                            <h2>{article.headline}</h2>
                            <p>{article.abstract}</p>
                        </div>
                    ))}
                </div>
                <div className="main-article">
                    {news.map((article) => (
                        <div key={article.id} className="article-summary">
                            <h2>{article.headline}</h2>
                            <p>{article.body}</p>
                        </div>
                    ))}

                </div>
                <div className="games-container">
                    <div className="backdrop">
                        <div className="backdrop-text">
                            <h2>Game Schedule</h2>
                            <p>Stay updated with the latest game information</p>
                        </div>
                        <div className="card-container">
                            {games.map((game) => (
                                <div className="card" key={game.id}>
                                    <h3>{game.home_team.abbreviation} | {game.visitor_team.abbreviation}</h3>
                                    <p>{game.date}</p>
                                    <p>{game.home_team_score} | {game.visitor_team_score}</p>
                                    <p>{game.time} {game.period}th qtr</p>
                                    <p>{game.postseason ? 'Postseason' : 'Regular Season'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

    );
}

export default Home;