import React, { Component } from 'react';
import DeleteComment from './DeleteComment'
import UpdateUpvote from './UpdateUpvote'
import User from './User'
import CreateReply from './CreateReply'
import styled from 'styled-components';
import uniqid from 'uniqid'

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
        const reply = comment.reply;

        const CommentStyles = styled.div`
            border-left: 2px solid rgb(216, 236, 255);
            padding-left: 1rem;
            padding-bottom: 2rem;
            margin-top: 1rem;
            width: 100%;

            & .comment__container{
                margin-top: 1rem;
            }

            & .comment__author--name{
                color: #bbb;
                & > span{
                    color: #3b7ab8;
                }
            }

            & .comment__text{
                margin-bottom: 20px;
                margin-top: 10px;
                font-size: 1.5rem;
                color: #555;
            }

            & .comment__author--metas{
                display: flex;
                color: #777;
                & > * {
                    margin-right: 2rem;
                }
            }

        `

            let indents = [];
            if(comment.depth > 0){
                for (var i = 0; i < comment.depth; i++) {
                    indents.push(
                        <div
                            style={{
                                borderLeft: '2px solid rgb(216, 236, 255)',
                                paddingLeft: '1rem',

                            }}
                            key={uniqid()}
                        >&nbsp;</div>
                    )
                 }
            }
            

            

        return (
            <User>
            
            {({data: { me }}) => (
            
            <div style={{display: 'flex'}}>
            {indents.length > 0 &&
                indents.map(indent => indent)
            }
            <CommentStyles style={ reply && {
                marginTop: '0'
            }}>



                <div className="comment__container">

                    <div className="comment__author--name">
                        By <span>{comment.author.name}</span>　　投稿日
                    </div>
                
                    <div className="comment__text">
                        {comment.text.split("\n").map(el => <span key={uniqid()}>{el}<br/></span>)}
                    </div>
                
                    <div className="comment__author--metas">
                        <div
                            onClick={()=>{
                                this.setState({ reply: !this.state.reply })
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            返信
                        </div>
                        <div style={{display: 'flex'}}>
                            
                            { me &&
                                <UpdateUpvote 
                                    toUpvote={this.toUpvote} 
                                    toDeleteUpvote={this.toDeleteUpvote}
                                    comment={comment} 
                                    userId={me.id}
                                    threadId={this.props.threadId}
                                    upvotes={this.state.upvotes}
                                />
                            }

                            
                        </div>
                        <DeleteComment threadId={this.props.threadId} commentId={comment.id}/>
                    </div>

                    { this.state.reply && <CreateReply threadId={this.props.threadId} commentId={comment.id}/> }
                
                </div>
            </CommentStyles>
            </div>
            )}
            </User>
        );
    }
}

export default Comment;


/**
 * 

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


 */