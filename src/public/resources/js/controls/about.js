var _about = can.Control.extend({
  sel: {
    ifaces: ".interfaces",
    media: "[name=media]",
    db: "[name=db]",
    collection: "[name=collection]",
    key: "[name=key]"
  },
  getConfig: function( callback ){
    var _this = this;
    $.ajax({
      url: App.Config.API+'system/config',
      success: function( data ){
        callback( data );
      },
      error: function(error){
        $(_this.sel.ifaces).html("Error =(");
        console.dir( error );
      }
    });
  },
  renderConfig: function(){
    var _this = this;
    this.getConfig(function( config ){
      $(_this.sel.media).val( config.media );
      $(_this.sel.db).val( config.dbserver );
      $(_this.sel.collection).val( config.collection );
      $(_this.sel.key).val( config.applicationId );
    });
  },
  getNicsInfo: function( callback ){
    var _this = this;
    $.ajax({
      url: App.Config.API+'system/ip',
      success: function( data ){
        callback( data );
      },
      error: function(error){
        $(_this.sel.ifaces).html("Error =(");
        console.dir( error );
      }
    });
  },
  renderNics: function(){
    var _this = this;
    this.getNicsInfo( function( nic ){
      var tbl = '<table class="table"><tr><th>Interface</th><th>Network</th></tr>';
      tbl+='<tr><td>'+nic.name+'</td><td>'+nic.address+'</td></tr>';
      tbl+='</table>';
      $( _this.sel.ifaces ).html( tbl );
    });
  },
  init: function(){
    this.renderConfig();
    this.renderNics();
  }
});

App.Controllers.About = new _about("body", {});
