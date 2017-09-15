function HasCardHeader(){
  /**
   *
   */
  this.setTitle=function(title){
    console.log('card set title',title);
    if(title !== undefined && title !==''){
      this.data.title = title;
      this.node.find('.title').text(title);
    }else{
      this.data.title=undefined;
      this.node.find('.title').text('title');
    }
  };

  /**
   *
   */
  this.setSubTitle=function(subTitle){
    console.log('card set subTitle',subTitle);
    if(subTitle !== undefined && subTitle !==''){
      this.data.subTitle = subTitle;
      this.node.find('.subTitle').text(subTitle);
    }else{
      this.data.subTitle=undefined;
      this.node.find('.subTitle').text('subTitle');
    }
  };


  /**
   *
   */
  this.setMove=function(move){
    console.log('card set move',move);
    if(move !== undefined && move !==''){
      this.data.move = move;
      this.node.find('.move').text(move);
    }else{
      this.data.move=undefined;
      this.node.find('.move').text('6');
    }
  };


  /**
   *
   */
  this.setActions=function(actions){
    console.log('card set actions',actions);
    if(actions !== undefined && actions !==''){
      this.data.actions = actions;
      this.node.find('.actions').text(actions);
    }else{
      this.data.move=undefined;
      this.node.find('.actions').text('3');
    }
  };
}
