import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CREATE_FOLLOW, DELETE_FOLLOW, CURRENT_USER_QUERY } from './GQL'
import User from './User'
import styled from 'styled-components';


class CreateFollow extends Component {
    render() {
        const FollowButtonStyles = styled.div`
            & .followed__btn{
                background-color: #3b7ab8;
                border-radius: 5px;
                border: none;
                color: #fff;
                cursor: pointer;
                font-size: 10px;
                padding: 4px 8px;
                width: 80px;
                 &:hover{
                     background-color: #c53e3e;
                 }
            }

            & .follow__btn{
                background-color: #fff;
                border-radius: 5px;
                border: 1px solid #3b7ab8;
                color: #3b7ab8;
                cursor: pointer;
                font-size: 10px;
                padding: 4px 8px;
                width: 80px;
                font-weight: 600;
                 &:hover{
                     background-color: #eef4fb;
                 }
            }
    
        `
        return (
            <FollowButtonStyles>
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
                                            className="followed__btn"
                                            onMouseOver={(e) => e.target.innerHTML='フォロー解除' }
                                            onMouseOut={(e) => e.target.innerHTML='フォロー中'}
                                        >
                                            フォロー中
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
                                            className="follow__btn"
                                        >
                                            フォローする
                                        </button>
                                    )}
                                </Mutation>
                            }
                            </React.Fragment>
                        )
                    }}
                </User>
            </FollowButtonStyles>
        );
    }
}

export default CreateFollow;