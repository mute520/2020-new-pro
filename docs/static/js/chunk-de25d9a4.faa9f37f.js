(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-de25d9a4"],{"5ae6":function(e,t,a){},7615:function(e,t,a){"use strict";a("5ae6")},ba9e:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("directive")]),a("el-button",{directives:[{name:"copy",rawName:"v-copy",value:e.copyContent,expression:"copyContent"}],attrs:{size:"mini"}},[e._v("点击我进行（一键复制）复制内容哦！")]),a("el-button",{directives:[{name:"longpress",rawName:"v-longpress",value:{callback:e.longPress,time:2e3},expression:"{callback: longPress, time: 2000}"}],attrs:{size:"mini"}},[e._v("longpress 长按")]),a("el-button",{directives:[{name:"drag",rawName:"v-drag"}]},[e._v("drag button")]),a("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"drag"},[e._v("drag box")]),a("div",{directives:[{name:"water-marker",rawName:"v-water-marker",value:{str:"hello world!"},expression:"{str: 'hello world!'}"}],staticClass:"water"}),a("input",{directives:[{name:"focus",rawName:"v-focus"},{name:"emoji",rawName:"v-emoji"}],attrs:{type:"text"}}),a("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:{callback:e.fun,time:3e3},expression:"{callback: fun, time: 3000}"}],attrs:{size:"mini"}},[e._v("debounce btn")]),a("div",{directives:[{name:"dragcc",rawName:"v-dragcc"}],staticStyle:{left:"400px"}}),a("el-input",{attrs:{size:"mini"},on:{input:e.changeValue},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),a("div",{staticClass:"box"},[e._v(e._s(e.value))])],1)},o=[],i={name:"directive",computed:{},data:function(){return{msg:"directive",copyContent:"我是您复制的内容...",value:"8888888888.888"}},methods:{longPress:function(e){console.log("长按才执行的函数event",e)},fun:function(e){console.log("执行的函数event",e)},adjustFontSize:function(e,t,a){var n=e+"";t=parseFloat(t),a=parseFloat(a);var o=document.createElement("span");o.innerText=n,document.body.appendChild(o);var i=o.offsetWidth;return document.body.removeChild(o),a*(t/i)},changeValue:function(e){console.log("value: ",e);var t=document.querySelector(".box"),a=this.adjustFontSize(e,t.offsetWidth,"14px");t.style.fontSize=a+"px",console.log("size: ",a)}}},r=i,s=(a("7615"),a("2877")),c=Object(s["a"])(r,n,o,!1,null,"006a6a3e",null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-de25d9a4.faa9f37f.js.map