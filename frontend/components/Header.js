import Link from 'next/link'
import Nav from './Nav'
import Router from 'next/router'
import Nprogress from 'nprogress'
import HeaderStyles from './styles/HeaderStyles'

Router.onRouteChangeStart = () => {
    Nprogress.start()
}
Router.onRouteChangeComplete = () => {
    Nprogress.done()
}
Router.onRouteChangeError = () => {
    Nprogress.done()
}

const Header = () => (
    <HeaderStyles>
        <div>
            <Link href="/">
                <a>VTBASE</a>
            </Link>    
            <Nav/>
        </div>
    </HeaderStyles>
)

export default Header