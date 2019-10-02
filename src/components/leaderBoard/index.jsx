import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Card } from 'antd';
import './LeaderBoard.css'
const gridStyle = {
    width: '100%',
    textAlign: 'center',
};
const LeaderBord = inject('Store')(observer((props) => {
    useEffect(() => {
        props.Store.getWinners();
    }, [])
    return (
        <div className='leader-board-container'>
            <Card title="Leader board" >
                {props.Store.leaderBoards.length === 0 ?
                    <Card.Grid style={gridStyle}> NO DATA </Card.Grid>
                    :
                    props.Store.leaderBoards.slice().reverse().map((item, index) => <Card.Grid key={index} style={gridStyle}>{`${item.winner} - ${item.date}`}</Card.Grid>)
                }
            </Card>
        </div>
    );
}))
export default LeaderBord;