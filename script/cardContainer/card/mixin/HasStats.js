/**
 *   SDE Card Creator source file HasStats,
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
 * Card Stats mixin.
 * @mixin
 */
function HasStats(){
  this.strStat = new Stat("STR", 'hero monster pet', '3b 1sw');
  this.armStat = new Stat("ARM", 'hero monster pet', '2b 1r sh');
  this.willStat = new Stat("WILL", 'hero monster', '3b');
  this.dexStat = new Stat("DEX", 'hero monster', '3b');


  /**
   * Set Stat
   * @param {string} stat - Stat name.
   * @param {string} value - Stat Value.
   */
  this.setStat=function(stat,value){
    var statObject = this[stat+"Stat"];
    this.data[stat]=value;
    statObject.setValue(value);
  };


  /**
   * Set wounds.
   * @param {string} wounds
   */
  this.setWounds=function(wounds){
    this.data.wounds = wounds;
    this.node.find('.wounds').text(wounds);
  };


  /**
   * Set Potions.
   * @param {string} potions
   */
  this.setPotions=function(potions){
    this.data.potions = potions;
    this.node.find('.potions').text(potions);
  };


  /**
   * Set Skulls.
   * @param {string} skulls
   */
  this.setSkulls=function(skulls){
    this.data.skulls = skulls;
    this.node.find('.skulls').text(skulls);
  };

  this.loadCardStats=function(data){
    if(data.str !== undefined){
      this.setStat('str',data.str);
    }

    if(data.arm !== undefined){
      this.setStat('arm',data.arm);
    }

    if(data.dex !== undefined){
      this.setStat('dex',data.dex);
    }

    if(data.will !== undefined){
      this.setStat('will',data.will);
    }

    if(data.wounds !== undefined){
      this.setWounds(data.wounds);
    }

    if(data.potions !== undefined){
      this.setPotions(data.potions);
    }

    if(data.skulls !== undefined){
      this.setSkulls(data.skulls);
    }
  };
}
