import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions';
import App from '../App';

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);