import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { VTUBERS_QUERY, PAGINATION_VTUBERS_QUERY } from './GQL'
import Link from 'next/link'
import VtuberPagination from './VtuberPagination'
import { vtuberPerPage } from '../config';

class Vtubers extends Component {
    render() {
        return (
            <div>
            <VtuberPagination page={this.props.page} path={'vtubers'} />
                <Query 
                    query={VTUBERS_QUERY}
                    variables={{
                        skip: this.props.page * vtuberPerPage - vtuberPerPage,
                        first: vtuberPerPage 
                    }}    
                >
                    { ({ data, error, loading }) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return (
                            <div>
                            {
                                data.vtubers.map(vtuber => (
                                    <div key={vtuber.id}>
                                    <Link 
                                        href={{
                                            pathname: '/vtuber',
                                            query: { id: vtuber.id }
                                        }}
                                        
                                    >
                                        
                                        <a>
                                            <div>{vtuber.name}</div> 
                                            <div><img width="200" height="200" style={{objectFit:'cover'}} src={vtuber.image} alt="Vtuber Image"/></div>
                                            <div>{vtuber.followers && vtuber.followers.length}</div> 
                                        </a>
                                        
                                    </Link>
                                    </div>
                                ))
                            }
                            </div>
                        )
                        
                    }}
                </Query>
            <VtuberPagination page={this.props.page} path={'vtubers'} />

            </div>
        );
    }
}

export default Vtubers;