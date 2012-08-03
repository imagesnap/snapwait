// Copyright (c) 2012 ImageSnap Inc.
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



SnapWait = function(element, options){

  this.element = element;
  this.currentFrame = 0;
  this.timer = false;

  this.options = $.extend({
    // more cool frames here: http://stackoverflow.com/questions/2685435/cooler-ascii-spinners
    // frames : ['●○○','○●○','○○●','○○○'],
    frames : '. o O @ *'.split(' '),
    timeout : 120
  },options);

  this.txt = function(label){
    // todo: make this work properly without arguments
    // instead of repeating this line twice
    if(typeof label == 'undefined'){
      return this.element[this.element.is('input') ? 'val' : 'text']();
    }else{
      return this.element[this.element.is('input') ? 'val' : 'text'](label);
    }
  }

  // this is kinda dirty, maybe a better way
  this.originalText = this.txt();

  this.step = function(){
    // todo: make private
    thisFrame = this.options.frames[(this.currentFrame++) % this.options.frames.length];
    this.txt(thisFrame);
  };

  this.isWaiting = function(){
    return !!this.timer;
  };

  this.wait = function(){
    if(!this.timer){
      this.step(); // this makes it start instantly
      this.timer = setInterval($.proxy(this.step,this),this.options.timeout);
      return true;
    }else{
      return false;
    }
  };

  this.stopWaiting = function(){
    if(!this.timer){
      return false;
    }else{
      this.currentFrame = 0;
      clearTimeout(this.timer);
      this.timer = false;
      this.txt(this.originalText);
      return true;
    }
  };

  return this;

};
