webpackJsonp([113],{3011:function(t,o,e){"use strict";o.__esModule=!0;var r=e(3262),i=function(t){return t&&t.__esModule?t:{default:t}}(r);o.default={Chart:i.default},t.exports=o.default},3262:function(t,o,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function n(t,o){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!==typeof o&&"function"!==typeof o?t:o}function a(t,o){if("function"!==typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);t.prototype=Object.create(o&&o.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(t,o):t.__proto__=o)}o.__esModule=!0,o.default=void 0;var s=e(0),l=r(s),u=e(1),p=(r(u),e(386)),d=r(p),h=e(3263),c=r(h),f=e(3264),m=r(f),w=new d.default("react-google-charts:Chart"),g=0,C=function(){return"reactgooglegraph-"+(g+=1)},b=function(t){function o(e){i(this,o),w("constructor",e);var r=n(this,t.call(this,e));return r.state={graphID:e.graph_id||C()},r.chart=null,r.wrapper=null,r.hidden_columns={},r.dataTable=[],r.debounce=r.debounce.bind(r),r.onResize=r.onResize.bind(r),r.drawChart=r.drawChart.bind(r),r.togglePoints=r.togglePoints.bind(r),r.buildDataTableFromProps=r.buildDataTableFromProps.bind(r),r.listenToChartEvents=r.listenToChartEvents.bind(r),r.addChartActions=r.addChartActions.bind(r),r.updateDataTable=r.updateDataTable.bind(r),r.onSelectToggle=r.onSelectToggle.bind(r),r.addSourceColumnTo=r.addSourceColumnTo.bind(r),r.restoreColorTo=r.restoreColorTo.bind(r),r.hideColumn=r.hideColumn.bind(r),r}return a(o,t),o.prototype.componentDidMount=function(){var t=this;w("componentDidMount"),"undefined"!==typeof window&&(this.props.loadCharts?(m.default.init(this.props.chartPackages,this.props.chartVersion).then(function(){t.drawChart()}),this.onResize=this.debounce(this.onResize,200),window.addEventListener("resize",this.onResize)):this.drawChart())},o.prototype.componentDidUpdate=function(){var t=this;w("componentDidUpdate"),this.props.loadCharts?m.default.isLoading?m.default.initPromise.then(function(){t.drawChart()}):m.default.isLoaded&&this.drawChart():this.drawChart()},o.prototype.componentWillUnmount=function(){try{window&&(window.google&&window.google.visualization&&window.google.visualization.events.removeAllListeners(this.wrapper),window.removeEventListener("resize",this.onResize))}catch(t){return}},o.prototype.onResize=function(){w("Chart::onResize"),this.drawChart()},o.prototype.onSelectToggle=function(){w("onSelectToggle");var t=this.chart.getSelection();if(t.length>0&&null==t[0].row){var o=t[0].column;this.togglePoints(o)}},o.prototype.getColumnColor=function(t){if(this.props.options.colors){if(this.props.options.colors[t])return this.props.options.colors[t]}else if(t in c.default)return c.default[t];return c.default[0]},o.prototype.buildDataTableFromProps=function(){if(w("buildDataTableFromProps",this.props),this.props.diffdata){var t=this.props.diffdata,o=window.google.visualization.arrayToDataTable(t.old),e=window.google.visualization.arrayToDataTable(t.new);return(0,window.google.visualization[this.props.chartType].prototype.computeDiff)(o,e)}if(null===this.props.data&&0===this.props.rows.length&&!this.props.allowEmptyRows)throw new Error("Can't build DataTable from rows and columns: rows array in props is empty");if(null===this.props.data&&0===this.props.columns.length)throw new Error("Can't build DataTable from rows and columns: columns array in props is empty");if(null!==this.props.data)try{this.wrapper.setDataTable(this.props.data);return this.wrapper.getDataTable()}catch(t){throw new Error("Failed to set DataTable from data props ! ",t)}var r=new window.google.visualization.DataTable;if(this.props.columns.forEach(function(t){r.addColumn(t)}),r.addRows(this.props.rows),this.props.numberFormat){new window.google.visualization.NumberFormat(this.props.numberFormat.options).format(r,this.props.numberFormat.column)}if(this.props.dateFormat){var i=new window.google.visualization.DateFormat(this.props.dateFormat.options);this.props.dateFormat.columns.forEach(function(t){i.format(r,t)})}return r},o.prototype.updateDataTable=function(){return w("updateDataTable"),window.google.visualization.errors.removeAll(document.getElementById(this.wrapper.getContainerId())),this.dataTable.removeRows(0,this.dataTable.getNumberOfRows()),this.dataTable.removeColumns(0,this.dataTable.getNumberOfColumns()),this.dataTable=this.buildDataTableFromProps(),this.dataTable},o.prototype.drawChart=function(){var t=this;if(w("drawChart",this),this.wrapper){if(this.updateDataTable(),this.wrapper.setDataTable(this.dataTable),this.wrapper.setOptions(this.props.options),this.wrapper.getChartType()!==this.props.chartType){window.google.visualization.events.removeAllListeners(this.wrapper),this.wrapper.setChartType(this.props.chartType);var o=this;window.google.visualization.events.addOneTimeListener(this.wrapper,"ready",function(){o.chart=o.wrapper.getChart(),o.listenToChartEvents.call(o)})}}else{var e={chartType:this.props.chartType,options:this.props.options,containerId:this.state.graphID};this.wrapper=new window.google.visualization.ChartWrapper(e),this.dataTable=this.buildDataTableFromProps(),this.wrapper.setDataTable(this.dataTable),window.google.visualization.events.addOneTimeListener(this.wrapper,"ready",function(){t.chart=t.wrapper.getChart(),t.listenToChartEvents(),t.addChartActions()})}this.wrapper.draw()},o.prototype.addChartActions=function(){var t=this;w("addChartActions",this.props.chartActions),null!==this.props.chartActions&&this.props.chartActions.forEach(function(o){t.chart.setAction({id:o.id,text:o.text,action:o.action.bind(t,t.chart)})})},o.prototype.listenToChartEvents=function(){var t=this;w("listenToChartEvents",this.props.legend_toggle,this.props.chartEvents),this.props.legend_toggle&&window.google.visualization.events.addListener(this.wrapper,"select",this.onSelectToggle),this.props.chartEvents.forEach(function(o){"ready"===o.eventName?o.callback(t):function(o){window.google.visualization.events.addListener(t.chart,o.eventName,function(e){o.callback(t,e)})}(o)})},o.prototype.buildColumnFromSourceData=function(t){return w("buildColumnFromSourceData",t),{label:this.dataTable.getColumnLabel(t),type:this.dataTable.getColumnType(t),sourceColumn:t}},o.prototype.buildEmptyColumnFromSourceData=function(t){return w("buildEmptyColumnFromSourceData",t),{label:this.dataTable.getColumnLabel(t),type:this.dataTable.getColumnType(t),calc:function(){return null}}},o.prototype.addEmptyColumnTo=function(t,o){w("addEmptyColumnTo",t,o);var e=this.buildEmptyColumnFromSourceData(o);t.push(e)},o.prototype.hideColumn=function(t,o){w("hideColumn",t,o),this.isHidden(o)||(this.hidden_columns[o]={color:this.getColumnColor(o-1)}),t.push("#CCCCCC")},o.prototype.addSourceColumnTo=function(t,o){w("addSourceColumnTo",t,o);var e=this.buildColumnFromSourceData(o);t.push(e)},o.prototype.isHidden=function(t){return void 0!==this.hidden_columns[t]},o.prototype.restoreColorTo=function(t,o){w("restoreColorTo",t,o),w("hidden_columns",this.hidden_columns);var e=void 0;this.isHidden(o)?(e=this.hidden_columns[o].color,delete this.hidden_columns[o]):e=this.getColumnColor(o-1),0!==o&&t.push(e)},o.prototype.debounce=function(t,o){var e=void 0;return function(){for(var r=arguments.length,i=Array(r),n=0;n<r;n++)i[n]=arguments[n];var a=this;clearTimeout(e),e=setTimeout(function(){return t.apply(a,i)},o)}},o.prototype.togglePoints=function(t){w("togglePoints",t);for(var o=new window.google.visualization.DataView(this.wrapper.getDataTable()),e=o.getNumberOfColumns(),r=[],i=[],n=0;n<e;n+=1)0===n?this.addSourceColumnTo(i,n):n===t?this.isHidden(n)?(this.addSourceColumnTo(i,n),this.restoreColorTo(r,n)):(this.addEmptyColumnTo(i,n),this.hideColumn(r,n)):this.isHidden(n)?(this.addEmptyColumnTo(i,n),this.hideColumn(r,n)):(this.addSourceColumnTo(i,n),this.restoreColorTo(r,n));o.setColumns(i),this.props.options.colors=r,this.chart.draw(o,this.props.options)},o.prototype.render=function(){w("render",this.props,this.state);var t={height:this.props.height||this.props.options.height,width:this.props.width||this.props.options.width};return l.default.createElement("div",{id:this.state.graphID,style:t},this.props.loader?this.props.loader:"Rendering Chart...")},o}(l.default.Component);o.default=b,b.defaultProps={chartType:"LineChart",rows:[],columns:[],options:{chart:{title:"Chart Title",subtitle:"Subtitle"},hAxis:{title:"X Label"},vAxis:{title:"Y Label"},width:"400px",height:"300px"},width:"400px",height:"300px",chartEvents:[],chartActions:null,data:null,legend_toggle:!1,allowEmptyRows:!1,loadCharts:!0,loader:l.default.createElement("div",null,"Rendering Chart"),chartPackages:["corechart"],chartVersion:"current",numberFormat:null,dateFormat:null,diffdata:null},t.exports=o.default},3263:function(t,o,e){"use strict";t.exports=["#3366CC","#DC3912","#FF9900","#109618","#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499","#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#3B3EAC"]},3264:function(t,o,e){"use strict";o.__esModule=!0;var r=e(386),i=function(t){return t&&t.__esModule?t:{default:t}}(r),n=new i.default("react-google-charts:GoogleChartLoader"),a="undefined"!==typeof window?e(3265):function(t,o){return(0,o.success)()},s={isLoaded:!1,isLoading:!1,initPromise:{},init:function(t,o){var e=this;return n("init",t,o),this.isLoading||this.isLoaded?this.initPromise:(this.isLoading=!0,this.initPromise=new Promise(function(r){a("https://www.gstatic.com/charts/loader.js",{success:function(){window.google.charts.load(o||"current",{packages:t||["corechart"]}),window.google.charts.setOnLoadCallback(function(){n("Chart Loaded"),e.isLoaded=!0,e.isLoading=!1,r()})}})}),this.initPromise)}};o.default=s,t.exports=o.default},3265:function(t,o,e){var r,i,n;!function(e,a){i=[],r=a,void 0!==(n="function"===typeof r?r.apply(o,i):r)&&(t.exports=n)}(0,function(){function t(t,o){t=t.push?t:[t];var e,r,i,n,a=[],u=t.length,p=u;for(e=function(t,e){e.length&&a.push(t),--p||o(a)};u--;)r=t[u],i=s[r],i?e(r,i):(n=l[r]=l[r]||[],n.push(e))}function o(t,o){if(t){var e=l[t];if(s[t]=o,e)for(;e.length;)e[0](t,o),e.splice(0,1)}}function e(t,o,r,i){var a,s,l=document,u=r.async,p=(r.numRetries||0)+1,d=r.before||n;i=i||0,/(^css!|\.css$)/.test(t)?(a=!0,s=l.createElement("link"),s.rel="stylesheet",s.href=t.replace(/^css!/,"")):(s=l.createElement("script"),s.src=t,s.async=void 0===u||u),s.onload=s.onerror=s.onbeforeload=function(n){var l=n.type[0];if(a&&"hideFocus"in s)try{s.sheet.cssText.length||(l="e")}catch(t){l="e"}if("e"==l&&(i+=1)<p)return e(t,o,r,i);o(t,l,n.defaultPrevented)},!1!==d(t,s)&&l.head.appendChild(s)}function r(t,o,r){t=t.push?t:[t];var i,n,a=t.length,s=a,l=[];for(i=function(t,e,r){if("e"==e&&l.push(t),"b"==e){if(!r)return;l.push(t)}--a||o(l)},n=0;n<s;n++)e(t[n],i,r)}function i(t,e,i){var s,l;if(e&&e.trim&&(s=e),l=(s?i:e)||{},s){if(s in a)throw"LoadJS";a[s]=!0}r(t,function(t){t.length?(l.error||n)(t):(l.success||n)(),o(s,t)},l)}var n=function(){},a={},s={},l={};return i.ready=function(o,e){return t(o,function(t){t.length?(e.error||n)(t):(e.success||n)()}),i},i.done=function(t){o(t,[])},i.reset=function(){a={},s={},l={}},i.isDefined=function(t){return t in a},i})}});