import React, { Component } from 'react';
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import { SINGLE_THREAD_QUERY } from './GQL'
import CreateComment from './CreateComment'
import Comment from './Comment'
import User from './User'
import CheckUpdateThread from './CheckUpdateThread'
import flatten from '../lib/flatten'

class Thread extends Component {

    state = {}

    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

    render() {
        return (
                    <Query 
                        query={SINGLE_THREAD_QUERY} 
                        variables={{
                            id: this.props.id
                        }}
                    >
                        {({ error, loading, data}) => {
                            if(error) return <Error error={error} />
                            if(loading) return <p>Loading...</p>
                            if(!data.thread) return <p>No Thread Found for {this.props.id}</p>
                            const thread = data.thread
                            let comments = data.thread.comments
                            
                            // コメントを投稿が古い順に　かつ　返信も考慮してネストさせる（簡単な例はflatten.jsに記載）
                            let nestedComments = comments.reverse().reduce((result,comment) => {
                                if (!comment.replies) {
                                    comment.replies = comments.filter(r => {
                                        if(r.reply) { return r.reply.id == comment.id }
                                        else { return false }
                                    }).reverse();
                                }
                                if (comment.reply == null) {
                                    result.push(comment);
                                }
                                return result;
                            },[]).reverse();  
                            
                            return(
                                <React.Fragment>
                                <h2>Title: {thread.title} Text: {thread.text} Vtuber:{thread.vtuber.name}</h2>
                                <p>{thread.image && <img width="200" height="200" style={{objectFit:'cover'}} src={thread.image} alt="Thread Image"/>}</p>
                                <User>
                                    {({data: { me }}) => (
                                        <React.Fragment>
                                            { me && <CheckUpdateThread threadId={thread.id}/> }
                                        </React.Fragment>
                                    )}
                                </User> 

                                <CreateComment  thread={this.props.id} />

                                {comments && nestedComments.map(comment => {
                                    const flatComments = flatten(comment)
                                    const dispComments = flatComments.map(flatComment => <Comment threadId={this.props.id} comment={flatComment} key={flatComment.id}/>)
                                    return dispComments
                                })}
                                
                                </React.Fragment>
                            )
                        }}
                    </Query>
        );
    }
}

export default Thread;