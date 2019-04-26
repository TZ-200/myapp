import Vtubers from '../components/Vtubers'

const VtubersPage = props => (
    <div>
        <Vtubers page={parseFloat(props.query.page) || 1}/>
    </div>
)

export default VtubersPage