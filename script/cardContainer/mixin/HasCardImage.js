function HasCardImage(){
  this.defaultAvatarMap={
    'hero':'image/barbsilo.png',
    'monster':'image/dragonsilo.png',
    'pet':'image/bunnysilo.png',
    'loot':'image/armor.png',
    'treasure':'image/weapon.png',
    'wonder':'image/wonder.png',
    'explore':'image/trap.png',
    'timeout':'image/gorosilo.png',
    'command':'image/koboldgoupsilo.png',
    'arcade':'image/koboldgoupsilo.png'
  };

  /**
   *
   */
  this.setBackground=function(background){
    this.data.background=background;
    this.node.find('.background').css({'background':'url('+background+') no-repeat','background-size':'100% 100%'});
  };


  /**
   *
   */
  this.setBackgroundFlip=function(backgroundFlip){
    this.data.backgroundFlip = backgroundFlip;

    if(backgroundFlip){
      this.node.find('.background').css('transform','scaleX(-1)');
    }else{
      this.node.find('.background').css('transform','');
    }
  };


  /**
   *
   */
  this.setImageSource=function(source,data){
    this.data.imageSource=source;

    //reset creepSpawn span back to display none.
    this.node.find('.item .creepSpawn').css('display','');

    if(source==='default'){
      this.setDefaultAvatar(this.data.type);
    }else if(source==='local'){
      this.data.avatarData=data;
      this.setAvatar(data);
    }else if(source==='remote'){
      this.data.remoteAvatar=data;
      this.setAvatar(data);
    }else if(source==='creep'){
      this.data.creepSpawn = data;
      this.setAvatar('image/creepSpawn.png');
      this.node.find('.item .creepSpawn').text(data).css('display','inline');
    }
  };


  /**
   *Sets the default avatar based on the defaultAvatar hashmap.
   *@param v string Card type
   *@todo should lowercase value and should throw exception if value is not in hashmap.
   */
  this.setDefaultAvatar=function(v){
    this.setAvatar(this.defaultAvatarMap[v]);
  };


  /**
   *Sets the avatar image src attribute.
   *@param v string absolute, relative path, or raw image data.
   */
  this.setAvatar=function(v){
    var character = this.node.find('.card .character');
    character.attr('src', v);
  };

}
