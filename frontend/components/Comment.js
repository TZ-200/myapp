import React, { Component } from 'react';
import DeleteComment from './DeleteComment'
import UpdateUpvote from './UpdateUpvote'
import User from './User'
import CreateReply from './CreateReply'

class Comment extends Component {
    
    state={
        upvotes: this.props.comment.upvotes.length,
        reply: false
    }

    toUpvote = () => {
        this.setState({upvotes: this.state.upvotes + 1})
    }
    toDeleteUpvote = () => {
        this.setState({upvotes: this.state.upvotes - 1})
    }

    render() {
        const comment = this.props.comment
        return (
            <div>
                {comment.reply && 'Reply '} {comment.text} by {comment.author.name} & Upvote:{this.state.upvotes} || depth:{comment.depth}
                <User>
                    {({data: { me }}) => {
                        if(me){

                            return(
                                <React.Fragment>
                                    <UpdateUpvote 
                                        toUpvote={this.toUpvote} 
                                        toDeleteUpvote={this.toDeleteUpvote}
                                        comment={comment} 
                                        userId={me.id}
                                    />
                                    <DeleteComment threadId={this.props.threadId} commentId={comment.id}/>
                                    <button
                                        onClick={()=>{
                                            this.setState({ reply: !this.state.reply })
                                        }}
                                    >
                                        Reply
                                    </button>
                                    { this.state.reply && <CreateReply threadId={this.props.threadId} commentId={comment.id}/> }
                                </React.Fragment>
                            )
                        } else {
                            return(<div/>)
                        }
                    }}
                </User> 
            </div>
        );
    }
}

export default Comment;