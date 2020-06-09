(function($){
    $(function(){
        
        $('.sidenav').sidenav();
        $("#submit").on("submit",function  (e) {
            e.preventDefault();
            console.log();
            $.post("/register",$(this).serialize(), function( data ) {
                if (data == 'succes' ) {
                    window.location.replace(`/home`);
                }
                else if(data == 'mailExist'){}
           });
        })

        $(".register").validate({
            rules: {
                gamerTag: {
                    required: true,
                    minlength: 4,
                    remote:{
                        url: "/register/cUser",
                        type: "post",
                        data: {
                            gamerTag: function() {
                                return $( "#gamerTag" ).val();
                            }
                        }
                    }
                },
                email: {
                    required: true,
                    email:true,
                    remote:{
                        url: "/register/cMail",
                        type: "post",
                        data: {
                            gamerTag: function() {
                                return $( "#email" ).val();
                            }
                        }
                    }
                },
                password: {
                    required: true,
                    minlength: 5
                },
            },
            //For custom messages
            messages: {
                gamerTag:{
                    required: "Enter a gamerTag",
                    minlength: "Enter at least 5 characters",
                    remote: "Gamer Tag Already Used!"
                },email: {
                    remote: "Email Already Used!"
                }
            },
            errorElement : 'div',
            errorClass: 'invalid',//This will be the error for we would change
            errorPlacement: function(error, element) {
              var placement = $(element).data('invalid');
              if (placement) {
                $(placement).append(error)
              } else {
                error.insertAfter(element);
              }
            }
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space

