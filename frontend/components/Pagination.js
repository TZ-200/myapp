import React from 'react'
import { Query } from 'react-apollo'
import { threadPerPage } from '../config'
import Head from 'next/head'
import Link from 'next/link'
import { PAGINATION_QUERY } from './GQL'
import PaginationStyles from './styles/PaginationStyles'

/**
 * <Link>のprefetch
 * ⇒ devモードでは意味なし
 * ⇒ prodでは、遷移先のページをpre-render＆pre-loadingしてくれる⇒スナッピーな遷移に！
 */
const Pagination = props => (
        <Query query={PAGINATION_QUERY}>
            {({data, loading, error }) => {
                if(loading) return <p>Loading...</p>
                const count = data.threadsConnection.aggregate.count
                const pages = Math.ceil(count / threadPerPage)
                const page = props.page
                return (
                        <PaginationStyles>
                            <Head>
                                <title>Threads! - Page {page} of {pages}</title>
                            </Head>
                            <Link 
                                prefetch
                                href={{
                                    pathname: 'threads',
                                    query: { page: page - 1 }
                                }}
                            >
                                <a className="prev" aria-disabled={page <= 1}>← Prev</a>
                            </Link>
                            <p>Page {props.page} of {pages}!</p>
                            <p>{count} Threads Total</p>
                            <Link 
                                prefetch
                                href={{
                                    pathname: 'threads',
                                    query: { page: page + 1 }
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