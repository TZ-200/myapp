import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { THREADS_QUERY } from './GQL'
import Link from 'next/link'
import ThreadPagination from './ThreadPagination'
import { threadPerPage } from '../config';
import User from './User'
import ThreadStyles from './styles/ThreadStyles'
import AccountOnThreadsStyles from './styles/AccountOnThreadsStyles'
import SignupReco from './styles/SignupReco'

const styles = {
    mainArea : {
        display: 'grid',
        gridTemplateColumns: '1fr 208px',
        width: '1084px',
    }
}


class FollowingThreads extends Component {
    render() {
        return (
            <div className="mainArea" style={styles.mainArea}>
                <User>
                    {({data: { me }}) => {
                        let vtuberIds = undefined
                        if(me) vtuberIds = me.follows.map(follow => follow.id)
                        return(
                            <React.Fragment>
                            <Query 
                                query={THREADS_QUERY}
                                variables={{
                                    skip: this.props.page * threadPerPage - threadPerPage,
                                    first: threadPerPage,
                                    vtuberIds
                                }}    
                            >
                                { ({ data, error, loading }) => {
                                    if(loading) return <p>Loading...</p>
                                    if(error) return <p>Error: {error.message}</p>
                                    return (
                                        <div>
                                        {
                                            data.threads.map(thread => (
                                                <div key={thread.id} style={{backgroundColor:"#fff", marginTop:'20px'}}>
                                                    <Link 
                                                        href={{
                                                            pathname: '/thread',
                                                            query: { id: thread.id }
                                                        }}
                                                    >
                                                        <a>
                                                            <ThreadStyles>
                                                                <div className="thread__left"/>
                                                                <div className="thread__contents">
                                                                    <div className="thread__content--top">
                                                                        <img width="40" height="40" src={thread.vtuber.image} alt="Vtuber Image" className="thread__content--vtuberImage"/>
                                                                        <div className="thread__title">{thread.title}</div> 
                                                                    </div>
                                                                    <div className="thread__text">{thread.text.length >= 90 ? thread.text.slice(0,90) + '[...]' : thread.text}</div>
                                                                    <div className="thread__meta">コメント({thread.comments.length})　　投稿日:</div>
                                                                </div>
                                                                {thread.image && <img width="244" height="135" src={thread.image} className="thread__image" alt="Thread Image"/>}
                                                            </ThreadStyles>
                                                        </a>
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    )
                                    
                                }}
                            </Query>
                            { me ? 
                                (
                                    <AccountOnThreadsStyles>
                                        <img src={me.image}  width="100" height="100" />
                                        <div>{me.name}</div>
                                        <div>スレッド投稿</div>
                                    </AccountOnThreadsStyles>
                                ) : (
                                    <SignupReco>
                                        <div>スレッドの投稿 / Vtuberの登録にはユーザ登録が必要となります</div>
                                        <div>ユーザ登録</div>
                                    </SignupReco>
                                )
                            }

                            <ThreadPagination page={this.props.page} vtuberIds={vtuberIds} path={'threads'}/>
                            </React.Fragment>
                        )
                    }}
                </User>

            </div>
        );
    }
}

export default FollowingThreads;