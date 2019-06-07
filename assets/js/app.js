$(document).ready(function() {

    let readyArg = false;
    let readyCon = false;

    $("#btn_arg").click (function() {

        $("#btn_arg").removeClass('has-background-link');
        $("#btn_arg").addClass('has-background-success');
        $("#btn_con").removeClass('has-background-danger');
        $("#btn_con").addClass('has-background-link');

        if (!readyArg) {
            readyArg = true;
            readyCon = false;

            $('#argomedo0').removeClass('is-hidden-mobile');
            $('#argomedo1').removeClass('is-hidden-mobile');
            $('#argomedo2').removeClass('is-hidden-mobile');
            $('#condor0').addClass('is-hidden-mobile');
            $('#condor1').addClass('is-hidden-mobile');
            $('#condor2').addClass('is-hidden-mobile');
        }
    })

    $("#btn_con").click (function() {
        
        $("#btn_arg").removeClass('has-background-success');        
        $("#btn_con").removeClass('has-background-link');
        $("#btn_arg").addClass('has-background-link');
        $("#btn_con").addClass('has-background-danger');
        

        if (!readyCon) {
            readyCon = true;
            readyArg = false;            

            $('#argomedo0').addClass('is-hidden-mobile');
            $('#argomedo1').addClass('is-hidden-mobile');
            $('#argomedo2').addClass('is-hidden-mobile');
            $('#condor0').removeClass('is-hidden-mobile');
            $('#condor1').removeClass('is-hidden-mobile');
            $('#condor2').removeClass('is-hidden-mobile');
        }
    })

});