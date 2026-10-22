/**
 *   SDE Card Creator source file HasStatsControl,
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
 * Stats Control.
 * @mixin
 */
function HasStatsControl(){
	this.strControl = this.node.find('input[name="STR"]');
	this.armControl = this.node.find('input[name="ARM"]');
	this.willControl = this.node.find('input[name="WILL"]');
	this.dexControl = this.node.find('input[name="DEX"]');

	this.woundsControl = this.node.find('input[name="wounds"]');
	this.skullsControl = this.node.find('input[name="skulls"]');
	this.potionsControl = this.node.find('input[name="potions"]');
	this.petCostControl = this.node.find('input[name="petCost"]');


  /**
   * Str text input.
   */
  this.strControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('STR',$(this).val());
  },null,this));


  /**
   * Arm text input.
   */
  this.armControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('ARM',$(this).val());
  },null,this));


  /**
   * Will text input.
   */
  this.willControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('WILL',$(this).val());
  },null,this));


  /**
   * Dex text input.
   */
  this.dexControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setStat('DEX',$(this).val());
  },null,this));


  /**
   * Wounds text input.
   */
  this.woundsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setWounds($(this).val());
  },null,this));


  /**
   * Potions text input.
   */
  this.potionsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setPotions($(this).val());
  },null,this));


  /**
   * Pet Cost text input.
   */
  this.petCostControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setPetCost($(this).val());
  },null,this));


  /**
   * Skulls text input.
   */
  this.skullsControl.on('input',$.proxy(function(coreNode,event){
    coreNode.setSkulls($(this).val());
  },null,this));


  /**
   * Set card stat.
   * @param {string} stat - Card stat name. Valid valus: str, will, dex, arm.
   * @param {string} value - Card value.
   */
  this.setStat=function(stat,value){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setStat(stat,value);
  };


  /**
   * Set card wounds.
   * @param {string} wounds - Card wounds.
   */
  this.setWounds=function(wounds){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setWounds(wounds);
  };

	/**
	* Set card potions.
	* @param {string} potions - Card potions.
	*/
	this.setPotions=function(potions){
		var cardNode = $('.cardGroup.selected').data('node');
		cardNode.setPotions(potions);
	};

  
  /**
   * Set card petCost.
   * @param {string} petCost - Card petCost.
   */
  this.setPetCost=function(petCost){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setPetCost(petCost);
  };

  /**
   * Set card skulls.
   * @param {string} skulls - Card skulls.
   */
  this.setSkulls=function(skulls){
    var cardNode = $('.cardGroup.selected').data('node');
    cardNode.setSkulls(skulls);
  };

  /**
   * Sync stats from selected card.
   */
  this.syncStats=function(data){
    console.log('syncStats',data);
    if(data.STR!==undefined){
      this.strControl.val(data.STR);
    }

    if(data.DEX!==undefined){
      this.dexControl.val(data.DEX);
    }

    if(data.ARM!==undefined){
      this.armControl.val(data.ARM);
    }

    if(data.WILL!==undefined){
      this.willControl.val(data.WILL);
    }

    if(data.wounds!==undefined){
      this.woundsControl.val(data.wounds);
    }

    if(data.potions!==undefined){
      this.potionsControl.val(data.potions);
    }

    if(data.petCost !== undefined){
      this.setPetCost(data.petCost);
    }

    if(data.skulls!==undefined){
      this.skullsControl.val(data.skulls);
    }
  };
}
