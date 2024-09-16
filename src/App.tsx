import React from 'react';
import Teams from './pages/teams';
import Home from './pages/home';
import Roster from './pages/players/roster';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Navigation from './components/Navigation';
import PlayerList from './pages/players/playerList';
import PlayerStat from './pages/players/playerStat';
import Test from "./pages/test";
import LeagueLeaders from './pages/players/leagueLeaders';
import Cred from './pages/users/credentials';
import UpdateStandings from './pages/Admin/UpdateStandingsData';
import Fantasy from './pages/users/fantasy';
import '../src/css/Animated.css'


function App() {


        return (
          <Router>
          <div >
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/Standings" element={<Teams />}/>
              <Route path="/roster" element={<Roster />}/>
              <Route path="/playerStat" element={<PlayerStat />}/>
              <Route path="/PlayerList"element={<PlayerList />} />
              <Route path="/leagueLeaders" element={<LeagueLeaders />}/>
              <Route path="/users/credentials"element={<Cred />} />
              <Route path="/users/updatestandings"element={<UpdateStandings />} />
              <Route path="/users/fantasy"element={<Fantasy/>}/>
              <Route path="/test"element={<Test />} />
            </Routes>
          </div>
        </Router>
        );
}

export default App;
