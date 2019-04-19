import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CHECK_THREAD_PERMISSION_MUTATION } from './GQL'
import Router from 'next/router'

class CheckUpdateThread extends Component {
    render() {
        return (
            <Mutation
                mutation={CHECK_THREAD_PERMISSION_MUTATION}
                variables={{
                    id: this.props.threadId
                }}
            >
            {(checkPermission, {error})=>(
                <button
                    onClick={() => {
                        if(confirm('Are you sure you want to update the thread?')){
                            checkPermission()
                            .then(() => {
                                Router.push({
                                    pathname: '/updateThread',
                                    query: { id: this.props.threadId }  
                                })      
                            })
                            .catch(err => {
                                alert(err.message)
                            })
                        }
                    }}
                >
                    更新
                </button>
            )}
            
            </Mutation>
        );
    }
}

export default CheckUpdateThread;