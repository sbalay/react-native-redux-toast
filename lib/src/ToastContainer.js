Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require('react-redux');

var _Toast=require('./Toast');var _Toast2=_interopRequireDefault(_Toast);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){return store.toast;};exports.default=

(0,_reactRedux.connect)(mapStateToProps)(_Toast2.default);