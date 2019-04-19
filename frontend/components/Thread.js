import React, { Component } from 'react';
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import { SINGLE_THREAD_QUERY } from './GQL'
import CreateComment from './CreateComment'
import Comment from './Comment'
import User from './User'
import CheckUpdateThread from './CheckUpdateThread'

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
                            const comments = data.thread.comments
                            return(
                                <React.Fragment>
                                <h2>Title: {thread.title} Text: {thread.text}</h2>

                                <User>
                                    {({data: { me }}) => (
                                        <React.Fragment>
                                            { me && <CheckUpdateThread threadId={thread.id}/> }
                                        </React.Fragment>
                                    )}
                                </User> 

                                <CreateComment  thread={this.props.id} />

                                {comments && comments.map(comment => (
                                    <Comment comment={comment} key={comment.id}/>
                                ))}
                                
                                </React.Fragment>
                            )
                        }}
                    </Query>
        );
    }
}

export default Thread;