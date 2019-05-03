import FollowingThreads from '../components/FollowingThreads'

const Home = props => (
    <div>
        <FollowingThreads page={parseFloat(props.query.page) || 1}/>
    </div>
)

export default Home