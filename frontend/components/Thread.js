import React, { Component } from 'react';
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import { SINGLE_THREAD_QUERY } from './GQL'
import CreateComment from './CreateComment'
import Comment from './Comment'
import User from './User'
import CheckUpdateThread from './CheckUpdateThread'
import flatten from '../lib/flatten'
import ThreadDetailStyles from './styles/ThreadDetailStyles'
import CreateFollow from './CreateFollow'
import AccountOnThreadsStyles from './styles/AccountOnThreadsStyles'
import SignupReco from './styles/SignupReco'
import Link from 'next/link'
import uniqid from 'uniqid'

class Thread extends Component {

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
                            const thread = data.thread
                            let comments = data.thread.comments
                            
                            // コメントを投稿が古い順に　かつ　返信も考慮してネストさせる（簡単な例はflatten.jsに記載）
                            let nestedComments = comments.reverse().reduce((result,comment) => {
                                if (!comment.replies) {
                                    comment.replies = comments.filter(r => {
                                        if(r.reply) { return r.reply.id == comment.id }
                                        else { return false }
                                    }).reverse();
                                }
                                if (comment.reply == null) {
                                    result.push(comment);
                                }
                                return result;
                            },[]).reverse();  
                            
                            return(
                                <User>
                                {({data: { me }}) => (

                                <ThreadDetailStyles>

                                <div>
                                    <div></div>
                                    <img src={thread.vtuber.image}/>
                                    <div className="thread__vtuberHead--name">{thread.vtuber.name}</div>
                                    { me && <CreateFollow vtuberId={thread.vtuber.id}/>}
                                    
                                    <a href={`https://www.youtube.com/channel/${thread.vtuber.channelId}`}>
                                        <svg>
                                            <use xlinkHref="../static/youtube-logotype.svg#Capa_1"></use>
                                        </svg>
                                    </a>

                                    </div>
                                
                                <div>
                                    <div>
                                        <div className="thread__detail--title">{thread.title}</div>
                                        <div  className="thread__detail--meta">投稿日　　投稿者　　{ me && <CheckUpdateThread threadId={thread.id}/> }</div>
                                        <img className="thread__detail--image" src={thread.image}/>
                                        <div className="thread__detail--text">{thread.text.split("\n").map(el => <span key={uniqid()}>{el}<br/></span>)}</div>
                                        <div className="thread__detail--mainCreateComment">
                                            <CreateComment  thread={this.props.id} />
                                        </div>
                                        <div className="thread__detail--comments">
                                            {comments && nestedComments.map(comment => {
                                                const flatComments = flatten(comment)
                                                const dispComments = flatComments.map(flatComment => <Comment threadId={this.props.id} comment={flatComment} key={flatComment.id}/>)
                                                return dispComments
                                            })}
                                        </div>
                                    </div>
                                    { me ? 
                                        (
                                            <AccountOnThreadsStyles>
                                                <img src={me.image}  width="100" height="100" />
                                                <div>{me.name}</div>
                                                    <Link 
                                                            href={{
                                                                pathname: '/post',
                                                                query: { id: thread.vtuber.id },
                                                            }}
                                                        >
                                                        <a><div className='thread__post'>スレッド投稿</div></a>
                                                    </Link>    
                                            </AccountOnThreadsStyles>
                                        ) : (
                                            <SignupReco>
                                                <div>スレッドの投稿 / Vtuberの登録にはユーザ登録が必要となります</div>
                                                <div>ユーザ登録</div>
                                            </SignupReco>
                                        )
                                    }
                                </div>
                                
                                </ThreadDetailStyles>
                                )}
                                </User>
                            )
                        }}
                    </Query>
        );
    }
}


/**
 * 
 * 
 * 
 * 
<h2>Title: {thread.title} Text: {thread.text} Vtuber:{thread.vtuber.name}</h2>
<p>{thread.image && <img  src={thread.image} alt="Thread Image"/>}</p>
<User>
    {({data: { me }}) => (
        <React.Fragment>
            { me && <CheckUpdateThread threadId={thread.id}/> }
        </React.Fragment>
    )}
</User> 

<CreateComment  thread={this.props.id} />

{comments && nestedComments.map(comment => {
    const flatComments = flatten(comment)
    const dispComments = flatComments.map(flatComment => <Comment threadId={this.props.id} comment={flatComment} key={flatComment.id}/>)
    return dispComments
})}


 * 
 */

export default Thread;