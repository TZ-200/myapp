import gql from 'graphql-tag'
import { threadPerPage } from '../config'

const THREADS_QUERY = gql`
    query THREADS_QUERY(
        $skip: Int = 0,
        $first: Int = ${threadPerPage}
    ){
        threads (
            first: $first,
            skip: $skip,
            orderBy: createdAt_DESC
        ){
            id
            title
        }
    }
`

const CREATE_THREAD = gql`
    mutation CREATE_THREAD (
        $title: String!,
        $text: String!,
        $image: String
    ) {
        createThread (
            title: $title,
            text: $text,
            image: $image,
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
            }
        }
    }
`

const CREATE_COMMENT = gql`
    mutation CREATE_COMMENT(
        $text: String!
        $thread: ID!
    ){
        createComment(
            text: $text
            thread: $thread
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
    query PAGINATION_QUERY {
        threadsConnection {
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
}