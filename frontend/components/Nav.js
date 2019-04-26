import Link from 'next/link'
import User from './User'
import Signout from './Signout'

const Nav = () => (
    <User>
        {({data: { me }}) => (
            <React.Fragment>
                <Link href="/">
                    <a>All</a>
                </Link>
                <Link href="/threads">
                    <a>Home</a>
                </Link>
                { me && (
                    <React.Fragment>
                        <Link href="/account">
                            <a>Account</a>
                        </Link>
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                        <Link href="/vtubers">
                            <a>Vtubers</a>
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