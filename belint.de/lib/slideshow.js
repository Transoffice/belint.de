/*!
 * @name        jQuery Slideshow
 * @author      Matt Hinchliffe <http://i-like-robots.github.com/jQuery-Slideshow/>
 * @modified    Tuesday, April 23rd, 2013, 11:54:26
 * @version     1.6.3
 */(function(t,s){"use strict";function i(s,i){return this.target=s,this.$target=t(s),this.opts=t.extend({},e,i,this.$target.data()),this.$carousel=this.$target.children(this.opts.carousel),this.$items=this.$carousel.children(this.opts.items),this.count=this.$items.length,this.count>1&&this._init(),this}var e={carousel:".carousel",items:".slide",slideWidth:!1,jumpQueue:!0,offset:1,skip:!0,pagination:!1,gestures:!1,auto:4e3,autostop:!0,hoverPause:!1,loop:!1,nextText:"Next",previousText:"Previous",transition:"scroll",speed:600,easing:"swing",visible:1,onupdate:!1,oncomplete:!1};i.prototype._init=function(){var s=this;if(this.$wrapper=this.$carousel.wrap('<div style="position:relative;overflow:hidden;">').parent(),this.opts.pagination){this.$pagination=t('<ul class="slides-pagination">');for(var i=0,e=this.count;e>i;i++)this.$pagination.append('<li><a href="#" data-slides="'+i+'">'+(i+1)+"</a></li>");this.$target.append(this.$pagination)}this.opts.skip&&(this.$prev=t('<a href="#" class="slides-prev" data-slides="previous">'+this.opts.previousText+"</a>"),this.$next=t('<a href="#" class="slides-next" data-slides="next">'+this.opts.nextText+"</a>"),this.$target.append(this.$next,this.$prev)),(this.opts.pagination||this.opts.skip)&&this.$target.on("click.slides","[data-slides]",function(i){i.preventDefault();var e=t(this);e.hasClass("disabled")||s.to(e.data("slides"),!0)}),this.redraw(),this.opts.gestures&&"ontouchstart"in document.documentElement&&(this.target.addEventListener("touchstart",function(t){s.t={x1:t.touches[0].pageX,el:t.touches[0].target,dif:0}},!1),this.target.addEventListener("touchmove",function(t){s.t.x2=t.touches[0].pageX,s.t.dif=Math.abs(s.t.x1-s.t.x2),t.preventDefault()},!1),this.target.addEventListener("touchend",function(){s.t.x2>0&&s.t.dif>30&&s.to(s.t.x1-s.t.x2>0?"next":"previous",!0)},!1)),this.opts.auto&&(this.opts.hoverPause&&this.$target.hover(function(){s.stopped||s.pause()},function(){s.paused&&s.play()}),this.play())},i.prototype._oncomplete=function(){this.current=this.future,this.opts.pagination&&this.$pagination.children().removeClass("selected").slice(this.current,this.current+this.opts.visible).addClass("selected"),this.opts.skip&&(this.hasNext()||this.opts.loop?this.$next.removeClass("disabled"):this.$next.addClass("disabled"),this.hasPrevious()||this.opts.loop?this.$prev.removeClass("disabled"):this.$prev.addClass("disabled")),this.opts.oncomplete&&this.opts.oncomplete.call(this,this.current)},i.prototype.hasNext=function(){return this.current<this.count-1},i.prototype.hasPrevious=function(){return this.current>0},i.prototype.next=function(){this.to(this.current+1)},i.prototype.previous=function(){this.to(this.current-1)},i.prototype.to=function(t,s){if(this.opts.jumpQueue)this.$items.stop(!0,!0);else if(this.$items.queue("fx").length)return;"next"===t?t=this.current+1:"previous"===t&&(t=this.current-1),"number"!=typeof t&&(t=parseInt(t,10)),t>=this.count?t=this.opts.loop?0:this.count-1:0>t&&(t=this.opts.loop?this.count-1:0),s&&!this.stopped&&(this.opts.autostop?this.stop():this.paused||this.play()),t!==this.current&&(this.future=t,this.transition.execute.call(this),this.opts.onupdate&&this.opts.onupdate.call(this,t))},i.prototype.redraw=function(t){this.transition&&this.transition.teardown.call(this),t&&(this.opts.transition=t),this.current=s,this.transition=o[this.opts.transition].call(this),this.to(this.opts.offset-1)},i.prototype.play=function(){var t=this;clearInterval(this.timeout),this.paused=this.stopped=!1,this.timeout=setInterval(function(){t.to("next")},this.opts.auto)},i.prototype.pause=function(){this.paused=!0,clearInterval(this.timeout)},i.prototype.stop=function(){this.stopped=!0,this.paused=!1,clearInterval(this.timeout)};var o={crossfade:function(){var t=this;return this.$items.filter(function(s){return s!==t.opts.offset-1}).css("display","none"),this.execute=function(){var s=this.$items.eq(this.future),i=this.$items.eq(this.current).css({position:"absolute",left:0,top:0});s.fadeIn(this.opts.speed,this.opts.easing,function(){t._oncomplete.call(t)}),i.fadeOut(this.opts.speed,this.opts.easing,function(){i.css("position","")})},this.teardown=function(){this.$items.stop(!0,!0).removeAttr("style")},this},scroll:function(){var t=this;return this.$items.css({"float":"left",width:this.opts.slideWidth}),this.$carousel.css({minWidth:this.$items.outerWidth(!0)*this.count}),this.realcount=this.count,this.count-=this.opts.visible-1,this.execute=function(){var s=this.$items.eq(this.future).position().left+this.$wrapper.scrollLeft();this.$wrapper.animate({scrollLeft:s},this.opts.speed,this.opts.easing,function(){t._oncomplete.call(t)})},this.teardown=function(){this.count=this.realcount,this.$carousel.stop(!0,!0).removeAttr("style"),this.$items.removeAttr("style")},this}};t.fn.slides=function(s){return this.each(function(){t.data(this,"slides")||t.data(this,"slides",new i(this,s))})},"function"==typeof define&&define.amd?define(function(){return i}):"undefined"!=typeof module&&module.exports&&(module.exports=i)})(jQuery);