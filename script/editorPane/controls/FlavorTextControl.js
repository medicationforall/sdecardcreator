function FlavorTextControl(){
  this.template='<div class="hero monster loot treasure wonder explore flavorText">'+
    '<h2>Flavor Text</h2>'+
    '<textarea name="flavorText" /></textarea>'+
  '</div>';

  this.node=undefined;

  this._constructor=function(){
    console.log('new Flavor Text control');
    var form = $('.editForm').data('node');
    this.node=$(this.template).appendTo(form.node);
    this.node.data('node',this);
  };

  this._constructor();
}
