import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { DELETE_COMMENT_MUTATION } from './GQL'


class DeleteComment extends Component {
    render() {
        return (
            <Mutation
                mutation={DELETE_COMMENT_MUTATION}
                variables={{
                    id: this.props.commentId
                }}
            >
            {(deleteComment, {error})=>(
                <button
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this item?')){
                            deleteComment()
                            .then(() => location.reload())
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