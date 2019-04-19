import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from './GQL'



const Signout = props => (
    <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY}]}
    >
        { signout => (
            <button
                onClick={signout}
            >
                SignOut
            </button> 
        )}
    </Mutation>
)

export default Signout;