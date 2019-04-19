import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { THREADS_QUERY } from './GQL'
import Link from 'next/link'

class Threads extends Component {
    render() {
        return (
            <div>
                <Query 
                    query={THREADS_QUERY}
                >
                    { ({ data, error, loading }) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return (
                            <div>
                            {
                                data.threads.map(thread => (
                                    <Link 
                                        href={{
                                            pathname: '/thread',
                                            query: { id: thread.id }
                                        }}
                                        key={thread.id}
                                    >
                                        <a>{thread.title}</a>
                                    </Link>
                                ))
                            }
                            </div>
                        )
                        
                    }}
                </Query>
            </div>
        );
    }
}

export default Threads;