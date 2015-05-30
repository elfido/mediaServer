var _about = can.Control.extend({
  sel: {
    ifaces: ".interfaces"
  },
  getNicsInfo: function( callback ){
    var _this = this;
    $.ajax({
      url: '/media/api/system/ip',
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
    this.renderNics();
  }
});

App.Controllers.About = new _about("body", {});
