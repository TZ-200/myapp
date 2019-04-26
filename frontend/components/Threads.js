import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { THREADS_QUERY } from './GQL'
import Link from 'next/link'
import ThreadPagination from './ThreadPagination'
import { threadPerPage } from '../config';

class Threads extends Component {
    render() {
        return (
            <div>
                <ThreadPagination page={this.props.page}/>
                <Query 
                    query={THREADS_QUERY}
                    variables={{
                        skip: this.props.page * threadPerPage - threadPerPage,
                        first: threadPerPage 
                     }}    
                >
                    { ({ data, error, loading }) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return (
                            <div>
                            {
                                data.threads.map(thread => (
                                    <div key={thread.id}>
                                    <Link 
                                        href={{
                                            pathname: '/thread',
                                            query: { id: thread.id }
                                        }}
                                        
                                    >
                                        
                                        <a>
                                            <div>{thread.title}</div> 
                                            <div>{thread.image && <img width="200" height="200" style={{objectFit:'cover'}} src={thread.image} alt="Thread Image"/>}</div>
                                            <div>{thread.comments.length}</div> 
                                        </a>
                                        
                                    </Link>
                                    </div>
                                ))
                            }
                            </div>
                        )
                        
                    }}
                </Query>
                <ThreadPagination page={this.props.page}/>
            </div>
        );
    }
}

export default Threads;