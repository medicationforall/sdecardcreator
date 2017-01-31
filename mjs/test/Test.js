Test=function(){

  this.load=function(){
    console.log('call load for test');
    this.each('load');
  }

}

var inheritsFrom = function (child, parent) {
   	child.prototype = Object.create(parent.prototype);
};

//setup inheritance from Base
inheritsFrom(Test, Core);
