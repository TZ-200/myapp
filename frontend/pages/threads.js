import FollowingThreads from '../components/FollowingThreads'

const ThreadsPage = props => (
    <div>
        <FollowingThreads page={parseFloat(props.query.page) || 1}/>
    </div>
)

export default ThreadsPage