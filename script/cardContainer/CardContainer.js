function CardContainer(){
  console.log('create Card Container');
  this.node =undefined;

  this._construct=function(){
    this.node = $('.cardContainer');
    this.node.data('node',this);
  };

  this._construct();
}
