import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'
import Error from './ErrorMessage'
import Router from 'next/router'
import { UPDATE_THREAD_MUTATION, SINGLE_THREAD_QUERY } from './GQL'


class UpdateThread extends Component {
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
                    return (
                        
                        <Mutation 
                            mutation={UPDATE_THREAD_MUTATION}
                            variables={{...this.state, id: this.props.id}}
                        >

                            {(updateThread, { loading, error }) => {
                                return(
                                    <form 
                                        method="post" 
                                        onSubmit={ async e => {
                                            e.preventDefault()              
                                            await this.setState({
                                                text: document.querySelector(".inputText").value,
                                                title: document.querySelector(".inputTitle").value
                                            })                              
                                            const res = await updateThread()
                                            Router.push({
                                                pathname: '/thread',
                                                query: { id: res.data.updateThread.id }
                                            }).then(() => location.reload())
                                        }}
                                    >
                                        <Error error={error} /> 

                                        <fieldset disabled={loading} aria-busy={loading}>
                                            <label htmlFor="title">
                                                Title
                                                <input 
                                                    type="text" 
                                                    id="title" 
                                                    name="title" 
                                                    placeholder="Title" 
                                                    required 
                                                    onChange={this.handleChange} 
                                                    defaultValue={data.thread.title}
                                                    className="inputTitle"
                                                />
                                            </label>
                                        
                                            <label htmlFor="text">
                                                Text
                                                <input 
                                                    type="text" 
                                                    id="text" 
                                                    name="text" 
                                                    placeholder="text" 
                                                    required 
                                                    onChange={this.handleChange} 
                                                    defaultValue={data.thread.text}
                                                    className="inputText"
                                                />
                                            </label>

                                            <button type="submit">更新</button>
                                        </fieldset>
                                    </form>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

export default UpdateThread;