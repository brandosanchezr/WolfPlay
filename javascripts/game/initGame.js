(function($){
    $(function(){
        

        $('.sidenav').sidenav();
        $('.fixed-action-btn').floatingActionButton();
        $('.tap-target').tapTarget();
        $('#gameHolder').on("gameEnd", {foo: "bar"}, function( event, arg1 ) {
            //event.preventDefault();
            $.post(window.location, arg1, function( data ) {
                if (data == 'succes' ) {
                    console.log("Bissnes");
                }
                else{
                    console.log("NoBissnes");
                }
           });
        })
    }); // end of document ready
})(jQuery); // end of jQuery name space

