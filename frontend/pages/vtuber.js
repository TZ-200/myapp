import React, { Component } from 'react';
import Vtuber from '../components/Vtuber'

const vtuberPage = props => (
    <div>
        <Vtuber id={props.query.id} page={parseFloat(props.query.page) || 1}/>
    </div>
);

export default vtuberPage;