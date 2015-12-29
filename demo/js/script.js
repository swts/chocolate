"use strict";!function(t,e,o,n){var n=n||{},i=function(e){var o=n[e]||t[e];if(!o)throw new Error("Requested module '"+e+"' has not been defined.");return o},s=function(e,o,i){i?t[e]=o:n[e]=o};!function(t,e,o){s("$",jQuery.noConflict())}(t,e),function(t,e,o){s("swts",{})}(t,e),function(t,e,o){var n=function(){var t=Array.prototype.slice.call(arguments),e=!1,o=t.shift();"boolean"==typeof o&&(e=o,o=t.shift());for(var i=0,s=t.length;s>i;i++){var a=t[i];for(var r in a)e&&"object"==typeof a[r]&&"undefined"!=typeof o[r]?n(e,o[r],a[r]):o[r]=a[r]}return o};s("util/extend",n)}(t,e),function(t,e,o){var n=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})};s("util/inherits",n)}(t,e),function(t,e,o){var n=["css","addClass","removeClass","toggleClass","appendTo","prependTo","insertBefore","insertAfter"],i=function(){};i.prototype={error:function(t){var e=this.$b.addClass(t||"ui-error");setTimeout(function(){e.removeClass(t||"ui-error")},600)},remove:function(t){t&&this.$b.off(t),this.$b.remove(),this.$b=o}},n.forEach(function(t){i.prototype[t]=function(){return this.$b[t].apply(this.$b,arguments),this}}),s("ui/bar",i)}(t,e),function(t,e,o){var n=i("$"),a=i("util/inherits"),r=i("ui/bar"),l=function(t,e,i){var s=this;i===o&&(i=e,e=o),s.confirm=!1,s.$b=n('<a href="#/'+t+(e?"/"+e:"")+'" class="swts-button"></a>').on("click",function(t){t.preventDefault(),t.stopPropagation(),s.confirm?(s.$b.removeClass("swts-button-confirm"),s.confirm=!1,i(e)):(s.$b.one("mouseout",function(){s.$b.removeClass("swts-button-confirm"),s.confirm=!1}),s.confirm=!0,s.$b.addClass("swts-button-confirm"))})};a(l,r),l.prototype.remove=function(){this.$b.remove()},s("ui/buttons/confirm",l)}(t,e),function(t,e,o){var n=i("$"),a=i("ui/buttons/confirm"),r=function(t,e){return n('<a href="#/'+t+'" class="swts-button"></a>').on("click",function(o){o.preventDefault(),o.stopPropagation(),e(t)})},l=function(t,e){return"function"==typeof t&&(e=t,t=o),r("add"+(t?"/"+t:""),function(t){e(t?t.split("/")[1]:t)}).addClass("swts-add swts-icon-plus")},p=function(t,e){return"function"==typeof t&&(e=t,t=o),new a("remove",t,e).addClass("swts-remove swts-icon-trash")},u=function(t){return'<a href="#/add'+(t?"/"+t:"")+'" class="swts-button swts-add swts-icon-plus"></a>'},c=function(t){return'<a href="#/remove'+(t?"/"+t:"")+'" class="swts-button swts-remove swts-icon-trash"></a>'};s("ui/buttons",{add:l,remove:p,button:r,template:{add:u,remove:c}})}(t,e),function(t,e,o){var n={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"Ae","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"Oe","Ő":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"Ue","Ű":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"ae","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"oe","ő":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"ue","ű":"u","ý":"y","þ":"th","ÿ":"y","ẞ":"SS","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ά":"a","έ":"e","ί":"i","ό":"o","ύ":"y","ή":"h","ώ":"w","ς":"s","ϊ":"i","ΰ":"y","ϋ":"y","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ά":"A","Έ":"E","Ί":"I","Ό":"O","Ύ":"Y","Ή":"H","Ώ":"W","Ϊ":"I","Ϋ":"Y","ş":"s","Ş":"S","ı":"i","İ":"I","ğ":"g","Ğ":"G","Ќ":"Kj","ќ":"kj","Љ":"Lj","љ":"lj","Њ":"Nj","њ":"nj","Тс":"Ts","тс":"ts","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sch","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ё":"Yo","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","Є":"Ye","І":"I","Ї":"Yi","Ґ":"G","є":"ye","і":"i","ї":"yi","ґ":"g","č":"c","ď":"d","ě":"e","ň":"n","ř":"r","š":"s","ť":"t","ů":"u","ž":"z","Č":"C","Ď":"D","Ě":"E","Ň":"N","Ř":"R","Š":"S","Ť":"T","Ů":"U","Ž":"Z","ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ś":"s","ź":"z","ż":"z","Ą":"A","Ć":"C","Ę":"E","Ł":"L","Ń":"N","Ś":"S","Ź":"Z","Ż":"Z","ā":"a","ē":"e","ģ":"g","ī":"i","ķ":"k","ļ":"l","ņ":"n","ū":"u","Ā":"A","Ē":"E","Ģ":"G","Ī":"I","Ķ":"k","Ļ":"L","Ņ":"N","Ū":"U","ا":"a","أ":"a","إ":"i","آ":"aa","ؤ":"u","ئ":"e","ء":"a","ب":"b","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ي":"y","ى":"a","ة":"h","ﻻ":"la","ﻷ":"laa","ﻹ":"lai","ﻵ":"laa","َ":"a","ً":"an","ِ":"e","ٍ":"en","ُ":"u","ٌ":"on","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","“":"'","”":"'","‘":"'","’":"'","∂":"d","ƒ":"f","™":"(TM)","©":"(C)","œ":"oe","Œ":"OE","®":"(R)","†":"+","℠":"(SM)","…":"...","˚":"o","º":"o","ª":"a","•":"*",$:"USD","€":"EUR","₢":"BRN","₣":"FRF","£":"GBP","₤":"ITL","₦":"NGN","₧":"ESP","₩":"KRW","₪":"ILS","₫":"VND","₭":"LAK","₮":"MNT","₯":"GRD","₱":"ARS","₲":"PYG","₳":"ARA","₴":"UAH","₵":"GHS","¢":"cent","¥":"CNY","元":"CNY","円":"YEN","﷼":"IRR","₠":"EWE","฿":"THB","₨":"INR","₹":"INR","₰":"PF"},i=function(t){return t.toLowerCase().split("").map(function(t){return n[t]||t}).join("").replace(" ","-").replace(/[^-a-z0-9]{1,60}/,"")};s("ui/input/slugify",i)}(t,e),function(t,e,o){var n=i("$"),a=i("util/inherits"),r=i("ui/bar"),l=function(t,e,s){var a=this;t instanceof n||t===o||(s=e,e=t,t=o),"function"==typeof e&&(s=e,e={}),e||(e={}),a.name=e.name,a.value=e.value,a.rx=e.rx,a.transforms=[],a.trim=e.trim,e.slugify&&a.transforms.push(i("ui/input/slugify")),e.transform&&a.transforms.push(e.transform),a.err=e.errorClass||"ui-error",a.cb=s,t&&t[0]instanceof HTMLInputElement&&(t=t.parent()),a.build(t,e)};a(l,r),l.prototype.build=function(t,e){var o=this;o.$b=t||n('<label class="input"><input type="'+(e.type||"text")+'" '+(e.id?'id="'+o.id+'" ':"")+(e.name?'name="'+e.name+'" ':"")+(e.value?'value="'+e.value+'" ':"")+"><span>"+e.title+"</span></label>"),o.$b.on("click.input",function(t){t.stopPropagation()}),o.$i=o.$b.find("input").on("blur.input",function(){o.trim&&(this.value=this.value.trim()),o.$b.toggleClass("input-val",""!==this.value)}).trigger("blur").on("keyup.input",function(){o.transform().throttledUpdate(this.value)}),e.onPaste&&o.$i.on("paste",e.onPaste)},l.prototype.val=function(t,e){return t===o?this.$i.val():(this.$i.val(t).trigger("blur"),this.transform(),this.throttledUpdate(t,e),this)},l.prototype.addTransform=function(t){return this.transforms.push(t),this},l.prototype.transform=function(){var t=this.$i[0];if(this.transforms.length&&this.value!==t.value){var e=t.selectionStart,o=t.selectionEnd,n=t.value;this.transforms.forEach(function(t){n=t(n)}),t.value=n,t.setSelectionRange(e,o)}return this},l.prototype.focus=function(){return this.$i.focus(),this},l.prototype.throttledUpdate=function(t,e){var o=this;clearTimeout(o.typingTimer),o.typingTimer=setTimeout(function(){t!==o.value&&(o.rx?o.rx.test(t)?o.update(t,e):o.$b.addClass(o.err):o.update(t,e))},300)},l.prototype.update=function(t,e){var o=this;o.$b.removeClass(o.err),o.value=t,!e&&o.cb&&o.cb(t)},l.prototype.remove=function(){this.$i.off(".input"),this.$i=o,l.super_.prototype.remove.call(this,".input")},s("ui/input",l)}(t,e),function(t,e,o){var n=i("$");s("ui/nipple/item",function(t,e,o){return{$b:n('<a href="#/'+e+'">'+o.title+"</a>")}})}(t,e),function(t,e,o){var n=i("ui/input");s("ui/nipple/input",function(t,e,o,i){return new n(o,i)})}(t,e),function(t,e,o){var n=i("$"),a=function(t,e){var i=this,s=0,a="";for(var r in e)if("item"!==r){var l=e[r];s++,a+='<a href="#/'+(l.confirm?"confirm/":"")+r+'" class="'+l.icon+'" '+(l.title?'title="'+l.title+'"':"")+"></a>"}i.active=o,i.confirm=o,i.$b=n(a).hover(function(){i.active=this.hash.split("/")[1],i.$parent.addClass("nipple-h-"+i.active),i.$b.not(this).addClass("nipple-hidden")},function(){i.$parent.removeClass("nipple-h-"+i.active),i.$b.removeClass("nipple-hidden")}),i.$parent=t.addClass("nipple-i-tools-"+s).on("mouseout.nipple-confirm",function(){i.hideConfirm()}).on("click.nipple-confirm","a",function(t){i.confirm&&i.$parent.hasClass("nipple-confirmation")?setTimeout(function(){i.hideConfirm()},0):"#/confirm"===this.hash.substring(0,9)&&(t.preventDefault(),t.stopPropagation(),i.showConfirm(this))})};a.prototype={showConfirm:function(t){this.$confirm=n(t),this.$parent.addClass("nipple-confirmation"),this.confirm=this.$confirm.attr("href").slice(9),this.$confirm.attr("href","#"+this.confirm)},hideConfirm:function(){this.confirm&&(this.$confirm.attr("href","#/confirm"+this.confirm),this.$parent.removeClass("nipple-confirmation"),this.confirm=o)},remove:function(){this.$parent.off(".nipple-confirm")}},s("ui/nipple/tools",function(t,e,o){return new a(t,o)})}(t,e),function(t,e,o){var n=i("$"),a=function(t,e,i,s){var a=this;a.state=i.state!==o?i.state:!1,a.title=i.title,a.cb=s,a.$b=n('<a href="#/toggle/'+e+'"'+(i["class"]?' class="'+i["class"]+'"':"")+' title="'+i.title[a.state]+'">'+i.title[a.state]+"</a>").on("click",function(t){t.preventDefault(),t.stopPropagation(),a.toggle()}),a.$parent=t.addClass("nipple-state-"+(a.state?"on":"off"))};a.prototype={val:function(t){if(t===o)return this.state;if(t!==this.state){var e=this,n=e.title[t?"on":"off"];e.$b.text(n).attr("title",n),e.$parent.removeClass("nipple-state-"+(e.state?"on":"off")).addClass("nipple-state-"+(t?"on":"off")),e.state=t}},toggle:function(){this.val(!this.state),this.cb(this.state)}},s("ui/nipple/toggle",function(t,e,o,n){return new a(t,e,o,n)})}(t,e),function(t,e,o){var n,a,r=i("$"),l=i("util/inherits"),p=i("ui/bar");r(e).on("click.nipple",function(){n&&n.hide()});var u=function(t,e){var n=this;e===o&&(e=t,t={}),n._popup=t.popup||a.popup||"s",n.autoHide=t.autoHide||a.autoHide,n.menu=t.menu||a.menu,n.willOpen=t.willOpen,n.cbs=e,n.items={},n.active=!1,n.build(t.items||a.items,t.size||a.size||"small")};l(u,p),u.prototype.build=function(t,e){var o=this,n=o.cbs,i=r('<ul class="nipple-items"></ul>').on("click.nipple","a",function(t){t.preventDefault(),t.stopPropagation();var e=this.hash.split("/");o.autoHide&&o.hide(),!o.menu&&r(this).parent().hasClass("nipple-i-item")&&o.val(this.hash.slice(2)),n[e[1]]&&n[e[1]].apply(o,e.slice(2))});for(var s in t){var a,l=t[s],p=l.item||"item",u=r('<li class="nipple-i-'+p+'"></li>');a=o.getItem(p)(u,s,t[s],n[s]&&n[s].bind(o)),u.append(a.$b),i.append(u),o.items[s]=a}o.$b=r('<div class="nipple nipple-'+e+" nipple-"+o._popup+'"><a href="#nipple-open"></a></div>').append(i),o.$a=o.$b.children("a").on("click.nipple",function(t){t.preventDefault(),t.stopPropagation(),(o.active||!o.willOpen||o.willOpen())&&o.toggle()}),o.$items=o.$b.find(".nipple-i-item")},u.prototype.getItem=function(t){return i("ui/nipple/"+t)},u.prototype.val=function(t){return t===o?this._val:(this._val!==t&&(this.menu||this.$items.find('[href="#/'+this._val+'"]').parent().removeClass("nipple-selected").end().end().find('[href="#/'+t+'"]').parent().addClass("nipple-selected"),this._val=t),this)},u.prototype.direction=function(t){return t===o?this._popup:(this._popup!==t&&(this.$b.removeClass("nipple-"+this._popup).addClass("nipple-"+t),this._popup=t),this)},u.prototype.confirm=function(t){var e=this;e.confirmTool!==t?e.$confirm.attr("href","#/confirm/"+t).addClass("nipple-hot"):(e.cbs[t].apply(e,arguments.slice(1)),e.hideConfirm())},u.prototype.hideConfirm=function(){this.confirmTool=o,this.$confirm.removeClass("nipple-hot")},u.prototype.toggle=function(){this.active?this.hide():this.show()},u.prototype.show=function(){return n&&n.hide(),n=this,this.$b.addClass("nipple-hot"),this.active=!0,this},u.prototype.hide=function(){return n=o,this.$b.removeClass("nipple-hot"),this.active=!1,this},u.prototype.remove=function(){n===this&&(n=o),this.$a.off(".nipple"),this.$a=o,u.super_.prototype.remove.call(this)},u.defaults=function(t){a=t},s("ui/nipple",u)}(t,e),function(t,e,o){var n=i("$"),a=i("swts"),r=i("util/inherits"),l=i("ui/bar"),p=i("ui/nipple"),u=i("ui/input"),c='<div class="swts-cover-login"><label class="input" for="swts-cover-email"><input id="swts-cover-email" type="text"><span>Email</span></label><label class="input" for="swts-cover-password"><input id="swts-cover-password" type="password"><span>Password</span></label><a href="#/login" class="swts-button-m">Go</a></div>',d=n(t),f=function(t){var e=this;t||(t={}),e.$parent=n(t.parent||"body"),e.isLoginVisible=!1,e.editing=!1,e.popup=t.popup||"n",e.profile=t.profile,e.ui={},a.u&&a.u.isStaff()?e.showUser(a.u):e.buildLogin()};r(f,l),f.prototype.load=function(){var t=this;a.load("/static/js/chocolate.js",function(e){if(!e){var o=i("chocolate");t.choco=new o,t.edit()}})},f.prototype.buildLogin=function(){var t=this;t.$l=n(c).appendTo(t.$parent).on("click.swts.login",function(t){t.stopPropagation()}).on("keypress.swts.login",function(e){13===e.keyCode&&t.login()}).find(".swts-button-m").on("click.swts.login",function(e){e.preventDefault(),t.login()}).end(),t.ui.login=new u(t.$l.find("#swts-cover-email")),t.ui.password=new u(t.$l.find("#swts-cover-password")),d.on({"keydown.swts.login":function(e){t.isLoginVisible?27===e.keyCode&&(e.preventDefault(),t.hideLogin()):e.altKey&&e.ctrlKey&&(99===e.keyCode||67===e.keyCode)&&(e.preventDefault(),t.showLogin())},"click.swts.login":function(){t.isLoginVisible&&t.hideLogin()}})},f.prototype.showLogin=function(){this.isLoginVisible=!0,this.$l.addClass("active"),this.ui.login.focus()},f.prototype.hideLogin=function(){this.$l.removeClass("active"),this.ui.login.val(""),this.ui.password.val(""),this.isLoginVisible=!1},f.prototype.removeLogin=function(){var t=this;t.hideLogin(),d.off(".swts.login"),setTimeout(function(){t.$l.remove(),t.ui.login=o,t.ui.password=o},650)},f.prototype.login=function(){var t=this,e=t.ui;a.userLogin(e.login.val(),e.password.val(),function(e,o){e?t.error():o.isStaff()&&(t.removeLogin(),t.showUser(o))})},f.prototype.error=function(){var t=this;t.$l.addClass("ui-error"),setTimeout(function(){t.$l.removeClass("ui-error")},500)},f.prototype.showUser=function(t){if(t){"function"==typeof t.get&&(t=t.data);var e=this;e.ui.user=new p({popup:e.popup,size:"medium",menu:!0,autoHide:!0,items:{edit:{title:"Edit"},profile:{title:t.name||t.email},logout:{title:"Logout"}}},{edit:e.edit.bind(e),logout:e.logout.bind(e),profile:function(){e.profile&&e.profile(t)}}).addClass("swts-user").appendTo(e.$parent)}},f.prototype.edit=function(){var t=this,e=t.ui.user;t.choco?t.editing?(t.editing=!1,t.choco.off(),e.removeClass("swts-editing").items.edit.$b.text("Edit")):(t.choco.on(),e.addClass("swts-editing").items.edit.$b.text("Stop editing"),t.editing=!0):t.load()},f.prototype.logout=function(){a.userLogout(),this.ui.user.remove(),this.ui={},this.buildLogin()},s("ui/cover",f)}(t,e),function(t,e,o){var n=i("$"),a=i("util/inherits"),r=i("ui/bar"),l=/(\/)/g,p=function(t,e,o){var n=this;"function"==typeof e&&(o=e,e={}),n.keepOrder=e.keepOrder,n.isMultiple=e.multiple,n.selected=e.selected||(n.isMultiple?[]:""),n.cb=o,n.items=t,n.order=[],n.build()};a(p,r),p.prototype.parse=function(t){return this},p.prototype.buildItems=function(t){for(var e=this,o="",n=e.selected,i=n&&n.length,s=0,a=t.length;a>s;s++){var r="",p=t[s],u=Object.keys(p)[0];e.order.push(u),i?(u===n||e.isMultiple&&-1!==n.indexOf(u))&&(r=" selectah-active"):0===s&&(r=" selectah-active");var c=u.match(l);o+='<li class="selectah-level-'+(c?c.length:0)+r+'"><a href="#:'+u+'">'+p[u]+"</a></li>"}return o},p.prototype.build=function(){var t=this,e='<ul class="selectah">';e+=t.buildItems(t.items),e+="</ul>",t.$b=n(e).on("click.selectah","a",function(e){e.preventDefault(),e.stopPropagation(),t.check(this)}),t.$li=t.$b.find("li")},p.prototype.pushInOrder=function(t){var e=this,o=e.order,n=e.selected;for(t=t.split("/");t.length;){var i=t.join("/");n.push(i),this.$b.find('a[href="#:'+i+'"]').parent().addClass("selectah-active"),t.pop()}e.selected=[];for(var s in o)-1!==n.indexOf(o[s])&&e.selected.push(o[s])},p.prototype.set=function(t){var e=this;return e.selected=t,e.$b.addClass("no-transition"),e.$li.removeClass("selectah-active"),e.$b.find('a[href="#:'+t+'"]').parent().addClass("selectah-active"),setTimeout(function(){e.$b.removeClass("no-transition")},10),this},p.prototype.val=function(t){return t===o?this.selected:(this.check(this.$b.find('a[href="#:'+t+'"]')[0]),this)},p.prototype.check=function(t){var e=this,o=t.hash.split(":")[1],i=n(t).parent();i.hasClass("selectah-active")?e.deactivate(i,o):e.activate(i,o)},p.prototype.activate=function(t,e){var o=this;o.isMultiple?o.keepOrder?o.pushInOrder(e):o.selected.push(e):(o.$li.removeClass("selectah-active"),o.selected=e),t.addClass("selectah-active"),o.cb&&o.cb(o.selected)},p.prototype.deactivate=function(t,e){var o=this;if(o.isMultiple&&o.selected.length>1){t.removeClass("selectah-active");for(var n=0;n<o.selected.length;n++)if(o.selected[n]===e){o.selected.splice(n,1);break}o.cb&&o.cb(o.selected)}},p.prototype.show=function(){return this.$b.show(),this},p.prototype.remove=function(){p.super_.prototype.remove.call(this,".selectah")},s("ui/selectah",p)}(t,e),function(t,e,o){var n=i("$"),a=i("util/inherits"),r=i("ui/bar"),l=[31,28,31,30,31,30,31,31,30,31,30,31],p={startDay:"MON",messages:{year:"",months:{0:{s:"Jan",f:"January"},1:{s:"Feb",f:"February"},2:{s:"Mar",f:"March"},3:{s:"Apr",f:"April"},4:{s:"May",f:"May"},5:{s:"Jun",f:"June"},6:{s:"Jul",f:"July"},7:{s:"Aug",f:"August"},8:{s:"Sep",f:"September"},9:{s:"Oct",f:"October"},10:{s:"Nov",f:"November"},11:{s:"Dec",f:"December"}}}},u=function(t,e){"function"==typeof t&&(e=t,t={});var o=this;o.$b=n('<div class="gregory"></div>'),o.modes={day:"day",month:"month",year:"year"},o.displayState={},o.selectedState={},o.prevFullState={},o.weekStartDay=t.weekStartDay||p.startDay,o.messages=t.messages||p.messages,o.flip=t.flip,o.cb=e,o.build(t.popup),o.prevFullState.mode=o.modes.day};a(u,r),u.prototype.build=function(t){var e=this,o=e.flip,i='<div class="gregory-header"><a class="gregory-change gregory-back" href="#"></a><a class="gregory-info" href="#/"></a><a class="gregory-change gregory-forward" href="#"></a></div>',s='<div class="gregory'+(t?" gregory-popup":"")+(o?" gregory-up":" gregory-down")+'">';o||(s+=i),s+='<div class="gregory-wrapper"></div>',o&&(s+=i),s+="</div>",e.$b=n(s).on("click.gregory",function(t){t.stopPropagation()}).on("click.gregory","a.gregory-change",function(t){t.preventDefault();var o=this.hash.split("/"),n=parseInt(o[1],10),i=o[2]?parseInt(o[2],10):null,s={};s.year=n,(0===i||i)&&(s.month=i),e.changeState(s,"dateChange")}),e.$wrapper=e.$b.find(".gregory-wrapper").on("click.gregory","a",function(t){t.preventDefault();var o=n(this),i=this.hash.split("/"),s=parseInt(i[1],10),a=i[2]?parseInt(i[2],10):null,r=i[3]?parseInt(i[3],10):null;e.changeSelectedState({year:s,month:a,day:r},o),e.cb&&e.cb(new Date(s,a,r),!!r)}),e.$date=e.$b.find(".gregory-info").on("click.gregory",function(t){t.preventDefault();var o={};o.mode=this.hash.split("/")[1],o.mode===e.modes.day?e.changeSelectedState(e.prevFullState):(null===e.displayState.month?o.month=e.selectedState.month:o.month=e.displayState.month,e.isYearActive(e.displayState.year)||e.displayState.mode!==e.modes.month||(o.year=e.selectedState.year),e.changeState(o))}),e.$back=e.$b.find(".gregory-back"),e.$forward=e.$b.find(".gregory-forward")},u.prototype.val=function(t){if(t===o){var e=this.selectedState;return new Date(e.year,e.month,e.day)}var n;return n=t instanceof Date?{year:t.getFullYear(),month:t.getMonth(),day:t.getDate()}:t,n.mode=n.day?this.modes.day:this.modes.month,this.changeState(n),this.changeSelectedState(n),this},u.prototype.changeState=function(t){var e=this;e.setState(t),e.buildCalendar(),e.updateInfo()},u.prototype.changeSelectedState=function(t,e){var o=this;if(o.displayState.mode===o.modes.day){if(o.$wrapper.find(".gregory-active").removeClass("gregory-active"),!e){var n='a[href="#/'+t.year+(0===t.month||t.month?"/"+t.month+(t.day?"/"+t.day:""):"")+'"]';e=o.$wrapper.find(n)}e.addClass("gregory-active")}o.setSelected(t),o.updatePrevFullState(),t.mode||(o.displayState.mode===o.modes.year?t.mode=o.modes.month:o.displayState.mode===o.modes.month&&(t.mode=o.modes.day)),o.changeState(t)},u.prototype.buildCalendar=function(){var t=this;t.displayState.mode===t.modes.day?t.buildDays():t.displayState.mode===t.modes.month?t.buildMonths():t.buildYears()},u.prototype.buildDays=function(){var t=this,e=new Date(t.displayState.year,t.displayState.month,1).getDay(),o=t.getDaysInMonth(t.displayState.year,t.displayState.month),n="MON"===t.weekStartDay?0===e?6:e-1:e,i='<ul class="gregory-day">',s=1,a=t.prevMonth(t.displayState.year,t.displayState.month),r=t.nextMonth(t.displayState.year,t.displayState.month);t.setChange(a.year+"/"+a.month,r.year+"/"+r.month);for(var l=0;9>l;l++){for(var p=0;6>=p;p++)if(o>=s&&(p>=n&&0===l||l>0))i+='<li><a class="'+(t.isDayActive(s)?"gregory-active":"")+'" href="#/'+t.displayState.year+"/"+t.displayState.month+"/"+s+'">'+s+"</a></li>",s++;else{if(s>o)break;i+="<li></li>"}if(s>o)break}i+="</ul>",t.$wrapper.html(i)},u.prototype.buildMonths=function(){var t=this,e='<ul class="gregory-month">',o=0;t.setChange(t.displayState.year-1,t.displayState.year+1);for(var n=0;4>n;n++){for(var i=0;2>=i;i++)e+='<li><a class="'+(t.isMonthActive(o)?"gregory-active":"")+'" href="#/'+t.displayState.year+"/"+o+'">'+t.messages.months[o].s+"</a></li>",o++;if(o>11)break}e+="</ul>",t.$wrapper.html(e)},u.prototype.buildYears=function(){var t=this,e='<ul class="gregory-year">',o=t.displayState.twelfth-11;t.setChange(o-1,t.displayState.twelfth+12);for(var n=0;4>n;n++){for(var i=0;2>=i;i++)e+='<li><a class="'+(t.isYearActive(o)?"gregory-active":"")+'" href="#/'+o+'">'+o+"</a></li>",o++;if(o>t.displayState.twelfth)break}e+="</ul>",t.$wrapper.html(e)},u.prototype.setChange=function(t,e){var o=this;o.$back.attr("href","#/"+t),o.$forward.attr("href","#/"+e)},u.prototype.setDateActive=function(){this.$wrapper.find('a[href="#/'+this.formUrl+'"]').addClass("gregory-active")},u.prototype.prevMonth=function(t,e){var o={};return 0===e?(o.year=t-1,o.month=11):(o.year=t,o.month=e-1),o},u.prototype.nextMonth=function(t,e){var o={};return 11===e?(o.year=t+1,o.month=0):(o.year=t,o.month=e+1),o},u.prototype.getDaysInMonth=function(t,e){return 1===e&&(t%4===0&&t%100!==0||t%400===0)?29:l[e]},u.prototype.updateInfo=function(){var t,e=this,o=e.displayState;o.mode===e.modes.day?e.$date.html(e.messages.months[o.month].f+" "+o.year):o.mode===e.modes.month?e.$date.html(o.year+" "+e.messages.year):e.$date.html(e.prevFullState.day+"."+(e.prevFullState.month+1)+"."+e.prevFullState.year),o.mode===e.modes.day?t=e.modes.month:o.mode===e.modes.month?t=e.modes.year:o.mode===e.modes.year&&(t=e.modes.day),e.$date.attr("href","#/"+t)},u.prototype.setState=function(t){var e=this,o=e.displayState;t.year&&(o.year=t.year,o.twelfth=t.year),0===t.month||t.month?o.month=t.month:o.month=null,t.mode&&(o.mode=t.mode),o.mode||(o.mode=0===t.month||t.month?e.modes.day:e.modes.month)},u.prototype.setSelected=function(t){var e=this.selectedState;e.year=t.year,e.month=t.month,e.day=t.day?t.day:null},u.prototype.updatePrevFullState=function(){var t=this.selectedState,e=this.prevFullState;t.day&&(t.month||0===t.month)&&t.year&&(e.day=t.day,e.month=t.month,e.year=t.year)},u.prototype.isDayActive=function(t){return t===this.selectedState.day&&this.displayState.month===this.selectedState.month&&this.displayState.year===this.selectedState.year},u.prototype.isMonthActive=function(t){return t===this.selectedState.month&&this.displayState.year===this.selectedState.year},u.prototype.isYearActive=function(t){return t===this.selectedState.year},u.prototype.show=function(){return this.$b.addClass("gregory-hot"),this},u.prototype.hide=function(){return this.$b.removeClass("gregory-hot"),this},u.prototype.toggle=function(){return this.$b.toggleClass("gregory-hot"),this},u.prototype.remove=function(){var t=this;t.$b.off(".gregory"),t.$b.remove(),t.$b=o,t.$wrapper.off(".gregory"),t.$wrapper=o,t.$date.off(".gregory"),t.$date=o,t.$back=o,t.$forward=o},u.defaults=function(t){p=t},s("ui/gregory",u)}(t,e),function(t,e,o){var n,a=i("$"),r=i("util/inherits"),l=i("ui/input"),p=i("ui/gregory"),u=a(e),c=/^\d{1,2}.\d{1,2}.\d{4}$/,d=function(t,e,n){var i=this;t instanceof a||(n=e,e=t,t=o),e||(e={}),e.rx||(e.rx=c),e.type="text",l.call(i,t,e),i.flip=e.flip,i.cb=n,this.active=!1,i.gregory=new p({flip:i.flip,popup:!0},function(t,e){e&&i.update(t)}).appendTo(i.$b),i.$i.on("click.input",function(){i.toggle()}),u.on("click.input",function(){i.active&&i.hide()});var s=parseInt(i.$i.val(),10);i.value=o,s===s?i.update(s,!0):i.gregory.val(new Date)};r(d,l),d.prototype.val2date=function(t){var e;switch(typeof t){case"number":e=new Date(t);break;case"string":t=t.split("."),e=new Date(t[2],t[1]-1,t[0]);break;default:e=t}return e&&"Invalid Date"===e.toString()?o:e},d.prototype.show=function(){return n&&n.hide(),n=this.gregory.show(),this.active=!0,this},d.prototype.hide=function(){return n=o,this.gregory.hide(),this.active=!1,this},d.prototype.toggle=function(){this.active?this.hide():this.show()},d.prototype.formatDate=function(t){return t.getDate()+"."+(t.getMonth()+1)+"."+t.getFullYear()},d.prototype.val=function(t){return t===o?this.value:(this.update(t),this)},d.prototype.update=function(t,e){var n=this;t=n.val2date(t),(n.value===o&&t||t&&n.value.getTime()!==t.getTime())&&(n.$b.removeClass(n.err),n.gregory.val(t),n.value=n.gregory.val(),n.$i.val(n.formatDate(t)).trigger("blur"),!e&&n.cb&&n.cb(t))},d.prototype.remove=function(){var t=this;n===this.gregory&&(n=o),t.gregory.remove(),t.$i.off(".input"),t.$b.off(".input").remove(),t.$b=o,t.$i=o},s("ui/gregory/dateinput",d)}(t,e),function(t,e,o){var n=i("$"),a=(n(t),n("body")),r=[],l=/<[^>]*>/gi,p=function(){for(var t in r)r[t].addClass("gutenberg-hidden")},u=function(t){for(var e in r)t===r[e]&&r.splice(e,1)},c=function(){var o;if(t.getSelection){var n=t.getSelection();n.rangeCount&&(o=n.getRangeAt(0))}else e.selection&&e.selection.createRange&&(o=e.selection.createRange());return o},d=function(t){var o=c(),n=e.createElement(t);o.surroundContents(n)},f={orderedList:{icon:"swts-icon-ol",command:function(t){}},bold:{icon:"swts-icon-bold",command:function(t){d("strong"),t.onTextEdit(t.$b.html())}},italic:{icon:"swts-icon-italic",command:function(t){d("em"),t.onTextEdit(t.$b.html())}},removeFormat:{icon:"swts-icon-clean",command:function(t){e.execCommand("removeFormat"),t.onTextEdit(t.$b.html())}},link:{icon:"swts-icon-link",iconUnlink:"swts-icon-unlink",additionalInit:function(o){o.selectionIsLink=function(){var e=!1,n=t.getSelection();return(navigator.userAgent.match(/webkit/i)?0:1)?(navigator.userAgent.match(/firefox/i)?0:1)||(e=o.firefoxSelectionIsLink()):e=o.findNodeWithTags(n.focusNode,"A"),e},o.firefoxSelectionIsLink=function(){var e=t.getSelection(),n=o.getRange(),i=n.cloneContents();return 1===i.childNodes.length&&"A"===i.firstChild.tagName?!0:o.findNodeWithTags(e.focusNode,"A")},o.findNodeWithTags=function(t,e){for(n.isArray(e)||(e=[e]);t;){if(3!==t.nodeType){var o=e.indexOf(t.tagName);if(-1!==o)return t}t=t.parentNode}return null},o.buildLink=function(){o.$link=o.$controlsWrapper.find("a.swts-icon-link"),o.$linkWrapper=n('<li class="gutenberg-hidden"><input type="text" placeholder="Type link here"/></li>'),o.$linkInput=o.$linkWrapper.find("input"),o.$link.parent().parent().append(o.$linkWrapper)},o.initLinkListeners=function(){o.$linkInput.on("keypress",function(t){13===t.which&&o.onLinkEnter()}),o.$b.on("mousedown.gutenberg",function(t){o.hide(o.$linkWrapper,!0),n(e).one("mousedown.gutenberg",function(){o.hide(o.$linkWrapper,!0)}).one("mouseup.gutenberg",function(){o.clicked&&o.selectionIsLink()?o.$link.removeClass("swts-icon-link").addClass("swts-icon-unlink"):o.clicked&&!o.selectionIsLink()&&o.$link.removeClass("swts-icon-unlink").addClass("swts-icon-link")})})},o.onLinkEnter=function(){var n=t.getSelection();o.$linkInput.blur(),n.removeAllRanges(),n.addRange(o.$linkInput.data("selection")),e.execCommand("createlink",!1,o.$linkInput.val()),o.hide(o.$linkWrapper,!0),o.$link.removeClass("swts-icon-link").addClass("swts-icon-unlink"),o.onTextEdit(o.$b.html())},o.buildLink(),o.initLinkListeners()},command:function(o){o.selectionIsLink()?(e.execCommand("unlink"),o.$link.removeClass("swts-icon-unlink").addClass("swts-icon-link"),o.onTextEdit(o.$b.html())):(o.$linkInput.data("selection",t.getSelection().getRangeAt(0)),o.hide(o.$linkWrapper,!1),o.$linkInput.focus())}}},h=function(t,e,o){var i=this;"function"==typeof e&&(o=e,e={}),i.$b=n(t),i.initialVal=i.$b.html(),i.curVal,i.commands=e.commands,i.onChange=o,i.onChangeDelay=e.onChangeDelay||500,i.stopLinks=e.stopLinks,i.allowNewLine=e.allowNewLine,i.allowTags=i.allowNewLine?!0:e.allowTags,i.typingTimer,i.$b.attr("contenteditable",!0),i.buildDOM(),i.initListeners()};h.prototype.buildDOM=function(){var t,e=this;if(e.commands){e.$controlsWrapper=n('<ul class="gutenberg-ctrl gutenberg-hidden">');for(var o in e.commands){var i=e.commands[o],s=f[i];s&&(t='<li><a href="#'+i+'" class="'+s.icon+'"></a></li>',e.$controlsWrapper.append(t),s.additionalInit&&s.additionalInit(e))}e.$links=e.$controlsWrapper.find("a"),r.push(e.$controlsWrapper),a.append(e.$controlsWrapper)}},h.prototype.initListeners=function(){var t=this;t.$b.on("paste.gutenberg",function(e){t.onPaste(this,e)}).on("keydown.gutenberg",function(e){switch(e.which){case 8:setTimeout(function(){t.sanitizeBackspace()},0);break;case 13:!t.allowNewLine&&e.preventDefault();break;case 27:t.restoreText()}}).on("keyup.gutenberg",function(e){t.onTextEdit(t.$b.html())}).on("mousedown.gutenberg",function(o){t.clicked=!0,o.stopPropagation(),p(),n(e).one("mousedown.gutenberg",function(t){p()}).one("mouseup.gutenberg",function(e){t.onTextSelect(e)})}).on("focus.gutenberg",function(e){t.curVal=t.$b.html()}),t.stopLinks&&t.$b.on("click",function(t){t.preventDefault(),t.stopPropagation()}),t.$controlsWrapper&&(t.$controlsWrapper.on("mousedown.gutenberg",function(t){t.stopPropagation()}).on("mouseup.gutenberg",function(t){t.stopPropagation()}),t.$controlsWrapper.on("click.gutenberg","a",function(e){e.preventDefault(),t.onToolClick(this.href.split("#")[1])}))},h.prototype.onPaste=function(t,o){e.execCommand("insertText",!1,o.originalEvent.clipboardData.getData("text/plain")),o.preventDefault(),o.stopPropagation(),this.onTextEdit(this.$b.html())},h.prototype.sanitizeBackspace=function(){this.$b.find("span").each(function(){this.style&&n(this).contents().unwrap()})},h.prototype.onTextSelect=function(t){var e=this,o=e.getRange();if(e.$controlsWrapper&&o.startOffset!==o.endOffset&&e.clicked){if(e.prevStartOffset===o.startOffset&&e.prevEndOffset===o.endOffset)return void e.hide(e.$controlsWrapper,!0);e.hide(e.$controlsWrapper,!1);var n=e.getSelectionPosition(t);e.$controlsWrapper.css({left:n.left,top:n.top}),e.clicked=!0,e.prevStartOffset=o.startOffset,e.prevEndOffset=o.endOffset}},h.prototype.onToolClick=function(t){f[t].command(this)},h.prototype.onTextEdit=function(t){var e=this;clearTimeout(e.typingTimer),e.typingTimer=setTimeout(function(){e.updateContent(t)},e.onChangeDelay)},h.prototype.updateContent=function(t){this.allowTags||(t=t.replace(l,"")),this.curVal!==t&&(this.onChange(t),this.curVal=t)},h.prototype.restoreText=function(){this.$b.html(this.initialVal),this.onTextEdit(this.initialVal)},h.prototype.val=function(t){this.$b.html(t)},h.prototype.getRange=function(){if(t.getSelection){var o=t.getSelection();if(o.rangeCount>0)return o.getRangeAt(0);
}else if(e.selection&&e.selection.createRange)return e.selection.createRange();return null},h.prototype.getSelectionPosition=function(t){var o=this,n=o.getRange().getBoundingClientRect(),i=t.pageX-o.$controlsWrapper.width()/2,s=e.body.scrollTop||e.documentElement.scrollTop;0>i&&(i=10);var a=s+n.top-o.$controlsWrapper.height()-10;return{left:i,top:a}},h.prototype.remove=function(){var t=this;t.$b.off(".gutenberg"),t.$b.attr("contenteditable",!1),t.$controlsWrapper&&t.$controlsWrapper.remove(),u(t.$controlsWrapper)},h.prototype.hide=function(t,e){e?t.addClass("gutenberg-hidden"):t.removeClass("gutenberg-hidden")},s("ui/gutenberg",h)}(t,e),function(t,e,o){var n,a=i("$"),r=i("swts"),l=i("util/inherits"),p=i("ui/bar"),u=function(t,e){var o=this;o.$b=a(t),o.$progress=a('<div class="upload-progress"></div>'),o.job=e.job,o.resource=e.resource||"file",o.delay=e.progressDelay||500,o.start=e.start,o.done=e.done,o.progress=e.progress,o.mouseover=e.mouseover,o.mouseout=e.mouseout,o.maxFiles=e.maxFiles||1,o.accept=e.accept,o.uploading=!1,o.$b.on({"dragover.upload":function(t){o.ondragover(t)},"drop.upload":function(t){o.ondrop(t)},"mouseout.upload":function(t){o.onmouseout(t)}})};l(u,p),u.prototype.ondragover=function(t){t.preventDefault(),n&&n.removeClass("upload-drop"),n=this.$b.addClass("upload-drop"),this.mouseover&&this.mouseover()},u.prototype.ondrop=function(t){t.preventDefault();var e=this;if(e.$b.removeClass("upload-drop"),n=o,e.r)return this.done(new Error("Upload in progress"));var i=t.originalEvent.dataTransfer.files;i.length&&i.length<=e.maxFiles&&(e.accept?e.test(i,t.target):e.upload(i,t.target)),e.mouseout&&e.mouseout()},u.prototype.onmouseout=function(){this.$b.removeClass("upload-drop"),this.mouseout&&this.mouseout(),n=o},u.prototype.test=function(t,e){for(var o=!0,n=0,i=t.length;i>n;n++)if(!this.accept.test(t[n].name)){o=!1;break}o?this.upload(t,e):this.done(new Error("Not acceptable"))},u.prototype.upload=function(t,e){var o=this,n={resource:o.resource,method:"create",body:{job:o.job},files:t,onprogress:function(t){o.onprogress(t)}};o.send(n,e)},u.prototype.onprogress=function(t){var e=t.loaded/t.total*100;this.$progress.css("width",e+"%"),this.progress&&this.progress(t,e)},u.prototype.willSend=function(){var t=this;t.$b.append(t.$progress),t.startTimeout=setTimeout(function(){t.$b.addClass("upload-uploading")},t.delay),t.start&&t.start()},u.prototype.send=function(t,e){var o=this;o.willSend(),o.r=r.c(t,function(t,n){o.didSend(),o.done(t,n,e)})},u.prototype.didSend=function(){var t=this;t.r=o,clearTimeout(t.startTimeout),t.$b.removeClass("upload-uploading"),setTimeout(function(){t.$progress.detach()},t.delay)},u.prototype.abort=function(){this.r&&this.r.abort()},u.prototype.remove=function(){this.$b.off(".upload"),this.$progress.remove(),this.$progress=o,this.$b=o},s("ui/upload",u)}(t,e),function(t,e,o){var n=i("$"),s=i("ui/buttons"),a=i("ui/nipple"),r=i("ui/input"),l=i("ui/cover"),p=i("ui/selectah"),u=i("ui/gregory"),c=i("ui/gregory/dateinput"),d=i("ui/gutenberg"),f=i("ui/upload");n(e).ready(function(){a.defaults({items:{tools:{item:"tools",options:{title:"Options",icon:"swts-icon-dots"},remove:{confirm:!0,title:"Delete",icon:"swts-icon-trash"}},active:{item:"toggle",title:{on:"Important",off:"Not important"}},"status/draft":{title:"Draft"},"status/published":{title:"Published"}}});var t=(s.add("id",function(t){console.log("add button",t)}).appendTo("#simple-buttons"),s.remove("id",function(t){console.log("remove button",t)}).appendTo("#simple-buttons"),new r({title:"Title"},function(t){console.log("Input",t)}).appendTo("#input-fields"),new r({title:"Slug",slugify:!0},function(t){console.log("Slug",t)}).appendTo("#input-fields"),/^\d{2,20}$/),e=/^https?:\/\/(?:www\.)?vimeo.com\/(\d+)($|\/)/,o=(new r({title:"Vimeo id",rx:t,onPaste:function(t){var o=this;setTimeout(function(){var t=o.value.match(e);t&&(o.value=t[1])},32)}},function(t){console.log("Vimeo Id",t)}).appendTo("#input-fields"),new l("body"),new a({popup:"e",size:"medium",menu:!0,autoHide:!0,items:{edit:{title:"Edit"},profile:{title:"Username"},logout:{title:"Logout"}}},{edit:function(){console.log("Edit mode")},profile:function(){console.log("User profile")},logout:function(){console.log("Logout")}}).addClass("swts-user").appendTo("#nipple"),new a({status:function(t){console.log("Nipple status",t),this.removeClass("draft published").addClass(t)},remove:function(){console.log("Nipple remove")},options:function(){console.log("Nipple options")},active:function(t){console.log("Nipple toggle state",t)}}).val("status/draft").addClass("draft").appendTo("#nipple"));o.items.active.val(!0);new a({popup:"n",items:{slug:{item:"input",title:"Slug",slugify:!0},title:{item:"input",title:"Title",value:"Item title"}}},{slug:function(t){console.log("slug",t)},title:function(t){console.log("title",t)}}).addClass("swts-options").appendTo("#nipple"),new p([{draft:"Draft"},{ready:"Ready"},{published:"Published"}],function(t){console.log("Selectah",t)}).addClass("simple").appendTo("#selectah"),new p([{app:"Application"},{code:"Code"},{design:"Design"},{photography:"Photography"},{web:"Web"}],{multiple:!0,keepOrder:!0,selected:["app","design"]},function(t){console.log("Selectah",t)}).addClass("multi").appendTo("#selectah"),new u(function(t){console.log("Gregory",t)}).val(new Date).appendTo("#gregory"),new c({title:"Publication date"},function(t){console.log("Date input",t)}).appendTo("#dateinput"),new d("#gutenberg > p",function(t){console.log("Gutenberg",t)}),new f("#upload","sponsor",{maxFiles:1,start:function(){console.log("Upload start")},progress:function(t,e){console.log("Upload progress",e)},done:function(t,e,o){console.log("Upload done",t,e,o)}})})}(t,e)}(window,document);