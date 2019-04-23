import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { THREADS_QUERY } from './GQL'
import Link from 'next/link'
import Pagination from './Pagination'
import { threadPerPage } from '../config';

class Threads extends Component {
    render() {
        return (
            <div>
                <Pagination page={this.props.page}/>
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
                                ))
                            }
                            </div>
                        )
                        
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </div>
        );
    }
}

export default Threads;