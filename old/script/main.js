/**
 *   SDE Card Creator source file main,
 *   Copyright (C) 2015  James M Adams
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
 * Extension to jquery to apply a css animation class and remove it when the animation is finished.
 * @param {string} animationName - css class name to the added to the domnode.
 */
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


/**
 *
 */
$(document).ready(function(){
//objects

  //Initialize mainMenu
  var promises = [];
  promises.push($.getJSON('https://sde.medicationforall.com/keywordlist.php?json=true'));
  promises.push($.get('html/form/Form.html'));


  //resolve the templates
  $.when.apply($, promises).done(function(keywords,form){
      console.log('ready to run app',keywords,form[0]);

      var mainMenu = new MainMenu();
      var sdeCreate = new SdeCreate(keywords);
  });


  //form.init();

  //var list = form.load();

  //$.when.apply($,list).done(function(){
    //form.setup();
    //form.register();
  //});


  /*$.when(Wizard.prototype._resolveTemplate()).done(function(){
    var wizard = new Wizard();

    //Wizard
    //$('.wizard').hide();
    //$('.wizard').dialog({dialogClass: "wizardDialog", width: 500});

    $('a.openWizard').click(function(event){
      event.preventDefault();
      $('.wizard').dialog({dialogClass: "wizardDialog", width: 500});
    });

    $('.wizard a.previous').click(function(event){
      event.preventDefault();
      wizard.previousStep();
    });

    $('.wizard a.next').click(function(event){
      event.preventDefault();
      wizard.nextStep();
    });
  });*/


  //remove noscript block
  $('.noScript').remove();
});
