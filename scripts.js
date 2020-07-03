$(document).ready(function() {

    var shapeOfDiamond = 'square';
    console.log(shapeOfDiamond);
    // first step for progress bar
    var _etape_position_1 = $("#etape-"+1).offset();

    var _etape_position_1_left = parseInt(_etape_position_1.left);

    // change progress bar
    $('.progress-bar').css({'width': _etape_position_1_left+'px'});

    // step forward click
    $('.to-next-step').click(function() {

        if (parseInt($(window).innerWidth()) <= 480) {
            $('.return-buttons').show();
        }

        // if click was on shape we give value to variable to use later in step 3
        if ($(this).hasClass('diamond-shapes-container')) {

            if ($(this).hasClass('round-diamond')) {
                shapeOfDiamond = 'round';
            }
            else {
                shapeOfDiamond = 'square';
            }
console.log(shapeOfDiamond);
        }

        var _ns = parseInt($(this).data('ns'));
        var _ps = _ns - 1;

        // next to step 2
        $('#top-steps-'+_ns).addClass('active');

        var _etape_position = $("#etape-"+_ns).offset();

        var _etape_position_left = parseInt(_etape_position.left);

        // change progress bar
        $('.progress-bar').css({'width': _etape_position_left+'px'});

        // change content

        $('#step-'+_ps).slideUp('1500');
        $('#step-'+_ns).slideDown('1500');


        // show button return to step one
        $('.btn.return').fadeOut('slow');
        $('#return-'+_ps).fadeIn('slow');

    });

    // step back click
    $('.btn.return').click(function() {

        var _prev_step_num = parseInt($(this).attr('id').replace('return-', ''));
        var _current_step_num = _prev_step_num + 1;
        var _prev_prev_step_num = _prev_step_num - 1;

        if (parseInt($(window).innerWidth()) <= 480 && _prev_step_num == 1) {
            $('.return-buttons').hide();
        }

        $('#step-'+_current_step_num).slideUp('1500');
        $('#step-'+_prev_step_num).slideDown('1500');

        $('.btn.return').fadeOut('slow');

        // show correct prev step button
        if ($('#return-' + _prev_prev_step_num).length > 0) {
            $('#return-' + _prev_prev_step_num).fadeIn('slow');
        }

        // change progress bar
        var _etape_position = $("#etape-"+_prev_step_num).offset();

        var _etape_position_left = parseInt(_etape_position.left);

        // change progress bar
        $('.progress-bar').css({'width': _etape_position_left+'px'});


        // remove active class from top step
        $('#top-steps-'+_current_step_num).removeClass('active');

    });

    // submit screen
    $('.main-submit-button').click(function() {

        $('.progress-bar').css({'width': (20 * 5)+'%'});

        setTimeout(function() {$('.submit-loading').css({'display': 'table'});}, 1000);


        setTimeout(function() {
            //$('.submit-loading').hide();
            //$('.progress-bar').css({'width': (20 * 4)+'%'});
        }, 5000);

    });

    // Oui / Non function
    $('.subpoint-trigger').click(function() {
        $('.sub-point').hide();
        var sub_point_to_show = $(this).data('subpointtoshow');
        $('#sub-point-'+sub_point_to_show).show();
    });


});