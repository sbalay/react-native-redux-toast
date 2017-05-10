import { connect } from 'react-redux';

import Toast from './Toast';

const mapStateToProps = store => store.toast;

export default connect(mapStateToProps)(Toast);
