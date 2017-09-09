function MainMenu(){
  this.node=undefined;

  this._constructor = function(){
    this._setup();
  };

  this._setup=function(){
    this.node = $('.menuBar');
    //HasGatherData.call(this);
    //HasLoadData.call(this);
    HasOpenMenuButtons.call(this);
    //HasAddMenu.call(this);
    HasSaveMenu.call(this);
    HasLoadMenu.call(this);
    //HassRollButton.call(this);
    //HasListNameInput.call(this);
    //HasCustomizeMenu.call(this);

    /*$.getJSON('config.json',$.proxy(function(data){
      if(data.enableShare){
        this.node.find('.shareButton').css('display','inline-block');
        this.servlet=data.servlet;
        HasShare.call(this);
      }
    },this));*/

    //set coreNode
    $.data(this.node[0],'coreNode',this);
  };

  this._constructor();
}
