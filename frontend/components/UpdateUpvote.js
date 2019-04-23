import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CREATE_UPVOTE, SINGLE_THREAD_QUERY, DELETE_UPVOTE_MUTATION } from './GQL'


class UpdateUpvote extends Component {

    state = {}

    componentDidMount(){
        const userId = this.props.userId
        const upvote = this.props.comment.upvotes.filter(upvote => upvote.author.id === userId)
        const upvoted = upvote.length !== 0
        this.setState({upvoted})
        upvote.length > 0 ? this.setState({ upvoteId: upvote[0].id }) : this.setState({ upvoteId: null })
    }

    // update = (cache, payload) => {
    //     const data = cache.readQuery({ 
    //         query: SINGLE_THREAD_QUERY,
    //         variables: {
    //             id: payload.data.createUpvote.thread.id
    //         }
    //     })
    //     console.log(data);

    // }

    render() {        
        return (
            <Mutation
                mutation={DELETE_UPVOTE_MUTATION}
                variables={{
                    id: this.state.upvoteId
                }}
            >
                {(deleteUpvote, {loading, error}) => {
                    const deleteLoading = loading 
                    return(

                    <Mutation
                        mutation={CREATE_UPVOTE}
                        variables={{
                            author: this.props.comment.author,
                            Comment: this.props.comment.id
                        }}
                    >

                    {(createUpvote, {loading, error}) =>(
                        <button
                            onClick={() => {
                                if(!this.state.upvoted){
                                    createUpvote()
                                    .then((payload) => {
                                        this.setState({ 
                                            upvoted: true,
                                            upvoteId: payload.data.createUpvote.id
                                        })
                                        this.props.toUpvote()
                                    })
                                    .catch(err => {
                                        alert(err.message)
                                    })
                                } else {
                                    deleteUpvote()
                                    .then(() => {
                                        this.setState({ 
                                            upvoted: false,
                                            upvoteId: null 
                                        })
                                        this.props.toDeleteUpvote()
                                    })
                                    .catch(err => {
                                        alert(err.message)
                                    })
                                }
                            }}
                            disabled={loading || deleteLoading}    
                        >
                            {this.state.upvoted ? 'いいね済' : 'いいね未'}
                        </button>
                    )}
                    </Mutation>
                )}}
            </Mutation>
        );
    }
}

export default UpdateUpvote;