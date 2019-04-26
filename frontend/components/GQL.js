import gql from 'graphql-tag'
import { threadPerPage, vtuberPerPage } from '../config'

const THREADS_QUERY = gql`
    query THREADS_QUERY(
        $skip: Int = 0,
        $first: Int = ${threadPerPage}
        $vtuberIds: [ID!]
    ){
        threads (
            first: $first,
            skip: $skip,
            orderBy: updatedAt_DESC
            where: {
                vtuber: {
                    id_in: $vtuberIds
                }
            }
        ){
            id
            title
            image
            comments{
                id
            }
            vtuber{
                id
                name
            }
        }
    }
`


const VTUBERS_QUERY = gql`
    query VTUBERS_QUERY(
        $skip: Int = 0,
        $first: Int = ${vtuberPerPage}
    ){
        vtubers (
            first: $first,
            skip: $skip,
            orderBy: createdAt_DESC
        ){
            id
            name
            channelId
            image
        }
    }
`

const CREATE_THREAD = gql`
    mutation CREATE_THREAD (
        $title: String!,
        $text: String!,
        $image: String,
        $vtuber: ID!
    ) {
        createThread (
            title: $title,
            text: $text,
            image: $image,
            vtuber: $vtuber
        ){
            id
        }
    }
`

const CREATE_FOLLOW = gql`
    mutation CREATE_FOLLOW (
        $vtuber: ID!
    ){
        createFollow (
            vtuber: $vtuber
        ){
            id
        }
    }
`

const DELETE_FOLLOW = gql`
    mutation DELETE_FOLLOW (
        $vtuber: ID!
    ){
        deleteFollow (
            vtuber: $vtuber
        ){
            id
        }
    }
`

const CREATE_VTUBER = gql`
    mutation CREATE_VTUBER (
        $name: String!,
        $image: String!,
        $channelId: String!
    ) {
        createVtuber (
            name: $name,
            image: $image,
            channelId: $channelId
        ){
            id
        }
    }
`

const SIGNUP = gql`
    mutation SIGNUP (
        $name: String!,
        $email: String!,
        $password: String!
    ) {
        signup (
            name: $name,
            email: $email,
            password: $password
        ){
            id
            email
        }
    }
`

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            name
            email
            description
            image
            follows{
                id
                name
            }
            Threads{
                id
                title
            }
            Comments {
                id
                thread{
                    id
                }
                text
                upvotes{
                    id
                }
            }
        }
    }
`

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`



const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION (
        $email: String!,
        $password: String!
    ) {
        signin (
            email: $email,
            password: $password
        ){
            id
            email
        }
    }
`
const SINGLE_THREAD_QUERY = gql`
    query SINGLE_THREAD_QUERY($id: ID!){
        thread(
            where: {
                id: $id
            }
        ){
            id
            title
            text
            image
            vtuber{
                id
                name
            }
            comments{
                id
                text
                author{
                    id
                    name
                }
                upvotes{
                    id
                    author{
                        id
                    }
                }
                reply{
                    id
                }
                depth
            }
        }
    }
`

const SINGLE_VTUBER_QUERY = gql`
    query SINGLE_VTUBER_QUERY(
            $id: ID!,
            $skip: Int = 0,
            $first: Int = ${threadPerPage}
    ){
        vtuber(
            where: {
                id: $id
            }
        ){
            id
            name
            channelId
            image
            threads(
                orderBy: updatedAt_DESC,
                first: $first,
                skip: $skip
            ){
                id
                title
                image
            }
        }
    }
`

const CREATE_COMMENT = gql`
    mutation CREATE_COMMENT(
        $text: String!
        $thread: ID!
        $reply: ID
    ){
        createComment(
            text: $text
            thread: $thread
            reply: $reply
        ){
            id
            text
        }
    }
`


const CREATE_UPVOTE = gql`
    mutation CREATE_UPVOTE(
        $author: ID!
        $Comment: ID!
    ){
        createUpvote(
            authorId: $author
            commentId: $Comment
        ){
            id
        }
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation DELETE_COMMENT_MUTATION(
        $id: ID!
    ){
        deleteComment(
            id: $id
        ){
            id
        }
    }
`
const DELETE_THREAD_MUTATION = gql`
    mutation DELETE_THREAD_MUTATION(
        $id: ID!
    ){
        deleteThread(
            id: $id
        ){
            id
        }
    }
`

const DELETE_UPVOTE_MUTATION = gql`
    mutation DELETE_UPVOTE_MUTATION(
        $id: ID!
    ){
        deleteUpvote(
            id: $id
        ){
            id
        }
    }
`

const CHECK_THREAD_PERMISSION_MUTATION = gql`
    mutation CHECK_THREAD_PERMISSION_MUTATION(
        $id: ID!       
    ){
        checkThreadPermission(
            id: $id
        ){
            message
        }
    }
`

const UPDATE_THREAD_MUTATION = gql`
    mutation UPDATE_THREAD_MUTATION(
        $id: ID!
        $title: String!
        $text: String!
        $image: String 
    ){
        updateThread(
            id: $id
            title: $title
            text: $text
            image: $image
        ){
            id
        }
    }
`

const UPDATE_USER_MUTATION = gql`
    mutation UPDATE_USER_MUTATION(
        $name: String
        $image: String
        $description: String
    ){
        updateUser(
            name: $name
            image: $image
            description: $description
        ){
            id
        }
    }
`

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY (
        $vtuberIds: [ID!]
    ) {
        threadsConnection (
            where: {
                vtuber: {
                    id_in: $vtuberIds
                }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`
const PAGINATION_VTUBERS_QUERY = gql`
    query PAGINATION_VTUBERS_QUERY {
        vtubersConnection {
            aggregate {
                count
            }
        }
    }
`

export { 
    THREADS_QUERY, 
    CREATE_THREAD, SIGNUP, 
    CURRENT_USER_QUERY,
    SIGNOUT_MUTATION, 
    SIGNIN_MUTATION, 
    SINGLE_THREAD_QUERY,
    CREATE_COMMENT,
    DELETE_COMMENT_MUTATION,
    DELETE_THREAD_MUTATION,
    UPDATE_THREAD_MUTATION,
    CHECK_THREAD_PERMISSION_MUTATION,
    CREATE_UPVOTE,
    DELETE_UPVOTE_MUTATION,
    PAGINATION_QUERY,
    UPDATE_USER_MUTATION,
    CREATE_VTUBER,
    VTUBERS_QUERY,
    SINGLE_VTUBER_QUERY,
    CREATE_FOLLOW,
    DELETE_FOLLOW,
    PAGINATION_VTUBERS_QUERY,
}