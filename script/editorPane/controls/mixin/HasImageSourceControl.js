/**
 *   SDE Card Creator source file HasImageSourceControl,
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
 * Image Source Control.
 * @mixin
 */
function HasImageSourceControl(){
  this.imageSourceControl = this.node.find('input[name="imageSource"]');
  this.remoteAvatar = this.node.find('input[name="rCharacter"]');
  this.localAvatar = this.node.find('input[name="character"]');
  this.creepSpawn = this.node.find('input[name="creepSpawn"]');


  /**
   * Image source radio selection.
   */
  this.imageSourceControl.on('change',$.proxy(function(coreNode,event){
    coreNode.setImageSource($(this).val());
  },null,this));


  /**
   * Remote avatar text input.
   */
  this.remoteAvatar.on('input',$.proxy(function(coreNode,event){
    coreNode.node.find('input[name="imageSource"][value="remote"]').prop("checked", true).trigger('change');
  },null,this));


  /**
   * Creep text input.
   */
  this.creepSpawn.on('input',$.proxy(function(coreNode,event){
    coreNode.node.find('input[name="imageSource"][value="creep"]').prop("checked", true).trigger('change');
  },null,this));


  /**
   * Local avatar file section.
   */
  this.localAvatar.on('change',$.proxy(function(coreNode,event){
    coreNode.node.find('input[name="imageSource"][value="local"]').prop("checked", true).trigger('change');
  },null,this));


  /**
   * Set card imageSource.
   * @param {string} imageSource - Card imageSource.
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
   * Read image data from a URL.
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


  /**
   * Sync imageSource, removeAvatar, and creepSpawn from selected card.
   */
  this.syncImageSource=function(data){
    console.log('syncImageSource',data);
    if(data.imageSource!==undefined){
      this.imageSourceControl.filter('[value="'+data.imageSource+'"]').prop('checked', true);
    }

    if(data.remoteAvatar!==undefined){
      this.remoteAvatar.val(data.remoteAvatar);
    }

    if(data.creepSpawn!==undefined){
      this.creepSpawn.val(data.creepSpawn);
    }
  };
}
