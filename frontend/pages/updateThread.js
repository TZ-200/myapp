import UpdateThread from '../components/UpdateThread'
import PleaseSignIn from '../components/PleaseSignin'
import DeleteThread from '../components/DeleteThread'

const Post = props => (
        <PleaseSignIn>
                <DeleteThread  id={props.query.id}/>
                <UpdateThread  id={props.query.id}/>
        </PleaseSignIn>
)

export default Post