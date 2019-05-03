import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CREATE_UPVOTE, SINGLE_THREAD_QUERY, DELETE_UPVOTE_MUTATION, COMMENT_QUERY, UPDATE_UPVOTE } from './GQL'


class UpdateUpvote extends Component {

    state = {}

    componentDidMount(){
        const userId = this.props.userId
        const upvote = this.props.comment.upvotes.filter(upvote => upvote.author.id === userId) // lengthは 0 か 1
        const upvoted = upvote.length !== 0 // ユーザがいいねしてたらtrue
        this.setState({upvoted})

        // lengthが1、つまりユーザがいいねしてたら、そのいいねのidを取得
        // いいねしてなかったらそのidはnull
        upvote.length > 0 
            ? this.setState({ upvoteId: upvote[0].id }) 
            : this.setState({ upvoteId: null })  
            
    }

    render() {        
        return (
                    <Mutation
                        mutation={UPDATE_UPVOTE}
                        variables={{
                            author: this.props.comment.author,
                            Comment: this.props.comment.id
                        }}
                        refetchQueries={() => {
                            return[{
                                query: SINGLE_THREAD_QUERY,
                                variables: { id: this.props.threadId }
                            }]
                        }}
                    >

                    {(updateUpvote, {loading, error}) =>(

                        // <svg
                        //     onClick={() => {
                        //         if(!this.state.upvoted){
                        //             createUpvote()
                        //             .then(() => this.props.toUpvote() )
                        //             .catch(err => {
                        //                 alert(err.message)
                        //             })
                        //         } else {
                        //             deleteUpvote()
                        //             .then(() => this.props.toDeleteUpvote())
                        //             .catch(err => {
                        //                 alert(err.message)
                        //             })
                        //         }
                        //     }}
                        //     style={{
                        //         fill: this.state.upvoted ? '#3b7ab8' : '#777',
                        //         cursor: 'pointer',
                        //         pointerEvents: (loading || deleteLoading) ? 'none' : 'auto',
                        //         width: '17px',
                        //         height: '17px'
                        //     }}
                        // >
                        
                        //     <use xlinkHref="../static/like.svg#Layer_1"></use>
                        // </svg>

                        <div
                            onClick={() => {
                                updateUpvote()
                                .then(() => {
                                    if(!this.state.upvoted){
                                        this.props.toUpvote()
                                    } else {
                                        this.props.toDeleteUpvote()
                                    }
                                })
                                .catch(err => {
                                    alert(err.message)
                                })
                            }}
                            style={{
                                pointerEvents: loading ? 'none' : 'auto',
                                color: this.state.upvoted ? '#3b7ab8' : '#777',
                                cursor: 'pointer',
                                fontWeight: this.state.upvoted ? '600' : '300',
                            }}
                        >
                        いいね({this.props.upvotes})
                        </div>

                    )}
                    </Mutation>

        );
    }
}

export default UpdateUpvote;