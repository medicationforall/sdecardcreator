function HasLoadMenu(){
  this.loadMenu = $('.load.subMenu');

  //import
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

  //clear
  //$('.resetForm').remove();
  this.loadMenu.find('.resetForm').click(function(event){
    event.preventDefault();
    $('.form form').trigger('reset');
  });
}
