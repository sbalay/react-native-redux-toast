Object.defineProperty(exports,"__esModule",{value:true});exports.default=








reducer;var _actions=require('./actions');var defaultState={message:null,error:false,warning:false,duration:null};function reducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:defaultState;var action=arguments[1];
switch(action.type){
case _actions.actions.HIDE:
case _actions.actions.DISPLAY_ERROR:
case _actions.actions.DISPLAY_WARNING:
case _actions.actions.DISPLAY_INFO:{
return{
message:action.payload.message,
duration:action.payload.duration,
error:action.type===_actions.actions.DISPLAY_ERROR,
warning:action.type===_actions.actions.DISPLAY_WARNING};

}
default:{
return state;
}}

}