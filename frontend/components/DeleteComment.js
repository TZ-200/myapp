import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { DELETE_COMMENT_MUTATION, SINGLE_THREAD_QUERY } from './GQL'


class DeleteComment extends Component {
    render() {
        return (
            <Mutation
                mutation={DELETE_COMMENT_MUTATION}
                variables={{
                    id: this.props.commentId
                }}
                refetchQueries={() => {
                    return[{
                        query: SINGLE_THREAD_QUERY,
                        variables: { id: this.props.threadId}
                    }]
                }}
            >
            {(deleteComment, {error})=>(
                <button
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this item?')){
                            deleteComment()
                            .catch(err => {
                                alert(err.message)
                            })
                        }
                    }}
                >
                    x
                </button>
            )}
            
            </Mutation>
        );
    }
}

export default DeleteComment;