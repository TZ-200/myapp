import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Error from './ErrorMessage'
import Router from 'next/router'
import { CREATE_THREAD, THREADS_QUERY } from './GQL'
import { threadPerPage } from '../config';

class CreateThread extends Component {
    
    state = {}

    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

  render() {
    return (
        <Mutation 
            mutation={CREATE_THREAD}
            variables={this.state}
            refetchQueries={() => {     // これでキャッシュ内のデータが更新されるのでリロードしなくて済む
                return[{
                    query : THREADS_QUERY,
                    variables: {
                        skip: this.props.page * threadPerPage - threadPerPage,
                        first: threadPerPage 
                     }
                }]
            }}
        >
            {(createThread, { loading, error }) => (

                <form 
                    method="post" 
                    onSubmit={ async e => {
                        e.preventDefault()
                        const res = await createThread()
                        Router.push({
                            pathname: '/thread',
                            query: { id: res.data.createThread.id }
                        })
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
                        />
                    </label>

                    <button type="submit">投稿</button>
                </fieldset>
                </form>
            )}
        </Mutation>
    );
  }
}

export default CreateThread