import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import { DELETE_THREAD_MUTATION, THREADS_QUERY } from './GQL'

class DeleteThread extends Component {
    render() {
        return (
            <Mutation
                mutation={DELETE_THREAD_MUTATION}
                variables={{
                    id: this.props.id
                }}
                refetchQueries={() => {
                    return[{
                        query: THREADS_QUERY
                    }]
                }}
            >
            {(deleteThread, {error})=>(
                <button
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this item?')){
                            deleteThread()
                            .then(() => {
                                Router.push({ pathname: '/' })
                            })
                            .catch(err => {
                                alert(err.message)
                            })
                        }
                    }}
                >
                    削除
                </button>
            )}
            
            </Mutation>
        );
    }
}

export default DeleteThread;