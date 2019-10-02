import React from 'react'
import { inject, observer } from 'mobx-react';
import { Typography } from 'antd';
const { Title } = Typography;

const Message = inject('Store')(observer((props) => {
    return (
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
            {props.Store.playerWinner === '' ? '' : <Title>{`${props.Store.playerWinner} won`}</Title>}
        </div>
    );
}))
export default Message;