import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CREATE_COMMENT, SINGLE_THREAD_QUERY } from './GQL'


class CreateReply extends Component {
    state = {}

    handleChange = (e) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val})
    }

    render() {
        return (
            <Mutation 
                mutation={CREATE_COMMENT}
                variables={{
                    text: this.state.comment,
                    thread: this.props.threadId,
                    reply: this.props.commentId
                }}
                refetchQueries={() => {
                    return[{
                        query: SINGLE_THREAD_QUERY,
                        variables: { id: this.props.threadId }
                    }]
                }}
            >
                {(createComment, { loading, error }) => (

                    <form 
                        method="post" 
                        onSubmit={ async e => {
                            e.preventDefault()                            
                            const res = await createComment()
                            this.setState({comment:""})
                        }}
                    >

                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="comment">
                                Comment
                                <input 
                                    type="text" 
                                    id="comment" 
                                    name="comment" 
                                    placeholder="comment" 
                                    required 
                                    onChange={this.handleChange} 
                                />
                            </label>
                            <button type="submit">投稿</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default CreateReply;