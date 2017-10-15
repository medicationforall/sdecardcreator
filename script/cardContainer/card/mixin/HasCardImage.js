/**
 *   SDE Card Creator source file HasCardImage,
 *   Copyright (C) 2017  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Card Image mixin.
 * @mixin
 */
function HasCardImage(){
  //map of what default string goes to what image path.
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
    'arcadeSolo':'image/koboldgoupsilo.png',
    'arcadeGang':'image/koboldgoupsilo.png'
  };

  //set image draggable.
  this.node.find('.card .front .character').draggable({containment:'parent'});


  /**
   * Set background image.
   * @param {string} background
   */
  this.setBackground=function(background){
    this.data.background=background;
    this.node.find('.background').css({'background':'url(image/background/'+background+') no-repeat','background-size':'100% 100%'});
  };


  /**
   * Set background flip flag.
   * @param {boolean} backgroundFlip - true, mirror the background horizontally, false remove the transform.
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
   * Set image source.
   * @param {string} source - source defined key, default,local,remote, or creep.
   * @param {string} data - Needed to fully describe the source. can be a file path or file data, or a creep number.
   */
  this.setImageSource=function(source,data){
    this.data.imageSource=source;

    //reset creepSpawn span back to display none.
    this.node.find('.item .creepSpawn').css('display','');

    if(source==='default'){
      this.setDefaultAvatar(this.data.cardType);
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
   * Sets the default avatar based on the defaultAvatar hashmap.
   * @param {string} v - Card type.
   */
  this.setDefaultAvatar=function(v){
    var value = this.defaultAvatarMap[v];

    if(value){
      this.setAvatar(value);
    } else{
      throw 'Default Avatar Map not found for:'+v;
    }
  };


  /**
   *Sets the avatar image src attribute.
   *@param {string} v absolute, relative path, or raw image data.
   */
  this.setAvatar=function(v){
    var character = this.node.find('.card .character');
    character.attr('src', v);
  };


  /**
   * Load image information from card data.
   * @param {object} data - Card Data.
   */
  this.loadCardImage=function(data){
    if(data.background !== undefined){
      this.setBackground(data.background);
    }

    if(data.backgroundFlip !== undefined){
      this.setBackgroundFlip(data.backgroundFlip);
    }

    if(data.imageSource !== undefined){
      if(data.imageSource==='default'){
        this.setImageSource(data.imageSource);
      } else if(data.imageSource==='local' && data.avatarData !==undefined){
        this.setImageSource(data.imageSource,data.avatarData);
      } else if(data.imageSource==='remote' && data.remoteAvatar !==undefined){
        this.setImageSource(data.imageSource,data.remoteAvatar);
      } else if(data.imageSource==='creep' && data.creepSpawn !==undefined){
        this.setImageSource(data.imageSource,data.creepSpawn);
      } else{
        throw 'Couldn\'t resolve image source for loadCardImage.'+
        ' imageSource '+data.imageSource+
        ' avatarData '+data.avatarData+
        ' remoteAvatar '+data.remoteAvatar+
        ' creep '+data.creep;
      }
    }
  };
}
