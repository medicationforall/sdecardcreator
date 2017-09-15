/**
 *   SDE Card Creator source file HasLoadMenu,
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
 * Load Menu Controls.
 * @mixin
 */
function HasLoadMenu(){
  this.loadMenu = $('.load.subMenu');


  /**
   * import
   */
  this.loadMenu.find('.importFile').change(function(event){
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
      console.warn('The File APIs are not fully supported by your browser.');
    }
  });


  /**
   * clear
   */
  this.loadMenu.find('.resetForm').click(function(event){
    event.preventDefault();
    $('.form form').trigger('reset');
  });
}
