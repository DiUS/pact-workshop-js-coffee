import { connect } from 'react-redux'

import App from '../components/App'

const AppContainer = connect(
  ({ selected }) => selected
)(App)

export default AppContainer
