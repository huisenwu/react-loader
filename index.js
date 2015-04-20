var loaderUtils = require("loader-utils");

module.exports = function(source) {
	if(this.cacheable) {
		this.cacheable();
	}

	var query = loaderUtils.parseQuery(this.query);
	var react = query.react || '';

	var conf = JSON.parse(source);
	var keys = Object.keys(conf);
	var deps = keys.map(function(key) {
		return "'" + conf[key] + "'";
	}).join(",");

	var components = keys.map(function(key) {
		return key + ":function(props, target){React.render(React.createElement("+ key +", props), target);}";
	}).join(",");

	return "define(["+ deps +",'" + react + "'], function("+ keys +",React) {" + "return {" + components + "}" + "});";
};
