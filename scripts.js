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

        // hide sub points
        $('#sub-point-2-1, #sub-point-2-2, #sub-point-2-3, #sub-point-2-4, #sub-point-3-1, #sub-point-3-2, #sub-point-3-3, #sub-point-3-4').hide();

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

        $('.subpoint-trigger').removeClass('active');

        $(this).addClass('active');

        var sub_point_to_show = $(this).data('subpointtoshow');

        if (sub_point_to_show == '2-2') {
            console.log(shapeOfDiamond);
            if (shapeOfDiamond == 'square') {
                $('#sub-point-2-3').show();
            }
            else {
                $('#sub-point-'+sub_point_to_show).show();
            }

        }
        else {
            $('#sub-point-'+sub_point_to_show).show();
        }

    });


    // validation on step 2
    $('.with-validation-inputs input').keyup(function() {

        var _errors_in_block = false;

        $(this).parents('.with-validation-inputs:first').find('input').each(function() {
            if ($(this).val() == '') {
                _errors_in_block = true;
            }
        });

        if (_errors_in_block == false) {
            $(this).parents('.with-validation-inputs:first').find('button.aoc-valider').removeAttr('disabled');
        }
        else {
            $(this).parents('.with-validation-inputs:first').find('button.aoc-valider').attr('disabled', true);
        }
    });

});