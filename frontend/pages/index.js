import Threads from '../components/Threads'

const Home = props => (
    <div>
        <Threads page={parseFloat(props.query.page) || 1}/>
    </div>
)

export default Home