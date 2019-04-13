Object.defineProperty(exports,"__esModule",{value:true});var actions=exports.actions={
DISPLAY_ERROR:'@@TOAST/DISPLAY_ERROR',
DISPLAY_WARNING:'@@TOAST/DISPLAY_WARNING',
DISPLAY_INFO:'@@TOAST/DISPLAY_INFO',
HIDE:'@@TOAST/HIDE'};


var toastAction=function toastAction(message,duration,type){return{
type:type,
payload:{
message:message,
duration:duration}};};



var actionCreators=exports.actionCreators={
hide:function hide(){
return{
type:actions.HIDE,
payload:{}};

},
displayError:function displayError(message){var duration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4000;
return toastAction(message,duration,actions.DISPLAY_ERROR);
},
displayWarning:function displayWarning(message){var duration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4000;
return toastAction(message,duration,actions.DISPLAY_WARNING);
},
displayInfo:function displayInfo(message){var duration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4000;
return toastAction(message,duration,actions.DISPLAY_INFO);
}};