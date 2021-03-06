/*
  Copyright (c) 2011 Cameron McEfee

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function ($) {

  var maxfps = 25;
  var delay = 1 / maxfps * 1000 // delay in ms
  var lastRender = new Date().getTime();
  var layers    = [],
      docWidth  = $(window).width(),
      docHeight = $(window).height()

  $(window).resize(function() {
      docWidth  = $(window).width()
      docHeight = $(window).height()
  })

  // Public Methods
  $.fn.plaxify = function (params) {

    return this.each(function () {

      var layer = {"xRange":0,"yRange":0,"invert":0,"stopAtX":0,"stopAtY":0};

      for (var param in params) {
        if (layer[param] == 0) {
          layer[param] = params[param]
        }
      }

      // Add an object to the list of things to parallax
      layer.obj    = $(this)
      layer.startX = this.offsetLeft
      layer.startY = this.offsetTop

      if(layer.invert == false){
        layer.startX -= Math.floor(layer.xRange/2)
        layer.startY -= Math.floor(layer.yRange/2)
      } else {
        layer.startX += Math.floor(layer.xRange/2)
        layer.startY += Math.floor(layer.yRange/2)
      }
      layers.push(layer)
    })
  }

  function plaxifier(e) {
    if (new Date().getTime() < lastRender + delay) return;
      lastRender = new Date().getTime();

    var x = $(window).scrollLeft() + docWidth / 2,
        y = $(window).scrollTop() + docHeight / 2;

    var hRatio = x/docWidth,
        vRatio = y/docHeight,
        layer, i;

    for (i = layers.length; i--;) {
      layer = layers[i];
      var tmpx, tmpy;
      if (layer.invert != true) {
        tmpx = layer.startX + (layer.xRange*hRatio);
        tmpy = layer.startY + (layer.yRange*vRatio);

        if (layer.stopAtX) {
          if (layer.stopAtX === tmpx) {
            return false;
          }
          else if (layer.stopAtX > tmpx) {
            layer.obj.css({left:layer.stopAtX});
          }
          else {
            layer.obj.css({left:tmpx});
          }
        }
        else {
          layer.obj.css({left:tmpx});
        }

        if (layer.stopAtY) {
          if (layer.stopAtY === tmpy) {
            return false;
          }
          else if (layer.stopAtY > tmpy) {
            layer.obj.css({top:layer.stopAtY});
          }
          else {
            layer.obj.css({top:tmpy});
          }
        }
        else {
          layer.obj.css({top:tmpy});
        }

      } else {
        tmpx = layer.startX - (layer.xRange*hRatio);
        tmpy = layer.startY - (layer.yRange*vRatio);

        if (layer.stopAtX) {
          if (layer.stopAtX === tmpx) {
            return false;
          }
          else if (layer.stopAtX > tmpx) {
            layer.obj.css({left:layer.stopAtX});
          }
          else {
            layer.obj.css({left:tmpx});
          }
        }
        else {
          layer.obj.css({left:tmpx});
        }

        if (layer.stopAtY) {
          if (layer.stopAtY === tmpy) {
            return false;
          }
          else if (layer.stopAtY > tmpy) {
            layer.obj.css({top:layer.stopAtY});
          }
          else {
            layer.obj.css({top:tmpy});
          }
        }
        else {
          layer.obj.css({top:tmpy});
        }
      }
    }
  }

  $.plax = {
    enable: function(){
      $(window).bind('scroll', function (e) {
        plaxifier(e)
      })
    },
    disable: function(){
      $(window).unbind('scroll')
      window.ondevicemotion = undefined;
    }
  };
})(function () {
  return typeof jQuery !== 'undefined' ? jQuery : ender
}())
