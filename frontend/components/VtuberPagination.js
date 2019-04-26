import React from 'react'
import { Query } from 'react-apollo'
import { vtuberPerPage } from '../config'
import Head from 'next/head'
import Link from 'next/link'
import { PAGINATION_VTUBERS_QUERY } from './GQL'
import PaginationStyles from './styles/PaginationStyles'

/**
 * <Link>のprefetch
 * ⇒ devモードでは意味なし
 * ⇒ prodでは、遷移先のページをpre-render＆pre-loadingしてくれる⇒スナッピーな遷移に！
 */
const Pagination = props => (
        <Query 
            query={PAGINATION_VTUBERS_QUERY}
        >
            {({data, loading, error }) => {
                if(loading) return <p>Loading...</p>
                const count = data.vtubersConnection.aggregate.count
                const pages = Math.ceil(count / vtuberPerPage)
                const page = props.page
                return (
                        <PaginationStyles>
                            <Head>
                                <title>Vtubers! - Page {page} of {pages}</title>
                            </Head>
                            <Link 
                                prefetch
                                href={{
                                    pathname: `/${props.path}`,
                                    query: {
                                        page: page - 1,
                                    }
                                }}
                            >
                                <a className="prev" aria-disabled={page <= 1}>← Prev</a>
                            </Link>
                            <p>Page {props.page} of {pages}!</p>
                            <p>{count} Vtubers Total</p>
                            <Link 
                                prefetch
                                href={{
                                    pathname: `/${props.path}`,
                                    query: {
                                        page: page + 1,
                                    }
                                }}
                            >
                                <a className="prev" aria-disabled={page >= pages}>Next →</a>
                            </Link>
                        </PaginationStyles>
                    )
            }}
        </Query>
)

export default Pagination