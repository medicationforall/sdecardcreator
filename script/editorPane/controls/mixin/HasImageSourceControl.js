function HasImageSourceControl(){
  this.imageSourceControl = this.node.find('input[name="imageSource"]');
  this.remoteAvatar = this.node.find('input[name="rCharacter"]');
  this.localAvatar = this.node.find('input[name="character"]');
  this.creepSpawn = this.node.find('input[name="creepSpawn"]');

  /**
   *
   */
  this.imageSourceControl.on('change',$.proxy(function(coreNode,event){
    console.log('changed image source',$(this).val());
    coreNode.setImageSource($(this).val());
  },null,this));


  /**
   *
   */
  this.remoteAvatar.on('input',$.proxy(function(coreNode,event){
    coreNode.node.find('input[name="imageSource"][value="remote"]').prop("checked", true).trigger('change');
  },null,this));


  /**
   *
   */
  this.creepSpawn.on('input',$.proxy(function(coreNode,event){
    coreNode.node.find('input[name="imageSource"][value="creep"]').prop("checked", true).trigger('change');
  },null,this));


  /**
   *
   */
  this.localAvatar.on('change',$.proxy(function(coreNode,event){
    coreNode.node.find('input[name="imageSource"][value="local"]').prop("checked", true).trigger('change');
  },null,this));


  /**
   *
   */
  this.setImageSource=function(source){
    var cardNode = $('.cardGroup.selected').data('node');
    if(source==='default'){
      cardNode.setImageSource(source);
    }else if(source==='remote'){
      cardNode.setImageSource(source,this.node.find('input[name="rCharacter"]').val());
    }else if(source==='local'){
      this.readURL(this.node.find('input[name="character"]')[0]);
    }else if(source==='creep'){
      cardNode.setImageSource(source,this.node.find('input[name="creepSpawn"]').val());
    }
  };


  /**
   *
   */
  this.readURL = function(input){
    if (input.files && input.files[0]) {
      var cardNode = $('.cardGroup.selected').data('node');
      var reader = new FileReader();
      reader.onload = $.proxy(function (cardNode,e) {
        cardNode.setImageSource('local',e.target.result);
      },undefined,cardNode);
      reader.readAsDataURL(input.files[0]);
    }
  };
}
