function HasSubTitleControl(){
  this.subTitleControl = this.node.find('input[name="subTitle"]');


/**
 *
 */
  this.subTitleControl.on('input',$.proxy(function(coreNode,event){
    console.log('change subTitle',$(this).val());
    coreNode.setCardSubTitle($(this).val());
  },null,this));


/**
 *
 */
  this.setCardSubTitle=function(subTitle){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setSubTitle(subTitle);
  };
}
