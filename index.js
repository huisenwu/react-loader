var loaderUtils = require("loader-utils");
var _ = require('lodash');

module.exports = function(source) {
	if(this.cacheable) this.cacheable();

	var query = loaderUtils.parseQuery(this.query);
	var templates = {
		component: "<%=key%>:function(props, target){React.render(React.createElement(<%=key%>, props), target);}",
		amd: "define([<%=values%>,'<%=react%>'], function(<%=keys%>,React) {return {<%=comps%>};});"
	};
	var conf = JSON.parse(source);
	var keys = _.keys(conf);
	var comp = _.template(templates.component);
	var comps = _.map(keys, function(key) {
		return comp({key: key});
	});
	var amd = _.template(templates.amd);
	var result = amd({values: _.map(_.values(conf), function(value) {return "'" + value + "'";}), react: query.react, keys: keys, comps: comps});
	return result;
};
