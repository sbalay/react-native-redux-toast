Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');

var _Toast=require('./Toast.styles');var _Toast2=_interopRequireDefault(_Toast);

var _actions=require('./redux/actions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var ViewPropTypes=_reactNative.ViewPropTypes||_reactNative.View.propTypes;var

Toast=function(_Component){_inherits(Toast,_Component);function Toast(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Toast);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Toast.__proto__||Object.getPrototypeOf(Toast)).call.apply(_ref,[this].concat(args))),_this),_this.
state={
fadeAnimation:new _reactNative.Animated.Value(0),
shadowOpacity:new _reactNative.Animated.Value(0),
present:false,
message:'',
dismissTimeout:null},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Toast,[{key:'UNSAFE_componentWillReceiveProps',value:function UNSAFE_componentWillReceiveProps(


nextProps){var _this2=this;var
message=nextProps.message,error=nextProps.error,duration=nextProps.duration,warning=nextProps.warning;
if(message){
var dismissTimeout=setTimeout(function(){
_this2.props.dispatch(_actions.actionCreators.hide());
},duration);
clearTimeout(this.state.dismissTimeout);
this.show(message,{error:error,warning:warning,dismissTimeout:dismissTimeout});
}else{
this.hide();
}
}},{key:'show',value:function show(

message,_ref2){var _this3=this;var error=_ref2.error,warning=_ref2.warning,dismissTimeout=_ref2.dismissTimeout;
this.setState(
{
present:true,
fadeAnimation:new _reactNative.Animated.Value(0),
shadowOpacity:new _reactNative.Animated.Value(0),
message:message,
error:error,
warning:warning,
dismissTimeout:dismissTimeout},

function(){
_reactNative.Animated.timing(_this3.state.fadeAnimation,{toValue:1,useNativeDriver:true}).start();
_reactNative.Animated.timing(_this3.state.shadowOpacity,{toValue:0.5,useNativeDriver:true}).start();
});

}},{key:'hide',value:function hide()

{var _this4=this;
_reactNative.Animated.timing(this.state.shadowOpacity,{toValue:0,useNativeDriver:true}).start();
_reactNative.Animated.timing(this.state.fadeAnimation,{toValue:0,useNativeDriver:true}).start(function(){
_this4.setState({present:false,message:null,error:false,warning:false,dismissTimeout:null});
});
}},{key:'render',value:function render()

{
if(!this.state.present){
return null;
}

var messageStyles=[_Toast2.default.messageContainer,this.props.containerStyle];
if(this.state.error){
messageStyles.push(_Toast2.default.error,this.props.errorStyle);
}else if(this.state.warning){
messageStyles.push(_Toast2.default.warning,this.props.warningStyle);
}
return(
_react2.default.createElement(_reactNative.Animated.View,{
style:[
_Toast2.default.shadow,
_Toast2.default.container,
this.props.customToastStyle,
{opacity:this.state.fadeAnimation,shadowOpacity:this.state.shadowOpacity}],

pointerEvents:'none'},

_react2.default.createElement(_reactNative.View,{style:messageStyles},
this.props.getMessageComponent(this.state.message,{
error:this.state.error,
warning:this.state.warning}))));




}}]);return Toast;}(_react.Component);exports.default=Toast;


Toast.defaultProps={
getMessageComponent:function getMessageComponent(message){
return(
_react2.default.createElement(_reactNative.Text,{style:this.messageStyle},
message));


}};


Toast.propTypes={
containerStyle:ViewPropTypes.style,
customToastStyle:ViewPropTypes.style,
message:_propTypes2.default.string,
messageStyle:_reactNative.Text.propTypes.style,
error:_propTypes2.default.bool,
errorStyle:ViewPropTypes.style,
warning:_propTypes2.default.bool,
warningStyle:ViewPropTypes.style,
duration:_propTypes2.default.number,
getMessageComponent:_propTypes2.default.func};