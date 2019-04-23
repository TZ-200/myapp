import React, { Component } from 'react';
import User from './User'
import Link from 'next/link'

class Account extends Component {
    render() {
        return (
            <div>
                <User>
                    {({data: { me }}) => {
                        return(
                            <React.Fragment>
                                { me && (
                                    <React.Fragment>
                                        
                                        <Link 
                                            href={{
                                                pathname: '/updateAccount',
                                                query: { id: me.id }
                                            }}
                                        >
                                                <a>Edit Account Info</a>
                                        </Link>

                                        <p>name: {me.name}</p>
                                        <p>email: {me.email}</p>
                                        <p>description: {me.description}</p>
                                        <p>image: {me.image && <img width="200" height="200" style={{objectFit:'cover'}} src={me.image} alt="Account Image"/>}</p>
                                        <p>Threads</p>
                                        {me.Threads.map(thread => (
                                            <p key={thread.id}>
                                                <Link 
                                                    href={{
                                                        pathname: '/thread',
                                                        query: { id: thread.id }
                                                    }}
                                                >
                                                        <a>{thread.title}</a>
                                                </Link>
                                            </p>
                                        ))}
                                        <p>Comments</p>
                                        {me.Comments.map(comment => (
                                            <p key={comment.id}>
                                                <Link 
                                                    href={{
                                                        pathname: '/thread',
                                                        query: { id: comment.thread.id }
                                                    }}
                                                >
                                                        <a>{comment.text} upvotes:{comment.upvotes.length}</a>
                                                </Link>
                                            </p>
                                        ))}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )
                    }}
                </User> 
            </div>
        );
    }
}

export default Account;