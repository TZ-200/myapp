import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { CREATE_COMMENT, SINGLE_THREAD_QUERY } from './GQL'


class CreateComment extends Component {
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
                    thread: this.props.thread
                }}
                refetchQueries={() => {
                    return[{
                        query: SINGLE_THREAD_QUERY,
                        variables: { id: this.props.thread }
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
                            document.querySelector('.comment__post--main').value = ""
                        }}
                    >

                        <fieldset 
                            disabled={loading} 
                            aria-busy={loading}
                            style={{
                                border: 'none',
                                marginLeft: '2rem',
                                marginRight: '2rem',
                                padding: '0',
                            }}
                        >
                            <label htmlFor="comment">
                                <textarea 
                                    className="comment__post--main"
                                    type="text" 
                                    id="comment" 
                                    name="comment" 
                                    placeholder="Post a Comment..." 
                                    required 
                                    onChange={this.handleChange}
                                    style={{
                                        height: '80px',
                                        width: 'calc(100% - 140px)',
                                        resize: 'none',
                                        marginRight: '20px',
                                    padding: '1rem',
                                    borderRadius: '5px'
                                    }} 
                                />
                            </label>
                            <button 
                                type="submit"
                                style={{
                                    textDecoration: 'none',
                                    padding: '1.2rem 4rem',
                                    display: 'inline-block',
                                    borderRadius: '5px',
                                    backgroundColor: loading ?  'rgb(238, 238, 238)' : 'rgb(160, 196, 255)',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '1rem',
                                    transform: 'translateY(-1.6rem)',
                                    cursor: 'pointer',
                                }}
                            >
                                コメント
                            </button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default CreateComment;