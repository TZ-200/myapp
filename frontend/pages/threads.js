import FollowingThreads from '../components/FollowingThreads'
import PleaseSignIn from '../components/PleaseSignin'


const ThreadsPage = props => (
    <PleaseSignIn>
        <FollowingThreads page={parseFloat(props.query.page) || 1}/>
    </PleaseSignIn>
)

export default ThreadsPage