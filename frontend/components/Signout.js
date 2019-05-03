import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from './GQL'
import Router from 'next/router'



const Signout = props => (
    <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY}]}
    >
        { signout => (
            <button
                onClick={() => {
                    signout()
                    Router.push({
                        pathname: '/'
                    })
                }}
            >
                SignOut
            </button> 
        )}
    </Mutation>
)

export default Signout;