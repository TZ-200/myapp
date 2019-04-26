import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CREATE_FOLLOW, DELETE_FOLLOW, CURRENT_USER_QUERY } from './GQL'
import User from './User'

class CreateFollow extends Component {
    render() {
        return (
            <div>
                <User>
                    {({data: { me }}) => {
                        const isFollowing = me.follows.some(follow => follow.id === this.props.vtuberId)
                        
                        return(
                            <React.Fragment>
                            {isFollowing 
                                ?
                                <Mutation 
                                    mutation={DELETE_FOLLOW}
                                    variables={{
                                        vtuber: this.props.vtuberId
                                    }}
                                    refetchQueries={() => {
                                        return[{
                                            query: CURRENT_USER_QUERY
                                        }]
                                    }}
                                >
                                    {(deleteFolow, { loading, error }) => (
                                        <button
                                            onClick={() => {
                                                deleteFolow()
                                                .catch(err => {
                                                    alert(err.message)
                                                })
                                            }}
                                            disabled={loading}
                                        >
                                            unfollow
                                        </button>
                                    )}
                                </Mutation>

                                :
                                <Mutation 
                                    mutation={CREATE_FOLLOW}
                                    variables={{
                                        vtuber: this.props.vtuberId
                                    }}
                                    refetchQueries={() => {
                                        return[{
                                            query: CURRENT_USER_QUERY
                                        }]
                                    }}
                                >
                                    {(createFolow, { loading, error }) => (
                                        <button
                                            onClick={() => {
                                                createFolow()
                                                .catch(err => {
                                                    alert(err.message)
                                                })
                                            }}
                                            disabled={loading}
                                        >
                                            follow
                                        </button>
                                    )}
                                </Mutation>
                            }
                            </React.Fragment>
                        )
                    }}
                </User>
            </div>
        );
    }
}

export default CreateFollow;