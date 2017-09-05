/**
 *   SDE Card Creator source file StatsControl,
 *   Copyright (C) 2016  James M Adams
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

function StatsControl(){

  /**
   *
   */
  this.setup=function(){
    this.node = $(StatsControl.template).appendTo(this.parent.node);
  };


  /**
   *
   */
  this.register=function(){
    this.setupStats();
  };


  /**
   *@todo stats should core components
   */
  this.setupStats=function(){
    var form = this.closest(Form);
    var strStat = new Stat("STR", 'hero monster pet', '3b 1sw');
    var armStat = new Stat("ARM", 'hero monster pet', '2b 1r sh');
    var willStat = new Stat("WILL", 'hero monster', '3b');
    var dexStat = new Stat("DEX", 'hero monster', '3b');

    form.linkToTemplateStat("STR",strStat);
    form.linkToTemplateStat("ARM",armStat);
    form.linkToTemplateStat("WILL",willStat);
    form.linkToTemplateStat("DEX",dexStat);

    form.linkToTemplate("wounds");
    form.linkToTemplate("skulls");
    form.linkToTemplate("potions");
  };
}

StatsControl.prototype = new CoreTemplate('html/form/StatsControl.html');
StatsControl.prototype.constructor = StatsControl;
