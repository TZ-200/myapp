import React, { Component } from 'react';
import Vtuber from '../components/Vtuber'
import PleaseSignIn from '../components/PleaseSignin'

const vtuberPage = props => (
    <PleaseSignIn>
        <Vtuber id={props.query.id} page={parseFloat(props.query.page) || 1}/>
    </PleaseSignIn>
);

export default vtuberPage;