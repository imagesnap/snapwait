// copyright Nathan Manousos nathanm@gmail.com

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
