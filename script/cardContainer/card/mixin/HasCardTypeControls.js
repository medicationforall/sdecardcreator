function HasCardTypeControls(){

  /**
   *
   */
  this.setCardType=function(type){
    console.log('card set type',type);
    this.data.type=type;
    this.setDisplay(this.node.find('.card'),type);
    this.setType(type);

    if(this.data.imageSource === undefined || this.data.imageSource === 'default'){
      this.setDefaultAvatar(type);
    }
  };

  /**
   *Sets the card type.
   *@param type string Has to be a valid card type.
   *@todo the types can be built from a util or mixin.
   *@todo verify that type is valid
   */
  this.setType=function(type){
    //console.log('set card type',type);
    this.node.find('.card').removeClass('hero monster pet treasure loot wonder explore arcade command timeout').addClass(type).css('display','');
  };


  /**
   *Sets the card scale for the card where 1 is 100%.
   *@param scale float
   */
  this.setScale=function(scale){
    this.data.scale=scale;
    var cards = this.node.find('.card');
    cards.css({'transform':'scale('+scale+','+scale+')','transform-origin':'top left'});
    this.node.find('.cardDiv').css({'width':(cards.width()*parseFloat(scale)), 'height':(cards.height()*parseFloat(scale))});
    this.node.css({'width':((cards.width()*parseFloat(scale))*2)+40, 'height':(cards.height()*parseFloat(scale))+20});
  };


  /**
   *
   */
  this.setRegion=function(region){
    this.data.region=region;
    var cards = this.node.find('.card');
    cards.removeClass('red green purple yellow').addClass(region);
  };


  /**
   *Sets the card orientation specifically used for loot and treasure cards.
   *@param value string affinity ruby, saphire, emerald, citrine
   *@todo should lowercase value and throw exception is not a valid value.
   */
  this.setOrientation=function(orientation){
    this.data.orientation=orientation;
    var card = this.node;

    //sort out the appropriate class name for the divs
    card.find('.card .item .contentBorder, .card .item .placeHolder').removeClass('ruby sapphire citrine emerald').addClass(orientation);

    //re-order the divs if necessary
    if(orientation === 'ruby' || orientation === 'citrine'){
      card.find('.card .item .placeHolder').before(card.find('.card .item .contentBorder'));
    }else if(orientation === 'sapphire' || orientation === 'emerald'){
      card.find('.card .item .contentBorder').before(card.find('.card .item .placeHolder'));
    }
  };
}
