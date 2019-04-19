import Link from 'next/link'
import User from './User'
import Signout from './Signout'

const Nav = () => (
    <User>
        {({data: { me }}) => (
            <React.Fragment>
                <Link href="/">
                    <a>Index</a>
                </Link>
                <Link href="/threads">
                    <a>Threads</a>
                </Link>
                { me && (
                    <React.Fragment>
                        <Link href="/post">
                            <a>Post</a>
                        </Link>
                        <Link href="/account">
                            <a>Account</a>
                        </Link>
                        <Signout/>
                    </React.Fragment>
                )}

                { !me && (
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                )}
            </React.Fragment>
        )}
    </User>       
)

export default Nav