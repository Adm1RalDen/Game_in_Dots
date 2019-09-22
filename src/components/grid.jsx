import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Row } from 'antd'
import '../styles/Grid.css';

const Grid = inject('Store')(observer((props) => {
    let handleClickToCell = (i, j) => {
        if (props.Store.isPlay) {
            let arr = props.Store.grid;
            if (arr[i][j].classColor === 'blue-cell') {
                arr[i][j].classColor = 'green-cell';
                props.Store.setGrid(arr);
            }
        }
    }
    return (
        <div className='grid-container'>
            {(Object.keys(props.Store.grid).length) ?
                <div className='grid-div'>{props.Store.grid.map((row, index) => {
                    return <Row type='flex' justufy='center' key={index}>
                        {row.map((cell, j) => {
                            return <Col key={j} className={`cell-in-row ${cell.classColor}`} onClick={() => handleClickToCell(index, j)} />
                        })}
                    </Row>
                })}</div>
                : <div>Please pick game mode</div>}
        </div >
    );
}))
export default Grid