function HasSaveMenu(){
  this.saveMenu = $('.save.subMenu');


  /**
   * Save
   */
  this.saveMenu.find('a.save').click($.proxy(function(coreNode,event){
    event.preventDefault();

    if($('input[name="title"]')[0].checkValidity()){
      var data = form.gatherData();
      coreNode.saveAsFile(JSON.stringify(data),$('.form input[name="title"]').val()+'.json',"text/plain;charset=utf-8");
    }else{
      $('input[name="title"]').addClass('fail');
    }
  },null,this));

  //not working
  //$('.saveAsImage').remove();
  //http://jsfiddle.net/6FZkk/1/
  this.saveMenu.find('.saveAsImage').click(function(event){
    event.preventDefault();
    console.log('save image');
    /*html2canvas($(".card"), {
      onrendered: function(canvas) {
        canvas.toBlob(function(blob) {
          saveAs(blob, "Dashboard.png");
        });
      }
    });*/
  });


  /**
   * Used for the save functionality.
   */
  this.saveAsFile=function(t,f,m) {
      try {
    var b = new Blob([t],{type:m});
          saveAs(b, f);
      } catch (e) {
          window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
      }
  };
}
