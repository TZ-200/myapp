import FollowingThreads from '../components/FollowingThreads'
import PleaseSignIn from '../components/PleaseSignin'


const ThreadsPage = props => (
        <FollowingThreads page={parseFloat(props.query.page) || 1}/>
)

export default ThreadsPage