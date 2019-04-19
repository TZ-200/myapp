import CreateThread from '../components/CreateThread'
import PleaseSignIn from '../components/PleaseSignin'

const Post = props => (
        <PleaseSignIn>
                <CreateThread/>
        </PleaseSignIn>
)

export default Post