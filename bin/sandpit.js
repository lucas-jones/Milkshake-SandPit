(function ($hx_exports) { "use strict";
$hx_exports.milkshake = $hx_exports.milkshake || {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var SandPit = $hx_exports.SandPit = function() { };
SandPit.__name__ = ["SandPit"];
SandPit.main = function() {
};
SandPit.boot = function() {
	var milkshake1 = milkshake.Milkshake.boot();
	milkshake1.scenes.addScene(new scenes.PolygonScene());
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe = {};
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.CallStack = function() { };
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.TypeTools = function() { };
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass;
	if(js.Boot.__instanceof(value,Class)) valueClass = value; else valueClass = Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe.ds.StringMap
};
haxe.exception = {};
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) {
	if(null == message) this.message = "Unknown exception"; else this.message = message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype = {
	generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe.CallStack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = Type.getClass(this);
		while(haxe.exception.Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,get_baseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,toString: function() {
		return this.message + haxe.CallStack.toString(this.stackTraceArray);
	}
	,__class__: haxe.exception.Exception
	,__properties__: {get_baseException:"get_baseException"}
};
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException.prototype = $extend(haxe.exception.Exception.prototype,{
	__class__: haxe.exception.ArgumentNullException
});
var hsl = {};
hsl.haxe = {};
hsl.haxe.Bond = function() {
	this.halted = false;
};
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype = {
	destroy: function() {
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,halt: function() {
		this.halted = true;
	}
	,resume: function() {
		this.halted = false;
	}
	,__class__: hsl.haxe.Bond
};
hsl.haxe.Signaler = function() { };
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype = {
	__class__: hsl.haxe.Signaler
	,__properties__: {get_isListenedTo:"get_isListenedTo"}
};
hsl.haxe.DirectSignaler = function(subject,rejectNullData) {
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
};
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
hsl.haxe.DirectSignaler.prototype = {
	addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,bind: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,bindVoid: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,bubble: function(data,origin) {
		if(null != this.bubblingTargets) {
			var $it0 = this.bubblingTargets.iterator();
			while( $it0.hasNext() ) {
				var bubblingTarget = $it0.next();
				bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
		if(null != this.notificationTargets) {
			var $it1 = this.notificationTargets.iterator();
			while( $it1.hasNext() ) {
				var notificationTarget = $it1.next();
				notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
	}
	,dispatch: function(data,origin,positionInformation) {
		if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) this.verifyCaller(positionInformation);
		if(this.rejectNullData && null == data) throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
		if(null == origin) origin = this.subject; else origin = origin;
		if(this.mostRecentPropagationUndisturbed = 3 == this.sentinel.callListener(data,this.subject,origin,3)) {
			if(null != this.bubblingTargets) {
				var $it0 = this.bubblingTargets.iterator();
				while( $it0.hasNext() ) {
					var bubblingTarget = $it0.next();
					bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
			if(null != this.notificationTargets) {
				var $it1 = this.notificationTargets.iterator();
				while( $it1.hasNext() ) {
					var notificationTarget = $it1.next();
					notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
		}
	}
	,get_isListenedTo: function() {
		return this.sentinel.get_isConnected();
	}
	,getOrigin: function(origin) {
		if(null == origin) return this.subject; else return origin;
	}
	,verifyCaller: function(positionInformation) {
		if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
		var $it0 = this.subjectClassNames.iterator();
		while( $it0.hasNext() ) {
			var subjectClassName = $it0.next();
			if(subjectClassName == positionInformation.className) return;
		}
		throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,unbindVoid: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,__class__: hsl.haxe.DirectSignaler
	,__properties__: {get_isListenedTo:"get_isListenedTo"}
};
hsl.haxe._DirectSignaler = {};
hsl.haxe._DirectSignaler.LinkedBond = function() {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
};
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
hsl.haxe._DirectSignaler.LinkedBond.prototype = $extend(hsl.haxe.Bond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,determineEquals: function(value) {
		return false;
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,__class__: hsl.haxe._DirectSignaler.LinkedBond
});
hsl.haxe._DirectSignaler.SentinelBond = function() {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
};
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,get_isConnected: function() {
		return this.next != this;
	}
	,remove: function(value) {
		var node = this.next;
		while(node != this) {
			if(node.determineEquals(value)) {
				if(false == node.destroyed) {
					node.previous.next = node.next;
					node.next.previous = node.previous;
					node.destroyed = true;
				}
				break;
			}
			node = node.next;
		}
	}
	,__class__: hsl.haxe._DirectSignaler.SentinelBond
	,__properties__: {get_isConnected:"get_isConnected"}
});
hsl.haxe._DirectSignaler.RegularBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.RegularBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener(data);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.RegularBond
});
hsl.haxe._DirectSignaler.NiladicBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.NiladicBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener();
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.NiladicBond
});
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.AdvancedBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(this.halted == false) {
			var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
			this.listener(signal);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
			if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.AdvancedBond
});
hsl.haxe.PropagationStatus = function() { };
hsl.haxe.PropagationStatus.__name__ = ["hsl","haxe","PropagationStatus"];
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype = {
	get_data1: function() {
		return this.data;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,stopPropagation: function() {
		this.propagationStopped = true;
	}
	,__class__: hsl.haxe.Signal
	,__properties__: {get_data1:"get_data1"}
};
var hxcollision = {};
hxcollision.Collision = function() {
	throw "Collision is a static class. No instances can be created.";
};
hxcollision.Collision.__name__ = ["hxcollision","Collision"];
hxcollision.Collision.test = function(shape1,shape2) {
	return shape1.test(shape2);
};
hxcollision.Collision.testShapes = function(shape1,shapes) {
	var results = [];
	var _g = 0;
	while(_g < shapes.length) {
		var other_shape = shapes[_g];
		++_g;
		var result = hxcollision.Collision.test(shape1,other_shape);
		if(result != null) results.push(result);
	}
	return results;
};
hxcollision.Collision.rayShape = function(ray,shape) {
	return shape.testRay(ray);
};
hxcollision.Collision.rayShapes = function(ray,shapes) {
	var results = new Array();
	var _g = 0;
	while(_g < shapes.length) {
		var shape = shapes[_g];
		++_g;
		var r = shape.testRay(ray);
		if(r != null) results.push(r);
	}
	return results;
};
hxcollision.Collision.rayRay = function(ray1,ray2) {
	return hxcollision.Collision2D.rayRay(ray1,ray2);
};
hxcollision.Collision.rayRays = function(ray,rays) {
	var results = new Array();
	var _g = 0;
	while(_g < rays.length) {
		var ray2 = rays[_g];
		++_g;
		var r = hxcollision.Collision2D.rayRay(ray,ray2);
		if(r != null) results.push(r);
	}
	return results;
};
hxcollision.Collision.pointInPoly = function(point,poly) {
	var sides = poly.get_transformedVertices().length;
	var i = 0;
	var j = sides - 1;
	var oddNodes = false;
	var _g = 0;
	while(_g < sides) {
		var i1 = _g++;
		if(poly.get_transformedVertices()[i1].y < point.y && poly.get_transformedVertices()[j].y >= point.y || poly.get_transformedVertices()[j].y < point.y && poly.get_transformedVertices()[i1].y >= point.y) {
			if(poly.get_transformedVertices()[i1].x + (point.y - poly.get_transformedVertices()[i1].y) / (poly.get_transformedVertices()[j].y - poly.get_transformedVertices()[i1].y) * (poly.get_transformedVertices()[j].x - poly.get_transformedVertices()[i1].x) < point.x) oddNodes = !oddNodes;
		}
		j = i1;
	}
	return oddNodes;
};
hxcollision.Collision.prototype = {
	__class__: hxcollision.Collision
};
hxcollision.Collision2D = function() {
	throw "Collision2D is a static class. No instances can be created.";
};
hxcollision.Collision2D.__name__ = ["hxcollision","Collision2D"];
hxcollision.Collision2D.testCircleVsPolygon = function(circle,polygon,flip) {
	var test1;
	var test2;
	var test;
	var min1 = 0;
	var max1 = 1073741823;
	var min2 = 0;
	var max2 = 1073741823;
	var normalAxis = new hxcollision.math.Vector();
	var offset;
	var vectorOffset = new hxcollision.math.Vector();
	var vectors;
	var shortestDistance = 1073741823;
	var collisionData = new hxcollision.data.CollisionData();
	var distMin;
	var distance = -1;
	var testDistance = 1073741823;
	var closestVector = new hxcollision.math.Vector();
	vectorOffset = new hxcollision.math.Vector(-circle.get_x(),-circle.get_y());
	var _this = polygon.get_transformedVertices();
	vectors = _this.slice();
	if(vectors.length == 2) {
		var temp = new hxcollision.math.Vector(-(vectors[1].y - vectors[0].y),vectors[1].x - vectors[0].x);
		temp.truncate(0.0000000001);
		vectors.push(vectors[1].clone().add(temp));
	}
	var _g1 = 0;
	var _g = vectors.length;
	while(_g1 < _g) {
		var i = _g1++;
		distance = (circle.get_x() - vectors[i].x) * (circle.get_x() - vectors[i].x) + (circle.get_y() - vectors[i].y) * (circle.get_y() - vectors[i].y);
		if(distance < testDistance) {
			testDistance = distance;
			closestVector.x = vectors[i].x;
			closestVector.y = vectors[i].y;
		}
	}
	normalAxis = new hxcollision.math.Vector(closestVector.x - circle.get_x(),closestVector.y - circle.get_y());
	normalAxis.normalize();
	min1 = normalAxis.dot(vectors[0]);
	max1 = min1;
	var _g11 = 1;
	var _g2 = vectors.length;
	while(_g11 < _g2) {
		var j = _g11++;
		test = normalAxis.dot(vectors[j]);
		if(test < min1) min1 = test;
		if(test > max1) max1 = test;
	}
	max2 = circle.get_transformedRadius();
	min2 -= circle.get_transformedRadius();
	offset = normalAxis.dot(vectorOffset);
	min1 += offset;
	max1 += offset;
	test1 = min1 - max2;
	test2 = min2 - max1;
	if(test1 > 0 || test2 > 0) return null;
	distMin = -(max2 - min1);
	if(flip) distMin *= -1;
	if(Math.abs(distMin) < shortestDistance) {
		collisionData.unitVector = normalAxis;
		collisionData.overlap = distMin;
		shortestDistance = Math.abs(distMin);
	}
	var _g12 = 0;
	var _g3 = vectors.length;
	while(_g12 < _g3) {
		var i1 = _g12++;
		normalAxis = hxcollision.math.Common.findNormalAxis(vectors,i1);
		min1 = normalAxis.dot(vectors[0]);
		max1 = min1;
		var _g31 = 1;
		var _g21 = vectors.length;
		while(_g31 < _g21) {
			var j1 = _g31++;
			test = normalAxis.dot(vectors[j1]);
			if(test < min1) min1 = test;
			if(test > max1) max1 = test;
		}
		max2 = circle.get_transformedRadius();
		min2 = -circle.get_transformedRadius();
		offset = normalAxis.dot(vectorOffset);
		min1 += offset;
		max1 += offset;
		test1 = min1 - max2;
		test2 = min2 - max1;
		if(test1 > 0 || test2 > 0) return null;
		distMin = -(max2 - min1);
		if(flip) distMin *= -1;
		if(Math.abs(distMin) < shortestDistance) {
			collisionData.unitVector = normalAxis;
			collisionData.overlap = distMin;
			shortestDistance = Math.abs(distMin);
		}
	}
	if(flip) collisionData.shape2 = polygon; else collisionData.shape2 = circle;
	if(flip) collisionData.shape1 = circle; else collisionData.shape1 = polygon;
	collisionData.separation = new hxcollision.math.Vector(-collisionData.unitVector.x * collisionData.overlap,-collisionData.unitVector.y * collisionData.overlap);
	if(flip) collisionData.unitVector.invert();
	return collisionData;
};
hxcollision.Collision2D.testCircles = function(circle1,circle2) {
	var totalRadius = circle1.get_transformedRadius() + circle2.get_transformedRadius();
	var distanceSquared = (circle1.get_x() - circle2.get_x()) * (circle1.get_x() - circle2.get_x()) + (circle1.get_y() - circle2.get_y()) * (circle1.get_y() - circle2.get_y());
	if(distanceSquared < totalRadius * totalRadius) {
		var difference = totalRadius - Math.sqrt(distanceSquared);
		var collisionData = new hxcollision.data.CollisionData();
		collisionData.shape1 = circle1;
		collisionData.shape2 = circle2;
		collisionData.unitVector = new hxcollision.math.Vector(circle1.get_x() - circle2.get_x(),circle1.get_y() - circle2.get_y());
		collisionData.unitVector.normalize();
		collisionData.separation = new hxcollision.math.Vector(collisionData.unitVector.x * difference,collisionData.unitVector.y * difference);
		collisionData.overlap = collisionData.separation.get_length();
		return collisionData;
	}
	return null;
};
hxcollision.Collision2D.testPolygons = function(polygon1,polygon2,flip) {
	if(flip == null) flip = false;
	var result1 = hxcollision.Collision2D.checkPolygons(polygon1,polygon2,flip);
	if(result1 == null) return null;
	var result2 = hxcollision.Collision2D.checkPolygons(polygon2,polygon1,!flip);
	if(result2 == null) return null;
	if(Math.abs(result1.overlap) < Math.abs(result2.overlap)) return result1; else return result2;
};
hxcollision.Collision2D.checkPolygons = function(polygon1,polygon2,flip) {
	var test1;
	var test2;
	var testNum;
	var min1;
	var max1;
	var min2;
	var max2;
	var axis;
	var offset;
	var vectors1;
	var vectors2;
	var shortestDistance = 1073741823;
	var collisionData = new hxcollision.data.CollisionData();
	var _this = polygon1.get_transformedVertices();
	vectors1 = _this.slice();
	var _this1 = polygon2.get_transformedVertices();
	vectors2 = _this1.slice();
	if(vectors1.length == 2) {
		var temp = new hxcollision.math.Vector(-(vectors1[1].y - vectors1[0].y),vectors1[1].x - vectors1[0].x);
		temp.truncate(0.0000000001);
		vectors1.push(vectors1[1].add(temp));
	}
	if(vectors2.length == 2) {
		var temp1 = new hxcollision.math.Vector(-(vectors2[1].y - vectors2[0].y),vectors2[1].x - vectors2[0].x);
		temp1.truncate(0.0000000001);
		vectors2.push(vectors2[1].add(temp1));
	}
	var _g1 = 0;
	var _g = vectors1.length;
	while(_g1 < _g) {
		var i = _g1++;
		axis = hxcollision.math.Common.findNormalAxis(vectors1,i);
		min1 = axis.dot(vectors1[0]);
		max1 = min1;
		var _g3 = 1;
		var _g2 = vectors1.length;
		while(_g3 < _g2) {
			var j = _g3++;
			testNum = axis.dot(vectors1[j]);
			if(testNum < min1) min1 = testNum;
			if(testNum > max1) max1 = testNum;
		}
		min2 = axis.dot(vectors2[0]);
		max2 = min2;
		var _g31 = 1;
		var _g21 = vectors2.length;
		while(_g31 < _g21) {
			var j1 = _g31++;
			testNum = axis.dot(vectors2[j1]);
			if(testNum < min2) min2 = testNum;
			if(testNum > max2) max2 = testNum;
		}
		test1 = min1 - max2;
		test2 = min2 - max1;
		if(test1 > 0 || test2 > 0) return null;
		var distMin = -(max2 - min1);
		if(flip) distMin *= -1;
		if(Math.abs(distMin) < shortestDistance) {
			collisionData.unitVector = axis;
			collisionData.overlap = distMin;
			shortestDistance = Math.abs(distMin);
		}
	}
	if(flip) collisionData.shape1 = polygon2; else collisionData.shape1 = polygon1;
	if(flip) collisionData.shape2 = polygon1; else collisionData.shape2 = polygon2;
	collisionData.separation = new hxcollision.math.Vector(-collisionData.unitVector.x * collisionData.overlap,-collisionData.unitVector.y * collisionData.overlap);
	if(flip) collisionData.unitVector.invert();
	return collisionData;
};
hxcollision.Collision2D.rayCircle = function(ray,circle) {
	var delta = ray.end.clone().subtract(ray.start);
	var ray2circle = ray.start.clone().subtract(circle.get_position());
	var a = delta.get_lengthsq();
	var b = 2 * delta.dot(ray2circle);
	var c = ray2circle.dot(ray2circle) - circle.get_radius() * circle.get_radius();
	var d = b * b - 4 * a * c;
	if(d >= 0) {
		d = Math.sqrt(d);
		var t1 = (-b - d) / (2 * a);
		var t2 = (-b + d) / (2 * a);
		if(ray.isInfinite || t1 <= 1.0) return new hxcollision.data.RayData(circle,ray,t1,t2);
	}
	return null;
};
hxcollision.Collision2D.rayPolygon = function(ray,polygon) {
	var delta = ray.end.clone().subtract(ray.start);
	var vertices = polygon.get_transformedVertices();
	var min_u = Math.POSITIVE_INFINITY;
	var max_u = 0.0;
	if(vertices.length > 2) {
		var v1 = vertices[vertices.length - 1];
		var v2 = vertices[0];
		var r = hxcollision.Collision2D.intersectRayRay(ray.start,delta,v1,v2.clone().subtract(v1));
		if(r != null && r.ub >= 0.0 && r.ub <= 1.0) {
			if(r.ua < min_u) min_u = r.ua;
			if(r.ua > max_u) max_u = r.ua;
		}
		var _g1 = 1;
		var _g = vertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			v1 = vertices[i - 1];
			v2 = vertices[i];
			r = hxcollision.Collision2D.intersectRayRay(ray.start,delta,v1,v2.clone().subtract(v1));
			if(r != null && r.ub >= 0.0 && r.ub <= 1.0) {
				if(r.ua < min_u) min_u = r.ua;
				if(r.ua > max_u) max_u = r.ua;
			}
		}
		if(ray.isInfinite || min_u <= 1.0) return new hxcollision.data.RayData(polygon,ray,min_u,max_u);
	}
	return null;
};
hxcollision.Collision2D.intersectRayRay = function(a,adelta,b,bdelta) {
	var dx = a.clone().subtract(b);
	var d = bdelta.y * adelta.x - bdelta.x * adelta.y;
	if(d == 0.0) return null;
	var ua = (bdelta.x * dx.y - bdelta.y * dx.x) / d;
	var ub = (adelta.x * dx.y - adelta.y * dx.x) / d;
	return { ua : ua, ub : ub};
};
hxcollision.Collision2D.rayRay = function(ray1,ray2) {
	var delta1 = ray1.end.clone().subtract(ray1.start);
	var delta2 = ray2.end.clone().subtract(ray2.start);
	var dx = ray1.start.clone().subtract(ray2.start);
	var d = delta2.y * delta1.x - delta2.x * delta1.y;
	if(d == 0.0) return null;
	var u1 = (delta2.x * dx.y - delta2.y * dx.x) / d;
	var u2 = (delta1.x * dx.y - delta1.y * dx.x) / d;
	if((ray1.isInfinite || u1 <= 1.0) && (ray2.isInfinite || u2 <= 1.0)) return new hxcollision.data.RayIntersectionData(ray1,u1,ray2,u2);
	return null;
};
hxcollision.Collision2D.bresenhamLine = function(start,end) {
	var points = [];
	var steep = Math.abs(end.y - start.y) > Math.abs(end.x - start.x);
	var swapped = false;
	if(steep) {
		start = hxcollision.Collision2D.swap(start.x,start.y);
		end = hxcollision.Collision2D.swap(end.x,end.y);
	}
	if(start.x > end.x) {
		var t = start.x;
		start.x = end.x;
		end.x = t;
		t = start.y;
		start.y = end.y;
		end.y = t;
		swapped = true;
	}
	var deltax = end.x - start.x;
	var deltay = Math.abs(end.y - start.y);
	var error = deltax / 2;
	var ystep;
	var y = start.y;
	if(start.y < end.y) ystep = 1; else ystep = -1;
	var x = start.x | 0;
	var _g1 = start.x | 0;
	var _g = end.x | 0;
	while(_g1 < _g) {
		var x1 = _g1++;
		if(steep) points.push(new hxcollision.math.Vector(y,x1)); else points.push(new hxcollision.math.Vector(x1,y));
		error -= deltay;
		if(error < 0) {
			y += ystep;
			error += deltax;
		}
	}
	if(swapped) points.reverse();
	return points;
};
hxcollision.Collision2D.swap = function(a,b) {
	var t = a;
	a = b;
	b = t;
	return new hxcollision.math.Vector(a,b);
};
hxcollision.Collision2D.prototype = {
	__class__: hxcollision.Collision2D
};
hxcollision.ShapeDrawer = function() {
};
hxcollision.ShapeDrawer.__name__ = ["hxcollision","ShapeDrawer"];
hxcollision.ShapeDrawer.prototype = {
	drawLine: function(p0,p1,startPoint) {
		if(startPoint == null) startPoint = true;
	}
	,drawShape: function(shape) {
		if(js.Boot.__instanceof(shape,hxcollision.shapes.Polygon)) {
			this.drawPolygon(js.Boot.__cast(shape , hxcollision.shapes.Polygon));
			return;
		} else {
			this.drawCircle(js.Boot.__cast(shape , hxcollision.shapes.Circle));
			return;
		}
	}
	,drawPolygon: function(poly) {
		var v;
		var _this = poly.get_transformedVertices();
		v = _this.slice();
		this.drawVertList(v);
	}
	,drawVector: function(v,start,startPoint) {
		if(startPoint == null) startPoint = true;
		this.drawLine(start,v);
	}
	,drawCircle: function(circle) {
		var _smooth = 10;
		var _steps = Std["int"](_smooth * Math.sqrt(circle.get_transformedRadius()));
		var theta = 6.2831852 / _steps;
		var tangential_factor = Math.tan(theta);
		var radial_factor = Math.cos(theta);
		var x = circle.get_transformedRadius();
		var y = 0;
		var _verts = [];
		var _g = 0;
		while(_g < _steps) {
			var i = _g++;
			var __x = x + circle.get_x();
			var __y = y + circle.get_y();
			_verts.push(new hxcollision.math.Vector(__x,__y));
			var tx = -y;
			var ty = x;
			x += tx * tangential_factor;
			y += ty * tangential_factor;
			x *= radial_factor;
			y *= radial_factor;
		}
		this.drawVertList(_verts);
	}
	,drawVertList: function(_verts) {
		var _count = _verts.length;
		if(_count < 3) throw "cannot draw polygon with < 3 verts as this is a line or a point.";
		this.drawLine(_verts[0],_verts[1],true);
		var _g1 = 1;
		var _g = _count - 1;
		while(_g1 < _g) {
			var i = _g1++;
			this.drawLine(_verts[i],_verts[i + 1],false);
		}
		this.drawLine(_verts[_count],_verts[0],false);
	}
	,__class__: hxcollision.ShapeDrawer
};
hxcollision.data = {};
hxcollision.data.CollisionData = function() {
	this.overlap = 0;
	this.separation = new hxcollision.math.Vector();
	this.unitVector = new hxcollision.math.Vector();
};
hxcollision.data.CollisionData.__name__ = ["hxcollision","data","CollisionData"];
hxcollision.data.CollisionData.prototype = {
	__class__: hxcollision.data.CollisionData
};
hxcollision.data.RayData = function(shape,ray,start,end) {
	this.shape = shape;
	this.ray = ray;
	this.start = start;
	this.end = end;
};
hxcollision.data.RayData.__name__ = ["hxcollision","data","RayData"];
hxcollision.data.RayData.prototype = {
	__class__: hxcollision.data.RayData
};
hxcollision.data.RayIntersectionData = function(ray1,u1,ray2,u2) {
	this.ray1 = ray1;
	this.ray2 = ray2;
	this.u1 = u1;
	this.u2 = u2;
};
hxcollision.data.RayIntersectionData.__name__ = ["hxcollision","data","RayIntersectionData"];
hxcollision.data.RayIntersectionData.prototype = {
	__class__: hxcollision.data.RayIntersectionData
};
hxcollision.math = {};
hxcollision.math.Common = function() { };
hxcollision.math.Common.__name__ = ["hxcollision","math","Common"];
hxcollision.math.Common.findNormalAxis = function(vertices,index) {
	var vector1 = vertices[index];
	var vector2;
	if(index >= vertices.length - 1) vector2 = vertices[0]; else vector2 = vertices[index + 1];
	var normalAxis = new hxcollision.math.Vector(-(vector2.y - vector1.y),vector2.x - vector1.x);
	normalAxis.normalize();
	return normalAxis;
};
hxcollision.math.Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this._last_rotation = 0;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
hxcollision.math.Matrix.__name__ = ["hxcollision","math","Matrix"];
hxcollision.math.Matrix.prototype = {
	identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,translate: function(x,y) {
		this.tx += x;
		this.ty += y;
	}
	,compose: function(_position,_rotation,_scale) {
		var _diff = _rotation - this._last_rotation;
		this.identity();
		this.scale(_scale.x,_scale.y);
		this.rotate(_diff);
		this.makeTranslation(_position.x,_position.y);
		this._last_rotation = _rotation;
	}
	,makeTranslation: function(_x,_y) {
		this.tx = _x;
		this.ty = _y;
		return this;
	}
	,rotate: function(angle) {
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(x,y) {
		this.a *= x;
		this.b *= y;
		this.c *= x;
		this.d *= y;
		this.tx *= x;
		this.ty *= y;
	}
	,toString: function() {
		return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
	}
	,__class__: hxcollision.math.Matrix
};
hxcollision.math.Vector = function(_x,_y) {
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.y = 0;
	this.x = 0;
	this.x = _x;
	this.y = _y;
};
hxcollision.math.Vector.__name__ = ["hxcollision","math","Vector"];
hxcollision.math.Vector.prototype = {
	clone: function() {
		return new hxcollision.math.Vector(this.x,this.y);
	}
	,transform: function(matrix) {
		var v = this.clone();
		v.x = this.x * matrix.a + this.y * matrix.c + matrix.tx;
		v.y = this.x * matrix.b + this.y * matrix.d + matrix.ty;
		return v;
	}
	,set_length: function(value) {
		var _angle = Math.atan2(this.y,this.x);
		this.x = Math.cos(_angle) * value;
		this.y = Math.sin(_angle) * value;
		if(Math.abs(this.x) < 0.00000001) this.x = 0;
		if(Math.abs(this.y) < 0.00000001) this.y = 0;
		return value;
	}
	,get_length: function() {
		return Math.sqrt(this.get_lengthsq());
	}
	,get_lengthsq: function() {
		return this.x * this.x + this.y * this.y;
	}
	,normalize: function() {
		if(this.get_length() == 0) {
			this.x = 1;
			return this;
		}
		var len = this.get_length();
		this.x /= len;
		this.y /= len;
		return this;
	}
	,truncate: function(max) {
		this.set_length(Math.min(max,this.get_length()));
		return this;
	}
	,invert: function() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	,dot: function(vector2) {
		return this.x * vector2.x + this.y * vector2.y;
	}
	,cross: function(vector2) {
		return this.x * vector2.y - this.y * vector2.x;
	}
	,add: function(vector2) {
		this.x += vector2.x;
		this.y += vector2.y;
		return this;
	}
	,subtract: function(vector2) {
		this.x -= vector2.x;
		this.y -= vector2.y;
		return this;
	}
	,toString: function() {
		return "Vector x:" + this.x + ", y:" + this.y;
	}
	,__class__: hxcollision.math.Vector
	,__properties__: {get_lengthsq:"get_lengthsq",set_length:"set_length",get_length:"get_length"}
};
hxcollision.shapes = {};
hxcollision.shapes.Shape = function(_x,_y) {
	this._transformed = false;
	this._scaleY = 1;
	this._scaleX = 1;
	this._rotation_radians = 0;
	this._rotation = 0;
	this.name = "shape";
	this.active = true;
	this.tags = new haxe.ds.StringMap();
	this._position = new hxcollision.math.Vector(_x,_y);
	this._scale = new hxcollision.math.Vector(1,1);
	this._rotation = 0;
	this._scaleX = 1;
	this._scaleY = 1;
	this._transformMatrix = new hxcollision.math.Matrix();
	this._transformMatrix.makeTranslation(this._position.x,this._position.y);
};
hxcollision.shapes.Shape.__name__ = ["hxcollision","shapes","Shape"];
hxcollision.shapes.Shape.prototype = {
	test: function(shape) {
		return null;
	}
	,testCircle: function(circle,flip) {
		if(flip == null) flip = false;
		return null;
	}
	,testPolygon: function(polygon,flip) {
		if(flip == null) flip = false;
		return null;
	}
	,testRay: function(ray) {
		return null;
	}
	,destroy: function() {
		this._position = null;
		this._scale = null;
		this._transformMatrix = null;
	}
	,refresh_transform: function() {
		this._transformMatrix.rotate(this._rotation_radians);
		this._transformMatrix.compose(this._position,this._rotation,this._scale);
		this._transformed = false;
	}
	,get_position: function() {
		return this._position;
	}
	,set_position: function(v) {
		this._position = v;
		this.refresh_transform();
		return this._position;
	}
	,get_x: function() {
		return this._position.x;
	}
	,set_x: function(x) {
		this._position.x = x;
		this.refresh_transform();
		return this._position.x;
	}
	,get_y: function() {
		return this._position.y;
	}
	,set_y: function(y) {
		this._position.y = y;
		this.refresh_transform();
		return this._position.y;
	}
	,get_rotation: function() {
		return this._rotation;
	}
	,set_rotation: function(v) {
		this._rotation_radians = v * (Math.PI / 180);
		this.refresh_transform();
		return this._rotation = v;
	}
	,get_scaleX: function() {
		return this._scaleX;
	}
	,set_scaleX: function(scale) {
		this._scaleX = scale;
		this._scale.x = this._scaleX;
		this.refresh_transform();
		return this._scaleX;
	}
	,get_scaleY: function() {
		return this._scaleY;
	}
	,set_scaleY: function(scale) {
		this._scaleY = scale;
		this._scale.y = this._scaleY;
		this.refresh_transform();
		return this._scaleY;
	}
	,__class__: hxcollision.shapes.Shape
	,__properties__: {set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_rotation:"set_rotation",get_rotation:"get_rotation",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_position:"set_position",get_position:"get_position"}
};
hxcollision.shapes.Circle = function(x,y,radius) {
	hxcollision.shapes.Shape.call(this,x,y);
	this._radius = radius;
	this.name = "circle " + this._radius;
};
hxcollision.shapes.Circle.__name__ = ["hxcollision","shapes","Circle"];
hxcollision.shapes.Circle.__super__ = hxcollision.shapes.Shape;
hxcollision.shapes.Circle.prototype = $extend(hxcollision.shapes.Shape.prototype,{
	test: function(shape) {
		return shape.testCircle(this,true);
	}
	,testCircle: function(circle,flip) {
		if(flip == null) flip = false;
		var c1;
		if(flip) c1 = circle; else c1 = this;
		var c2;
		if(flip) c2 = this; else c2 = circle;
		return hxcollision.Collision2D.testCircles(c1,c2);
	}
	,testPolygon: function(polygon,flip) {
		if(flip == null) flip = false;
		return hxcollision.Collision2D.testCircleVsPolygon(this,polygon,flip);
	}
	,testRay: function(ray) {
		return hxcollision.Collision2D.rayCircle(ray,this);
	}
	,get_radius: function() {
		return this._radius;
	}
	,get_transformedRadius: function() {
		return this._radius * this.get_scaleX();
	}
	,__class__: hxcollision.shapes.Circle
	,__properties__: $extend(hxcollision.shapes.Shape.prototype.__properties__,{get_transformedRadius:"get_transformedRadius",get_radius:"get_radius"})
});
hxcollision.shapes.Polygon = function(x,y,vertices) {
	hxcollision.shapes.Shape.call(this,x,y);
	this.name = vertices.length + "polygon";
	this._transformedVertices = new Array();
	this._vertices = vertices;
};
hxcollision.shapes.Polygon.__name__ = ["hxcollision","shapes","Polygon"];
hxcollision.shapes.Polygon.create = function(x,y,sides,radius) {
	if(radius == null) radius = 100;
	if(sides < 3) throw "Polygon - Needs at least 3 sides";
	var rotation = Math.PI * 2 / sides;
	var angle;
	var vector;
	var vertices = new Array();
	var _g = 0;
	while(_g < sides) {
		var i = _g++;
		angle = i * rotation + (Math.PI - rotation) * 0.5;
		vector = new hxcollision.math.Vector();
		vector.x = Math.cos(angle) * radius;
		vector.y = Math.sin(angle) * radius;
		vertices.push(vector);
	}
	return new hxcollision.shapes.Polygon(x,y,vertices);
};
hxcollision.shapes.Polygon.rectangle = function(x,y,width,height,centered) {
	if(centered == null) centered = true;
	var vertices = new Array();
	if(centered) {
		vertices.push(new hxcollision.math.Vector(-width / 2,-height / 2));
		vertices.push(new hxcollision.math.Vector(width / 2,-height / 2));
		vertices.push(new hxcollision.math.Vector(width / 2,height / 2));
		vertices.push(new hxcollision.math.Vector(-width / 2,height / 2));
	} else {
		vertices.push(new hxcollision.math.Vector(0,0));
		vertices.push(new hxcollision.math.Vector(width,0));
		vertices.push(new hxcollision.math.Vector(width,height));
		vertices.push(new hxcollision.math.Vector(0,height));
	}
	return new hxcollision.shapes.Polygon(x,y,vertices);
};
hxcollision.shapes.Polygon.square = function(x,y,width,centered) {
	if(centered == null) centered = true;
	return hxcollision.shapes.Polygon.rectangle(x,y,width,width,centered);
};
hxcollision.shapes.Polygon.triangle = function(x,y,radius) {
	return hxcollision.shapes.Polygon.create(x,y,3,radius);
};
hxcollision.shapes.Polygon.__super__ = hxcollision.shapes.Shape;
hxcollision.shapes.Polygon.prototype = $extend(hxcollision.shapes.Shape.prototype,{
	test: function(shape) {
		return shape.testPolygon(this,true);
	}
	,testCircle: function(circle,flip) {
		if(flip == null) flip = false;
		return hxcollision.Collision2D.testCircleVsPolygon(circle,this,flip);
	}
	,testPolygon: function(polygon,flip) {
		if(flip == null) flip = false;
		return hxcollision.Collision2D.testPolygons(this,polygon,flip);
	}
	,testRay: function(ray) {
		return hxcollision.Collision2D.rayPolygon(ray,this);
	}
	,destroy: function() {
		var _count = this._vertices.length;
		var _g = 0;
		while(_g < _count) {
			var i = _g++;
			this._vertices[i] = null;
		}
		this._transformedVertices = null;
		this._vertices = null;
		hxcollision.shapes.Shape.prototype.destroy.call(this);
	}
	,get_transformedVertices: function() {
		if(!this._transformed) {
			this._transformedVertices = new Array();
			this._transformed = true;
			var _count = this._vertices.length;
			var _g = 0;
			while(_g < _count) {
				var i = _g++;
				this._transformedVertices.push(this._vertices[i].clone().transform(this._transformMatrix));
			}
		}
		return this._transformedVertices;
	}
	,get_vertices: function() {
		return this._vertices;
	}
	,__class__: hxcollision.shapes.Polygon
	,__properties__: $extend(hxcollision.shapes.Shape.prototype.__properties__,{get_vertices:"get_vertices",get_transformedVertices:"get_transformedVertices"})
});
hxcollision.shapes.Ray = function(start,end,isInfinite) {
	if(isInfinite == null) isInfinite = true;
	this.start = start;
	this.end = end;
	this.isInfinite = isInfinite;
};
hxcollision.shapes.Ray.__name__ = ["hxcollision","shapes","Ray"];
hxcollision.shapes.Ray.prototype = {
	__class__: hxcollision.shapes.Ray
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var milkshake = {};
milkshake.Settings = function(width,height,color) {
	if(color == null) color = 16773120;
	if(height == null) height = 720;
	if(width == null) width = 1280;
	this.width = width;
	this.height = height;
	this.color = color;
};
milkshake.Settings.__name__ = ["milkshake","Settings"];
milkshake.Settings.fromMilk = function(milkFile) {
	return new milkshake.Settings();
};
milkshake.Settings.prototype = {
	__class__: milkshake.Settings
};
milkshake.Milkshake = $hx_exports.milkshake.Milkshake = function(settings) {
	this.settings = settings;
	this.stage = new PIXI.Stage(settings.color,true);
	this.scenes = new milkshake.game.scene.SceneManager();
	this.stage.addChild(this.scenes.displayObject);
};
milkshake.Milkshake.__name__ = ["milkshake","Milkshake"];
milkshake.Milkshake.getInstance = function() {
	if(milkshake.Milkshake.instance != null) return milkshake.Milkshake.instance;
	return null;
};
milkshake.Milkshake.boot = function(settings) {
	return milkshake.Milkshake.instance = new milkshake.Milkshake(settings != null?settings:new milkshake.Settings());
};
milkshake.Milkshake.prototype = {
	update: function(delta) {
		this.mousePosition = this.stage.getMousePosition();
		this.scenes.update(delta);
	}
	,__class__: milkshake.Milkshake
};
milkshake.assets = {};
milkshake.assets.SpriteSheets = function() { };
milkshake.assets.SpriteSheets.__name__ = ["milkshake","assets","SpriteSheets"];
milkshake.assets.loader = {};
milkshake.assets.loader.AssetLoader = function(urls,autoLoad) {
	if(autoLoad == null) autoLoad = false;
	this.loader = new PIXI.AssetLoader(urls);
	this.loaded = false;
	this.onLoadStarted = new hsl.haxe.DirectSignaler(this);
	this.onLoadUpdate = new hsl.haxe.DirectSignaler(this);
	this.onLoadComplete = new hsl.haxe.DirectSignaler(this);
	if(autoLoad) this.load();
};
milkshake.assets.loader.AssetLoader.__name__ = ["milkshake","assets","loader","AssetLoader"];
milkshake.assets.loader.AssetLoader.prototype = {
	load: function() {
		this.onLoadStarted.dispatch(null,this,{ fileName : "AssetLoader.hx", lineNumber : 30, className : "milkshake.assets.loader.AssetLoader", methodName : "load"});
		this.loader.onComplete = $bind(this,this.handleLoaded);
		this.loader.load();
	}
	,handleLoaded: function() {
		this.loaded = true;
		this.onLoadComplete.dispatch(null,this,{ fileName : "AssetLoader.hx", lineNumber : 40, className : "milkshake.assets.loader.AssetLoader", methodName : "handleLoaded"});
	}
	,__class__: milkshake.assets.loader.AssetLoader
};
milkshake.core = {};
milkshake.core.Node = function(id) {
	if(id == null) {
		var e = Type["typeof"](this);
		this.id = e[0];
	} else this.id = id;
	this.nodes = [];
	this.onNodeAdded = new hsl.haxe.DirectSignaler(this);
	this.onNodeRemoved = new hsl.haxe.DirectSignaler(this);
};
milkshake.core.Node.__name__ = ["milkshake","core","Node"];
milkshake.core.Node.prototype = {
	update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			node.update(deltaTime);
		}
	}
	,addNode: function(node,defaultValues) {
		node.parent = this;
		this.nodes.push(node);
		if(defaultValues != null) {
			var _g = 0;
			var _g1 = Reflect.fields(defaultValues);
			while(_g < _g1.length) {
				var key = _g1[_g];
				++_g;
				Reflect.setProperty(node,key,Reflect.field(defaultValues,key));
			}
		}
		this.onNodeAdded.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 47, className : "milkshake.core.Node", methodName : "addNode"});
	}
	,removeNode: function(node) {
		node.parent = null;
		HxOverrides.remove(this.nodes,node);
		this.onNodeRemoved.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 55, className : "milkshake.core.Node", methodName : "removeNode"});
	}
	,__class__: milkshake.core.Node
};
milkshake.core.Entity = function(id) {
	milkshake.core.Node.call(this,id);
	this.position = milkshake.math.Vector2.get_ZERO();
};
milkshake.core.Entity.__name__ = ["milkshake","core","Entity"];
milkshake.core.Entity.__super__ = milkshake.core.Node;
milkshake.core.Entity.prototype = $extend(milkshake.core.Node.prototype,{
	get_x: function() {
		return this.position.x;
	}
	,set_x: function(value) {
		return this.position.x = value;
	}
	,get_y: function() {
		return this.position.y;
	}
	,set_y: function(value) {
		return this.position.y = value;
	}
	,__class__: milkshake.core.Entity
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
});
milkshake.core.DisplayObject = function(id) {
	milkshake.core.Entity.call(this,id);
	this.scale = milkshake.math.Vector2.get_ONE();
	this.pivot = milkshake.math.Vector2.get_ONE();
	this.rotation = 0;
	this.visible = true;
	this.alpha = 1;
	this.displayObject = new PIXI.DisplayObjectContainer();
};
milkshake.core.DisplayObject.__name__ = ["milkshake","core","DisplayObject"];
milkshake.core.DisplayObject.__super__ = milkshake.core.Entity;
milkshake.core.DisplayObject.prototype = $extend(milkshake.core.Entity.prototype,{
	get_width: function() {
		return this.displayObject.width;
	}
	,get_height: function() {
		return this.displayObject.height;
	}
	,addNode: function(node,defaultValues) {
		if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
			var displayObjectNode = node;
			this.displayObject.addChild(displayObjectNode.displayObject);
			displayObjectNode.set_scene(this.get_scene());
			displayObjectNode.create();
		}
		milkshake.core.Entity.prototype.addNode.call(this,node,defaultValues);
	}
	,removeNode: function(node) {
		if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
			var displayObjectNode = node;
			this.displayObject.removeChild(displayObjectNode.displayObject);
			displayObjectNode.set_scene(null);
			displayObjectNode.destroy();
		}
		milkshake.core.Entity.prototype.removeNode.call(this,node);
	}
	,update: function(delta) {
		this.displayObject.position.x = this.position.x;
		this.displayObject.position.y = this.position.y;
		this.displayObject.scale.x = this.scale.x;
		this.displayObject.scale.y = this.scale.y;
		this.displayObject.alpha = this.alpha;
		this.displayObject.pivot.x = this.pivot.x;
		this.displayObject.pivot.y = this.pivot.y;
		this.displayObject.rotation = this.rotation;
		this.displayObject.visible = this.visible;
		this.displayObject.alpha = this.alpha;
		milkshake.core.Entity.prototype.update.call(this,delta);
	}
	,get_scene: function() {
		return this._scene;
	}
	,set_scene: function(scene) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
				var displayObjectNode = node;
				displayObjectNode.set_scene(scene);
			}
		}
		return this._scene = scene;
	}
	,create: function() {
	}
	,destroy: function() {
	}
	,__class__: milkshake.core.DisplayObject
	,__properties__: $extend(milkshake.core.Entity.prototype.__properties__,{get_height:"get_height",get_width:"get_width",set_scene:"set_scene",get_scene:"get_scene"})
});
milkshake.core.Graphics = function() {
	milkshake.core.DisplayObject.call(this);
	this.anchor = milkshake.math.Vector2.get_ZERO();
	this.displayObject.addChild(this.graphics = new PIXI.Graphics());
};
milkshake.core.Graphics.__name__ = ["milkshake","core","Graphics"];
milkshake.core.Graphics.__super__ = milkshake.core.DisplayObject;
milkshake.core.Graphics.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	update: function(delta) {
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
		this.graphics.updateBounds();
		this.displayObject.pivot.x = this.graphics.width - (1 - this.anchor.x) * this.graphics.width;
		this.displayObject.pivot.y = this.graphics.height - (1 - this.anchor.y) * this.graphics.height;
	}
	,__class__: milkshake.core.Graphics
});
milkshake.core.Sprite = function(texture,id) {
	if(id == null) id = "undefined-sprite";
	milkshake.core.DisplayObject.call(this,id);
	this.anchor = milkshake.math.Vector2.get_ZERO();
	this.displayObject.addChild(this.sprite = new PIXI.Sprite(texture));
};
milkshake.core.Sprite.__name__ = ["milkshake","core","Sprite"];
milkshake.core.Sprite.fromUrl = function(url) {
	return new milkshake.core.Sprite(PIXI.Texture.fromImage(url));
};
milkshake.core.Sprite.fromFrame = function(frame) {
	return new milkshake.core.Sprite(PIXI.Texture.fromFrame(frame));
};
milkshake.core.Sprite.__super__ = milkshake.core.DisplayObject;
milkshake.core.Sprite.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	update: function(delta) {
		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,__class__: milkshake.core.Sprite
});
milkshake.game = {};
milkshake.game.collision = {};
milkshake.game.collision.ICollidable = function() { };
milkshake.game.collision.ICollidable.__name__ = ["milkshake","game","collision","ICollidable"];
milkshake.game.collision.ICollidable.prototype = {
	__class__: milkshake.game.collision.ICollidable
};
milkshake.game.collision.CollisionDisplayObject = function(shape) {
	milkshake.core.DisplayObject.call(this);
	this.shape = shape;
};
milkshake.game.collision.CollisionDisplayObject.__name__ = ["milkshake","game","collision","CollisionDisplayObject"];
milkshake.game.collision.CollisionDisplayObject.__interfaces__ = [milkshake.game.collision.ICollidable];
milkshake.game.collision.CollisionDisplayObject.__super__ = milkshake.core.DisplayObject;
milkshake.game.collision.CollisionDisplayObject.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	update: function(delta) {
		this.shape.set_x(this.get_x());
		this.shape.set_y(this.get_y());
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,__class__: milkshake.game.collision.CollisionDisplayObject
});
milkshake.game.scene = {};
milkshake.game.scene.Scene = function(id,content,defaultCameras,clearColor) {
	if(clearColor == null) clearColor = 16711680;
	milkshake.core.DisplayObject.call(this,id);
	this.clearColor = clearColor;
	this.set_scene(this);
	this.loader = new milkshake.assets.loader.AssetLoader(content);
	this.cameras = new milkshake.game.scene.camera.CameraManager(defaultCameras);
};
milkshake.game.scene.Scene.__name__ = ["milkshake","game","scene","Scene"];
milkshake.game.scene.Scene.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.Scene.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	create: function() {
		this.addNode(milkshake.utils.GraphicsHelper.generateRectangle(milkshake.utils.Globals.SCREEN_WIDTH,milkshake.utils.Globals.SCREEN_HEIGHT,this.clearColor));
	}
	,__class__: milkshake.game.scene.Scene
});
milkshake.game.scene.SceneManager = function() {
	milkshake.core.DisplayObject.call(this,"sceneManager");
	this.scenes = new haxe.ds.StringMap();
};
milkshake.game.scene.SceneManager.__name__ = ["milkshake","game","scene","SceneManager"];
milkshake.game.scene.SceneManager.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.SceneManager.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	addScene: function(scene) {
		this.scenes.set(scene.id,scene);
		if(this.currentScene == null) this.changeScene(scene.id);
	}
	,removeScene: function(sceneId) {
		this.scenes.remove(sceneId);
	}
	,changeScene: function(sceneId) {
		var _g = this;
		if(this.currentScene != null) this.removeNode(this.currentScene.cameras);
		this.currentScene = this.scenes.get(sceneId);
		this.set_scene(this.currentScene);
		if(this.currentScene.loader.loaded) {
			this.currentScene.create();
			this.addNode(this.currentScene.cameras);
		} else {
			this.currentScene.loader.onLoadComplete.bindVoid(function() {
				_g.currentScene.create();
				_g.addNode(_g.currentScene.cameras);
			}).destroyOnUse();
			this.currentScene.loader.load();
		}
	}
	,update: function(delta) {
		if(this.currentScene.loader.loaded) this.currentScene.update(delta);
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,__class__: milkshake.game.scene.SceneManager
});
milkshake.game.scene.camera = {};
milkshake.game.scene.camera.Camera = function(x,y,width,height,renderWidth,renderHeight,active) {
	if(active == null) active = true;
	if(renderHeight == null) renderHeight = -1;
	if(renderWidth == null) renderWidth = -1;
	milkshake.core.DisplayObject.call(this);
	if(renderWidth == -1) renderWidth = milkshake.utils.Globals.SCREEN_WIDTH;
	if(renderHeight == -1) renderHeight = milkshake.utils.Globals.SCREEN_HEIGHT;
	this.set_x(x);
	this.set_y(y);
	this.width = width;
	this.height = height;
	this.renderTexture = new PIXI.RenderTexture(renderWidth,renderHeight);
	this.renderSprite = new PIXI.Sprite(this.renderTexture);
	this.renderSprite.width = width;
	this.renderSprite.height = height;
	this.targetPosition = milkshake.math.Vector2.get_ZERO();
	this.matrix = new PIXI.Matrix();
	this.displayObject.addChild(this.renderSprite);
};
milkshake.game.scene.camera.Camera.__name__ = ["milkshake","game","scene","camera","Camera"];
milkshake.game.scene.camera.Camera.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.camera.Camera.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	update: function(delta) {
		this.render();
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,render: function() {
		this.matrix.identity();
		this.matrix.translate(-this.targetPosition.x,-this.targetPosition.y);
		this.renderTexture.render(this.get_scene().displayObject,this.matrix,true);
	}
	,__class__: milkshake.game.scene.camera.Camera
});
milkshake.game.scene.camera.CameraManager = function(cameras) {
	milkshake.core.DisplayObject.call(this,"cameraManager");
	if(cameras == null) cameras = milkshake.game.scene.camera.CameraPresets.get_DEFAULT();
	this.cameras = [];
	var _g = 0;
	while(_g < cameras.length) {
		var camera = cameras[_g];
		++_g;
		this.addCamera(camera);
	}
};
milkshake.game.scene.camera.CameraManager.__name__ = ["milkshake","game","scene","camera","CameraManager"];
milkshake.game.scene.camera.CameraManager.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.camera.CameraManager.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	addCamera: function(camera) {
		this.cameras.push(camera);
		this.addNode(camera);
		return camera;
	}
	,removeCamera: function(camera) {
		HxOverrides.remove(this.cameras,camera);
	}
	,switchCameras: function(cameraA,cameraB) {
		cameraA.active = false;
		cameraB.active = true;
	}
	,get_activeCameras: function() {
		return this.cameras.filter(function(camera) {
			return camera.active;
		});
	}
	,__class__: milkshake.game.scene.camera.CameraManager
	,__properties__: $extend(milkshake.core.DisplayObject.prototype.__properties__,{get_activeCameras:"get_activeCameras"})
});
milkshake.game.scene.camera.CameraPresets = function() { };
milkshake.game.scene.camera.CameraPresets.__name__ = ["milkshake","game","scene","camera","CameraPresets"];
milkshake.game.scene.camera.CameraPresets.__properties__ = {get_SPLIT_FOUR:"get_SPLIT_FOUR",get_SPLIT_VERTICAL:"get_SPLIT_VERTICAL",get_DEFAULT:"get_DEFAULT"}
milkshake.game.scene.camera.CameraPresets.get_DEFAULT = function() {
	return [new milkshake.game.scene.camera.Camera(0,0,milkshake.utils.Globals.SCREEN_WIDTH,milkshake.utils.Globals.SCREEN_HEIGHT)];
};
milkshake.game.scene.camera.CameraPresets.get_SPLIT_VERTICAL = function() {
	return [new milkshake.game.scene.camera.Camera(0,0,milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0,milkshake.utils.Globals.SCREEN_HEIGHT),new milkshake.game.scene.camera.Camera(milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0,0,milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0,milkshake.utils.Globals.SCREEN_HEIGHT)];
};
milkshake.game.scene.camera.CameraPresets.get_SPLIT_FOUR = function() {
	var screenWidth = milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0;
	var screenHeight = milkshake.utils.Globals.SCREEN_HEIGHT / 2 | 0;
	return [new milkshake.game.scene.camera.Camera(0,0,screenWidth,screenHeight),new milkshake.game.scene.camera.Camera(screenWidth,0,screenWidth,screenHeight),new milkshake.game.scene.camera.Camera(0,screenHeight,screenWidth,screenHeight),new milkshake.game.scene.camera.Camera(screenWidth,screenHeight,screenWidth,screenHeight)];
};
milkshake.math = {};
milkshake.math.Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
milkshake.math.Vector2.__name__ = ["milkshake","math","Vector2"];
milkshake.math.Vector2.__properties__ = {get_HALF:"get_HALF",get_ONE:"get_ONE",get_ZERO:"get_ZERO"}
milkshake.math.Vector2.get_ZERO = function() {
	return new milkshake.math.Vector2(0,0);
};
milkshake.math.Vector2.get_HALF = function() {
	return new milkshake.math.Vector2(0.5,0.5);
};
milkshake.math.Vector2.get_ONE = function() {
	return new milkshake.math.Vector2(1,1);
};
milkshake.math.Vector2.EQUAL = function(value) {
	return new milkshake.math.Vector2(value,value);
};
milkshake.math.Vector2.prototype = {
	multi: function(value) {
		this.x *= value.x;
		this.y *= value.y;
	}
	,add: function(value) {
		this.x += value.x;
		this.y += value.y;
	}
	,__class__: milkshake.math.Vector2
};
milkshake.utils = {};
milkshake.utils.Color = function() { };
milkshake.utils.Color.__name__ = ["milkshake","utils","Color"];
milkshake.utils.Globals = function() { };
milkshake.utils.Globals.__name__ = ["milkshake","utils","Globals"];
milkshake.utils.Globals.__properties__ = {get_SCREEN_CENTER:"get_SCREEN_CENTER",get_SCREEN_SIZE:"get_SCREEN_SIZE"}
milkshake.utils.Globals.get_SCREEN_SIZE = function() {
	return new milkshake.math.Vector2(milkshake.utils.Globals.SCREEN_WIDTH,milkshake.utils.Globals.SCREEN_HEIGHT);
};
milkshake.utils.Globals.get_SCREEN_CENTER = function() {
	return new milkshake.math.Vector2(milkshake.utils.Globals.SCREEN_WIDTH / 2,milkshake.utils.Globals.SCREEN_HEIGHT / 2);
};
milkshake.utils.GraphicsHelper = function() { };
milkshake.utils.GraphicsHelper.__name__ = ["milkshake","utils","GraphicsHelper"];
milkshake.utils.GraphicsHelper.generateRectangle = function(width,height,color) {
	var graphics = new milkshake.core.Graphics();
	graphics.graphics.beginFill(color);
	graphics.graphics.drawRect(0,0,width,height);
	return graphics;
};
milkshake.utils.MathHelper = function() { };
milkshake.utils.MathHelper.__name__ = ["milkshake","utils","MathHelper"];
milkshake.utils.MathHelper.clamp = function(value,min,max) {
	var min1 = Math.min(min,max);
	var max1 = Math.max(min1,max);
	if(value < min1) return min1; else if(value > max1) return max1; else return value;
};
var pixi = {};
pixi.Event = function() { };
pixi.Event.__name__ = ["pixi","Event"];
pixi.Event.prototype = {
	__class__: pixi.Event
};
var scenes = {};
scenes.PolygonScene = function() {
	milkshake.game.scene.Scene.call(this,"PolygonScene",[milkshake.assets.SpriteSheets.CHARACTERS],milkshake.game.scene.camera.CameraPresets.get_DEFAULT(),1842204);
};
scenes.PolygonScene.__name__ = ["scenes","PolygonScene"];
scenes.PolygonScene.__super__ = milkshake.game.scene.Scene;
scenes.PolygonScene.prototype = $extend(milkshake.game.scene.Scene.prototype,{
	create: function() {
		milkshake.game.scene.Scene.prototype.create.call(this);
		this.displayObject.addChild(new PIXI.Strip(PIXI.Texture.fromImage("character_evil.png"),1000,1000));
	}
	,__class__: scenes.PolygonScene
});
scenes.SimpleCollisionObject = function(width,height,color) {
	if(color == null) color = 16777215;
	milkshake.game.collision.CollisionDisplayObject.call(this,hxcollision.shapes.Polygon.rectangle(0,0,width,height,false));
	this.addNode(milkshake.utils.GraphicsHelper.generateRectangle(width,height,color));
};
scenes.SimpleCollisionObject.__name__ = ["scenes","SimpleCollisionObject"];
scenes.SimpleCollisionObject.__super__ = milkshake.game.collision.CollisionDisplayObject;
scenes.SimpleCollisionObject.prototype = $extend(milkshake.game.collision.CollisionDisplayObject.prototype,{
	__class__: scenes.SimpleCollisionObject
});
scenes.PongScene = function() {
	milkshake.game.scene.Scene.call(this,"SampleScene",[milkshake.assets.SpriteSheets.CHARACTERS,milkshake.assets.SpriteSheets.TURRET],milkshake.game.scene.camera.CameraPresets.get_DEFAULT(),0);
};
scenes.PongScene.__name__ = ["scenes","PongScene"];
scenes.PongScene.__super__ = milkshake.game.scene.Scene;
scenes.PongScene.prototype = $extend(milkshake.game.scene.Scene.prototype,{
	create: function() {
		milkshake.game.scene.Scene.prototype.create.call(this);
		this.addNode(this.paddleLeft = new scenes.SimpleCollisionObject(30,200),{ x : 30});
		this.addNode(this.paddleRight = new scenes.SimpleCollisionObject(30,200),{ x : milkshake.utils.Globals.SCREEN_WIDTH - 30 - this.paddleRight.get_width()});
		this.addNode(this.ball = new scenes.SimpleCollisionObject(10,10));
		this.addNode(milkshake.core.Sprite.fromFrame("character_evil.png"),{ scaleX : 2});
		this.resetBall();
	}
	,resetBall: function() {
		this.ballVelocity = milkshake.math.Vector2.EQUAL(7);
		this.ball.position = milkshake.utils.Globals.get_SCREEN_CENTER();
	}
	,update: function(delta) {
		milkshake.game.scene.Scene.prototype.update.call(this,delta);
		var _g = 0;
		var _g1 = hxcollision.Collision.testShapes(this.ball.shape,[this.paddleLeft.shape,this.paddleRight.shape]);
		while(_g < _g1.length) {
			var result = _g1[_g];
			++_g;
			var _g2 = this.ball;
			_g2.set_x(_g2.get_x() + result.separation.x);
			var _g21 = this.ball;
			_g21.set_y(_g21.get_y() + result.separation.y);
			this.ballVelocity.multi(milkshake.math.Vector2.EQUAL(1.1));
			this.ballVelocity.x *= -1;
		}
		this.paddleLeft.set_y(this.paddleRight.set_y(milkshake.utils.MathHelper.clamp(this.ball.get_y() - this.paddleRight.get_height() / 2,0,milkshake.utils.Globals.SCREEN_HEIGHT - this.paddleRight.get_height())));
		this.ball.position.add(this.ballVelocity);
		if(this.ball.get_y() < 0 || this.ball.get_y() + this.ball.get_height() > milkshake.utils.Globals.SCREEN_HEIGHT) {
			this.ballVelocity.y *= -1;
			this.ball.set_y(milkshake.utils.MathHelper.clamp(this.ball.get_y(),0,milkshake.utils.Globals.SCREEN_HEIGHT - this.ball.get_height()));
		}
		if(this.ball.get_x() > milkshake.utils.Globals.SCREEN_WIDTH || this.ball.get_x() < 0) this.resetBall();
	}
	,__class__: scenes.PongScene
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
hsl.haxe.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe.PropagationStatus.STOPPED = 2;
hsl.haxe.PropagationStatus.UNDISTURBED = 3;
milkshake.assets.SpriteSheets.TURRET = "/assets/spritesheets/turret.json";
milkshake.assets.SpriteSheets.CHARACTERS = "/assets/spritesheets/characters.json";
milkshake.utils.Color.BLACK = 0;
milkshake.utils.Color.WHITE = 16777215;
milkshake.utils.Color.RED = 16711680;
milkshake.utils.Color.GREEN = 65280;
milkshake.utils.Color.BLUE = 255;
milkshake.utils.Globals.SCREEN_WIDTH = 1280;
milkshake.utils.Globals.SCREEN_HEIGHT = 720;
scenes.PongScene.PADDLE_WIDTH = 30;
scenes.PongScene.PADDLE_HEIGHT = 200;
scenes.PongScene.BALL_SIZE = 10;
scenes.PongScene.BALL_SPEED = 7;
SandPit.main();
})(typeof window != "undefined" ? window : exports);
