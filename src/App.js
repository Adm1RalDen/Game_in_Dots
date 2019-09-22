import React from 'react'

import Header from './components/buttonsInHeader';
import Grid from './components/grid';
import './styles/App.css';
import LeaderBoard from './components/leaderBoard';
import { Typography } from 'antd';
import Message from './components/message';

const { Title } = Typography;

const App = (props) => {
    return (
        <div className='main-container'>
            <div className='mainTitle'><Title>Game In Dots</Title></div>
            <div className='container-content'>
                <div>
                    <Header />
                    <Message />
                    <Grid />
                </div>
                <LeaderBoard />
            </div>
        </div>
    );
}
export default App