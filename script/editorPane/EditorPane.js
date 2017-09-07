function EditorPane(){
  console.log('create editor pane');
  this.node = undefined;

  this._construct=function(){
    this.node = $('.editorPane');
    this.node.data('node',this);
  };

  this._construct();
}
