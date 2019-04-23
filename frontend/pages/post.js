import CreateThread from '../components/CreateThread'
import PleaseSignIn from '../components/PleaseSignin'

const Post = props => (
        <PleaseSignIn>
                <CreateThread  page={parseFloat(props.query.page) || 1}/>
        </PleaseSignIn>
)

export default Post