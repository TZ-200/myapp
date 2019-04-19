import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from './GQL'
import Router from 'next/router'


class Signin extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }
    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    /**
     * refetchQueries ⇒ 本命のクエリが成功したら続けて行われるクエリ
     */
    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signin, { error, loading }) => {
                    return (
                        <form
                            method="post"   // defaultでGETなので必ずPOSTに（URL履歴にパスワード残っちゃうよ！）
                            onSubmit={ async e => {
                                e.preventDefault()
                                await signin()
                                this.setState({ name: '', email: '', password: '' })
                                Router.push({
                                    pathname: '/'
                                })
                            }}
                        >
                            <fieldset 
                                disabled={loading}
                                aria-busy={loading}
                            >
                                <h2>Sign Into your Account</h2>
                                <Error error={error}/>
                                <label htmlFor="email">
                                    Email
                                    <input 
                                        type="email" 
                                        name = "email"
                                        placeholder="email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                               
                                <label htmlFor="password">
                                    Password
                                    <input 
                                        type="password" 
                                        name = "password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Sign In!</button>
                            </fieldset>
                        </form>
                    )           
                }}
            </Mutation>
        );
    }
}

export default Signin;