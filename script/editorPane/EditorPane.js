function EditorPane(){
  this.node = undefined;

  this._construct=function(){
    this.node = $('.editorPane');
    this.node.data('node',this);

    this._setup();
  };

  this._setup=function(){
    new EditForm();
  };

  this._construct();
}
