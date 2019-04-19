import Link from 'next/link'
import Nav from './Nav'
import Router from 'next/router'
import Nprogress from 'nprogress'

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
    <div>
            <Link href="/">
                <a>CC</a>
            </Link>    
        <Nav/>

    </div>


            
        

)

export default Header