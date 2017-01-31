Test2=function(){

  this.load=function(){
    console.log('call load for test2');
    this.each('load');
  }

}

var inheritsFrom = function (child, parent) {
   	child.prototype = Object.create(parent.prototype);
};

//setup inheritance from Base
inheritsFrom(Test2, Test);
