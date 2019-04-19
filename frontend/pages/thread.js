import React, { Component } from 'react';
import Thread from '../components/Thread'

const threadPage = props => (
    <div>
        <Thread id={props.query.id}/>
    </div>
);

export default threadPage;