/**
 *   SDE Card Creator source file HasBackgroundControl,
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
 * Background Control.
 * @mixin
 */
function HasBackgroundControl(){
  this.backgroundControl = this.node.find('select[name="background"]');
  this.backroundFlipControl = this.node.find('.backgroundFlip');


  /**
   * Background selection.
   */
  this.backgroundControl.on('change',$.proxy(function(coreNode,event){
    coreNode.setBackground($(this).val());
  },null,this));


  /**
   * Background flip icon click.
   */
  this.backroundFlipControl.on('click',$.proxy(function(coreNode,event){
    event.preventDefault();
    if($(this).hasClass('inactive')){
      $(this).removeClass('inactive').addClass('active');
      coreNode.setBackgroundFlip(true);
    }else{
      $(this).removeClass('active').addClass('inactive');
      coreNode.setBackgroundFlip(false);
    }
  },null,this));


  /**
   * Set card background.
   * @param {string} background - Card background.
   */
  this.setBackground=function(background){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setBackground(background);
  };


  /**
   * Set card backgroundFlip.
   * @param {string} backgroundFlip - Card backgroundFlip.
   */
  this.setBackgroundFlip=function(backgroundFlip){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setBackgroundFlip(backgroundFlip);
  };

  this.syncBackground=function(data){
    if(data.background!==undefined){
      this.backgroundControl.val(data.background);
    }

    if(data.backgroundFlip!==undefined){
      if(data.backgroundFlip===true){
        this.backroundFlipControl.removeClass('inactive').addClass('active');
      }else{
        this.backroundFlipControl.removeClass('active').addClass('inactive');
      }
    }
  };
}
