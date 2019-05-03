import Link from 'next/link'
import User from './User'
import Signout from './Signout'
import NavStyles from './styles/NavStyles'

const Nav = () => (
    <User>
        {({data: { me }}) => (
            <NavStyles>
                <Link href="/threads">
                    <a>ホーム</a>
                </Link> 
                { me && (
                    <React.Fragment>
 
                        <Link href="/vtubers">
                            <a>Vtuber一覧</a>
                        </Link>  
                        <Link href="/register">
                            <a>チャンネル登録</a>
                        </Link>
                        <Link href="/account">
                            <a>アカウント</a>
                        </Link>
                        <Signout/>
                    </React.Fragment>
                )}

                { !me && (
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                )}
            </NavStyles>
        )}
    </User>       
)

export default Nav