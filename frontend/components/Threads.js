import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { THREADS_QUERY } from './GQL'
import Link from 'next/link'
import ThreadPagination from './ThreadPagination'
import { threadPerPage } from '../config';
import ThreadStyles from './styles/ThreadStyles'

const styles = {
    mainArea : {
        display: 'grid',
        gridTemplateColumns: '1fr 208px',
        width: '1084px',
    }
}

class Threads extends Component {
    render() {
        return (
            <div className="mainArea" style={styles.mainArea}>
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
                                    <ThreadStyles key={thread.id}>
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
                                    </ThreadStyles>
                                ))
                            }
                                <ThreadPagination page={this.props.page}/>
                            </div>
                        )
                        
                    }}
                </Query>
                <div className="Account">
                    Account
                </div>
            </div>
        );
    }
}

export default Threads;