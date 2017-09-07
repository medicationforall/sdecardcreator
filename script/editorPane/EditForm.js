function EditForm(){
  this.template='<div class="editForm form"></div>';
  this.node=undefined;

  this._construct=function(){
    var editorPane = $('.editorPane').data('node');
    this.node=$(this.template).appendTo(editorPane.node);
    this.node.data('node',this);

    this._setup();
  };

  this._setup=function(){
    new CardControl();
    new HeaderControl();
    new ImageControl();
    new StatsControl();
    new KeywordControl();
    new AbilityControl();
    new FlavorTextControl();
  };

  this._construct();
}
