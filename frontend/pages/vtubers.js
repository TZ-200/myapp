import Vtubers from '../components/Vtubers'
import PleaseSignIn from '../components/PleaseSignin'

const VtubersPage = props => (
    <PleaseSignIn>
        <Vtubers page={parseFloat(props.query.page) || 1}/>
    </PleaseSignIn>
)

export default VtubersPage