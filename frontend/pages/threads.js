import Threads from '../components/Threads'

const ThreadsPage = props => (
    <div>
        <Threads page={parseFloat(props.query.page) || 1}/>
    </div>
)

export default ThreadsPage