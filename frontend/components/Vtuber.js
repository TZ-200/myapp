import React, { Component } from 'react';
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import { SINGLE_VTUBER_QUERY } from './GQL'
import Link from 'next/link'
import CreateFollow from './CreateFollow'
import { threadPerPage } from '../config';
import ThreadPagination from './ThreadPagination'


class Vtuber extends Component {

    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

    render() {
        return (
                    <Query 
                        query={SINGLE_VTUBER_QUERY} 
                        variables={{
                            id: this.props.id,
                            skip: this.props.page * threadPerPage - threadPerPage,
                            first: threadPerPage,
                        }}
                    >
                        {({ error, loading, data}) => {
                            if(error) return <Error error={error} />
                            if(loading) return <p>Loading...</p>
                            if(!data.vtuber) return <p>No Vtuber Found for {this.props.id}</p>
                            const vtuber = data.vtuber
                            const threads = vtuber.threads
                            
                            return(
                                <React.Fragment>
                                    <h2>{vtuber.name}</h2>
                                    <CreateFollow vtuberId={this.props.id}/>
                                    <img width="200" height="200" style={{objectFit:'cover'}} src={vtuber.image} alt="Vtuber Image"/>
                                    <Link 
                                        href={{
                                            pathname: '/post',
                                            query: { id: vtuber.id }
                                        }}
                                    >
                                        <a>Post</a>
                                    </Link>
                                    <ThreadPagination page={this.props.page} vtuberIds={[this.props.id]} id={this.props.id} path={'vtuber'}/>

                                    { threads && threads.map(thread => (
                                        <p>
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
                                    <ThreadPagination page={this.props.page} vtuberIds={[this.props.id]} id={this.props.id} path={'vtuber'}/>

                                </React.Fragment>
                            )
                        }}
                    </Query>
        );
    }
}

export default Vtuber;