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
$(document).ready(function(){
//objects

  var form = new sdeCreate();
  form.init();

  var list = form.load();

  $.when.apply($,list).done(function(){
  form.setup();
  form.register();
  });

  //remove noscript block
  $('.noScript').remove();

  $.when(Wizard.prototype._resolveTemplate()).done(function(){
  var wizard = new Wizard();

  //Wizard
  $('.wizard').hide();
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
  });


  //Save
  $('a.save').click(function(event){
  event.preventDefault();

  if($('input[name="title"]')[0].checkValidity()){
  var data = form.gatherData();
  saveAsFile(JSON.stringify(data),$('.form input[name="title"]').val()+'.json',"text/plain;charset=utf-8");
  }else{
  $('input[name="title"]').addClass('fail');
  }
  });


  //import
  $('.importFile').change(function(event){
  event.preventDefault();

  if (window.File && window.FileReader && window.FileList && window.Blob) {
  //do your stuff!

  var file = $('.importFile')[0].files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
  var text = reader.result;

  var data = jQuery.parseJSON(text);
  //console.log(data);
  form.setData(data);
};
  reader.readAsText(file);
  } else {
  alert('The File APIs are not fully supported by your browser.');
  }
  });

  //clear
  $('.resetForm').remove();
  $('.resetForm').click(function(event){
  event.preventDefault();
  $('.form form').trigger('reset');
  });


  //not working
  $('.saveAsImage').remove();
  //http://jsfiddle.net/6FZkk/1/
  $('.saveAsImage').click(function(event){
  event.preventDefault();
  html2canvas($(".card"), {
  onrendered: function(canvas) {
  canvas.toBlob(function(blob) {
  saveAs(blob, "Dashboard.png");
  });
  }
  });
  });
});


//used for the save functionality
function saveAsFile(t,f,m) {
    try {
  var b = new Blob([t],{type:m});
        saveAs(b, f);
    } catch (e) {
        window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
}
