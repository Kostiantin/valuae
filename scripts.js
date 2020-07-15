$(document).ready(function() {

    function toFixedLimit(num, limit) {
        if(isNaN(num)) return 0;
        if(limit === undefined) return num;
        var value = String(num);
        var res = String(num).split(".");
        if(value.indexOf('.') !== -1 && res[1] && res[1].length > limit-1) {
            value = parseFloat(num.toFixed(limit)).toString();
        }
        return value;
    }

    function calculateWeightInCarats(shapeOfDiamond, elem) {

        console.log('inside calculations');
        console.log(shapeOfDiamond);

        var LG = parseFloat($(elem).parents('.calculate-carats-block:first').find('input[name="length"]').val());
        var LR = parseFloat($(elem).parents('.calculate-carats-block:first').find('input[name="width"]').val());

        if ($(elem).parents('.calculate-carats-block:first').find('input[name="width"]').attr('id') == 'width_round') {
            LR = LG;
        }

        var HT = parseFloat($(elem).parents('.calculate-carats-block:first').find('input[name="height"]').val());

        var carats = 0;

        if(isNaN(LG) || isNaN(LR) || isNaN(HT)) {
            alert('Veuillez renseigner les mesures en mm');
            return;
        }

        var rapport = LR == 0 ? 0 : LG / LR;
        switch(shapeOfDiamond) {
            case 'rond': carats = LG * LR * HT * 0.0061;
                break;
            case 'poire': carats = LG * LR * HT * (rapport <= 1.375 ? 0.00615 : rapport >= 1.75 ? 0.00575 : 0.0060)
                break;
            case 'coussin': carats = LG * LR * HT * 0.00815;
                break;
            case 'emeraude': carats = LG * LR * HT * (rapport <= 1.75 ? 0.0092 : rapport >= 2.25 ? 0.0106 : 0.01)
                break;
            case 'princesse': carats = LG * LR * HT * 0.0082;
                break;
            case 'marquise': carats = LG * LR * HT * (rapport <= 1.75 ? 0.00565 : rapport >= 2.25 ? 0.00585 : 0.0058)
                break;
            case 'coeur': carats = LG * LR * HT * 0.0059;
                break;
            case 'ovale': carats = LG * LR * HT * (rapport <= 1.375 ? 0.00625 : rapport >= 1.75 ? 0.0067 : 0.0064)
                break;
            case 'asscher': carats = LG * LR * HT * 0.0080;
                break;
            default:
        }

        $(elem).parents('.calculate-carats-block:first').find('.pe-result').text(toFixedLimit(carats, 2));
        $(elem).parents('.calculate-carats-block:first').find('.poids-estime').show();

    }

    if ($('.steps').length > 0) {

        var shapeOfDiamond = '';

        // first step for progress bar
        var _etape_position_1 = $("#etape-"+1).offset();

        var _etape_position_1_left = parseInt(_etape_position_1.left);

        // change progress bar
        $('.progress-bar').css({'width': _etape_position_1_left+'px'});
    }

    // step forward click
    $('.to-next-step').click(function() {

        if (parseInt($(window).innerWidth()) <= 480) {
            $('.return-buttons').show();
        }

        // if click was on shape we give value to variable to use later in step 3
        if ($(this).hasClass('diamond-shapes-container')) {


            shapeOfDiamond = $(this).data('shape');

            /*console.log('shapeofdiamond');
            console.log(shapeOfDiamond);*/
        }

        var _ns = parseInt($(this).data('ns'));
        var _ps = _ns - 1;

        // next to step 2
        $('#top-steps-'+_ns).addClass('active');

        var _etape_position = $("#etape-"+_ns).offset();

        var _etape_position_left = parseInt(_etape_position.left);

        // change progress bar
        $('.progress-bar').css({'width': _etape_position_left+'px'});

        $('#head-st-'+_ns).click();

        var _first_step_height = $('#step-1').css('height');

        if (_ns == '2') {

            $('.calculate-carats-block input[name="length"], .calculate-carats-block input[name="width"], .calculate-carats-block input[name="height"]').val('');
            $('.calculate-carats-block .poids-estime .pe-result').text('');
            $('.calculate-carats-block .poids-estime').hide();

        }
        if (_ns == '3') {
            setTimeout(function() {
                $('#step-3').css('height','auto');
            }, 1500);
        }
        else {
            $('#step-3').css('height',_first_step_height);
        }

        // show button return to step one
        $('.btn.return').fadeOut('slow');
        $('#return-'+_ps).fadeIn('slow');

    });

    // step back click
    $('.btn.return').click(function() {

        // hide sub points
        $('#sub-point-2-1, #sub-point-2-2, #sub-point-2-3, #sub-point-2-4, #sub-point-3-1, #sub-point-3-2, #sub-point-3-3, #sub-point-3-4').hide();

        // remove active classes:
        $('.brand-container.lab').removeClass('l-active');
        $('.subpoint-trigger').removeClass('active');

        var _prev_step_num = parseInt($(this).attr('id').replace('return-', ''));
        var _current_step_num = _prev_step_num + 1;
        var _prev_prev_step_num = _prev_step_num - 1;

        if (parseInt($(window).innerWidth()) <= 480 && _prev_step_num == 1) {
            $('.return-buttons').hide();
        }

        /*$('#step-'+_current_step_num).slideUp('1500');
        $('#step-'+_prev_step_num).slideDown('1500');*/

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

        $('#head-st-'+_prev_step_num).click();


        var _first_step_height = $('#step-1').css('height');

        if (_prev_step_num == '3') {
            setTimeout(function() {
                $('#step-3').css('height','auto');
            }, 1500);
        }
        else {
            $('#step-3').css('height',_first_step_height);
        }


        // remove active class from top step
        $('#top-steps-'+_current_step_num).removeClass('active');

    });

    // submit screen
    $('.main-submit-button').click(function() {

        $('.progress-bar').css({'width': (20 * 5)+'%'});

        setTimeout(function() {$('.submit-loading').css({'display': 'table'});}, 1000);


        setTimeout(function() {
            location.href = '/valuae_new/results.html';
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
            if (shapeOfDiamond == 'rond') {
                $('#sub-point-'+sub_point_to_show).show();
            }
            else {
                $('#sub-point-2-3').show();
            }

        }
        else {
            $('#sub-point-'+sub_point_to_show).show();
        }

    });

    // validate all values entered
    function sBoxValidation(shapeOfDiamond, elem) {

        $('.poids-estime').hide();
        console.log('checking');

        var _errors_in_block = false;

        $(elem).parents('.with-validation-inputs:first').find('input, select').each(function() {
            if ($(this).val() == '' && $(this).attr('id') != 'width_round') {
                _errors_in_block = true;
            }
        });

        if (_errors_in_block == false) {

            $(elem).parents('.with-validation-inputs:first').find('button.to-next-step').removeAttr('disabled');

            if ($(elem).parents('.with-validation-inputs:first').hasClass('calculate-carats-block')) {
                calculateWeightInCarats(shapeOfDiamond, elem);
            }

        }
        else {
            $(elem).parents('.with-validation-inputs:first').find('button.to-next-step').attr('disabled', true);
        }
    }

    // validation on step 2
    $('.with-validation-inputs input').keyup(function() {

        sBoxValidation(shapeOfDiamond, this);

    });


    // validation on step 3
    $('.s-boxes input').keyup(function(){

        sBoxValidation(shapeOfDiamond, this);

    });
    $('.s-boxes select').change(function(){

        sBoxValidation(shapeOfDiamond, this);

    });

    // check carats

    $('.check-carats').click(function() {

        var _carats_value = parseInt($(this).parents('.with-validation-inputs:first').find('input[name="amount-of-carats"]').val());

        if (_carats_value < 1) {
            location.href = '/valuae_new/sorry.html';
        }

    });


    // choose lab will show form

    $('.brand-container.lab').click(function() {

        $('.brand-container.lab').removeClass('l-active');

        $(this).addClass('l-active');

        var _id_of_lab = $(this).attr('id').replace('lab-', '');

        $('.lab-form').hide();

        $('.lab-form-' + _id_of_lab).show();

    });

    $('.show-mon-form').click(function() {
        $('#lab-mon').click();
    });


    if ($('.steps').length > 0) {
        // activate accordion form
        $("form.current_slider_form").accordion({
            collapsible: true
        });
    }

    // when user don't know and clicks on 'Je n’ai aucun d?tail sur mon diamant'
    $('.move-to-user-form').click(function() {
        //$('#head-st-4').click();
        $('#return-2').hide();
        $('#return-3').show();
    });

    // questions on final page
    $(document).on('click', '.q-trigger', function() {

       var _open_next_lvl = $(this).data('openlevel');

       if (typeof _open_next_lvl != 'undefined' && _open_next_lvl != '') {
           $('.questions').hide();
           $('.questions-level-'+_open_next_lvl).show();
       }

    });

    //close
    $('.shut-down').click(function() {
        $('.questions-level-2, .questions-level-3').hide();
        $('.questions-level-1').show();
    });

    // back
    $('.go-back').click(function() {
        $('.questions-level-3').hide();
        $('.questions-level-2').show();
    });

});