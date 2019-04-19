import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './GQL'
import PropTypes from 'prop-types'

const User = props => (
    <Query
        {...props}
        query={CURRENT_USER_QUERY}
    >
        {payload => props.children(payload)}
    </Query>
)

User.propTypes = {
    children: PropTypes.func.isRequired
}

export default User