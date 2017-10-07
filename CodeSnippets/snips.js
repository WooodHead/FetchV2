import React from 'react'
// GQL
import { gql, graphql } from 'react-apollo'
// Redux
import { connect, compose } from 'react-redux'
import { bindActionCreators } from 'redux'
// Redux actions if needed
import { doReduxStuff } from '../../redux/filterActions'

class reactClass extends React.Component {

  constructor (props) {
    super(props)
  }

  onClick = (e) => {
    e.preventDefault()
    // dispatch a Redux action
    this.props.action.doReduxStuff({params: 'test'})
  }

  render () {
    // Note: no GQL code here for simplification
    return (
      <div>
        <h1>Data from Redux: {this.props.yourData}</h1>
        <button onClick={this.onClick}>Test Redux</button>
      </div>
    )
  }
}

// You may need to pay attention here
const reduxWrapper = connect(
  // I think this is what you are looking for
  state => ({
    yourData: state.yourData
  }),
  // You can also map dispatch to props
  dispatch => ({
    actions: {
      doReduxStuff: bindActionCreators(doReduxStuff, dispatch),
    }
  }))

// Apollo!
const query = gql`
  query users($id: Int!) {
    users(id: $id) {
      id
      name
    }
  }
`

const gqlWrapper = graphql(query, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.id,
    }
  }),
})

// `compose` makes wrapping component much easier and cleaner
export default compose(
  reduxWrapper,
  gqlWrapper,
)(reactClass)





let geoResult = {}
addressComponents.forEach(e => e.types.forEach(t => Object.assign(geoResult, {[t]: e.long_name})))
})