import jQuery from 'jquery';

jQuery(document).ready(function (jQuery) {

    const $form_modal = jQuery('.modal'),
        $form_modal_callback = jQuery('.modal-callback'),
        $body = document.getElementsByTagName('body'),
        $form_login = $form_modal.find('#cd-login'),
        $form_signup = $form_modal.find('#cd-signup'),
        $social = $form_modal.find('#social-login'),
        $form_forgot_password = $form_modal.find('#cd-reset-password'),
        $reg_link = jQuery('.reg-link'),
        $forgot_password_link = $form_login.find('.cd-form-bottom-message .forgot-pass'),
        $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message .forgot-pass'),
        $main_nav = jQuery('.loginBtn'),
        $header_callback = jQuery('.header-action-call');

    //open modal
    $main_nav.on('click', function () {
        // on mobile close submenu
        $main_nav.children('ul').removeClass('is-visible');
        //show modal layer
        $form_modal.addClass('is-visible');
        //show the selected form
        login_selected();
    });

    //modal callback
    $header_callback.on('click', function () {
        $header_callback.children('ul').removeClass('is-visible');
        $form_modal_callback.addClass('is-visible');
    });

    //close modal
    jQuery('.modal').on('click', function (event) {
        if (jQuery(event.target).is($form_modal) || jQuery(event.target).is('.cd-close-form')) {
            $form_modal.removeClass('is-visible');
            $body[0].removeAttribute('style');
        }
    });

    //close modal callback
    jQuery('.modal-callback').on('click', function (event) {
        if (jQuery(event.target).is($form_modal_callback) || jQuery(event.target).is('.cd-close-form')) {
            $form_modal_callback.removeClass('is-visible');
            $body[0].removeAttribute('style');
        }
    });

    //close modal when clicking the esc keyboard button
    jQuery(document).keyup(function (event) {
        if (event.which == '27') {
            $form_modal.removeClass('is-visible');
            $form_modal_callback.removeClass('is-visible');
            $body[0].removeAttribute('style');
        }
    });

    $reg_link.on('click', function (event) {
        event.preventDefault();
        signup_selected();
    });

    //show forgot-password form 
    $forgot_password_link.on('click', function (event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    $back_to_login_link.on('click', function (event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        $body[0].setAttribute('style', 'overflow:hidden');
        $form_login.addClass('is-selected');
        $social.addClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $reg_link.removeClass('selected');
    }

    function signup_selected() {
        $body[0].setAttribute("style", "overflow:hidden;");
        $form_login.removeClass('is-selected');
        $form_signup.addClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $reg_link.addClass('selected');
        $social.removeClass('is-selected');
    }

    function forgot_password_selected() {
        $body[0].setAttribute("style", "overflow:hidden;");
        $form_login.removeClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.addClass('is-selected');
        $social.removeClass('is-selected');
    }


    // Animate Sidebar Menu
    const dropdown = document.querySelectorAll('.dropdown');

    function accordion(e) {
        e.stopPropagation();
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        }
        else if (this.parentElement.parentElement.classList.contains('active')) {
            this.classList.add('active');
        }
        else {
            for (let i = 0; i < dropdown.length; i++) {
                dropdown[i].classList.remove('active');
            }
            this.classList.add('active');
        }
    }
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener('click', accordion);
    }


    // Menu Toggle Animate
    const burgerMenu = document.getElementsByClassName('burger-container')[0];
    const burger = document.getElementsByClassName('burger-toggle')[0];
    const burgerNav = document.getElementsByClassName('sidebar-mnu')[0];

    burgerMenu.addEventListener('click', function toggleClasses() {
        [burgerNav, burger].forEach(function (el) {
            el.classList.toggle('open');
        });
    }, false);

    // tabbed content
    jQuery(".tab_content").hide();
    jQuery(".tab_content:first").show();

    jQuery(".tab-selecrs-content").hide();
    jQuery(".tab-selecrs-content:first").show();

    /* if in tab mode */
    jQuery("ul.tabs li").click(function () {

        jQuery(".tab_content").hide();
        const activeTab = jQuery(this).attr("rel");
        jQuery("#" + activeTab).fadeIn();

        jQuery("ul.tabs li").removeClass("active");
        jQuery(this).addClass("active");

    });
    /* if in drawer mode */
    jQuery(".tab-header-action").click(function () {

        jQuery(".tab-selecrs-content").hide();
        const d_activeTab = jQuery(this).attr("rel");
        jQuery("#" + d_activeTab).fadeIn();

        jQuery(".tab-header-action").removeClass("d_active");
        jQuery(this).addClass("d_active");

        // jQuery("ul.tabs li").removeClass("active");
        // jQuery("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });


	/* Extra class "tab_last" 
	   to add border to right side
	   of last tab */
    jQuery('ul.tabs li').last().addClass("tab_last");

    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a')

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });


    // Custom Select
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

    // Star rating
    /* 1. Visualizing things on Hover - See next part for action on click */
    jQuery('#stars li').on('mouseover', function () {
        var onStar = parseInt(jQuery(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        jQuery(this).parent().children('li.star').each(function (e) {
            if (e < onStar) {
                jQuery(this).addClass('hover');
            }
            else {
                jQuery(this).removeClass('hover');
            }
        });

    }).on('mouseout', function () {
        jQuery(this).parent().children('li.star').each(function (e) {
            jQuery(this).removeClass('hover');
        });
    });


    /* 2. Action to perform on click */
    jQuery('#stars li').on('click', function () {
        var onStar = parseInt(jQuery(this).data('value'), 10); // The star currently selected
        var stars = jQuery(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            jQuery(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            jQuery(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt(jQuery('#stars li.selected').last().data('value'), 10);
        var msg = "";
        if (ratingValue > 1) {
            msg = "Thanks! You rated this " + ratingValue + " stars.";
        }
        else {
            msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        }
        responseMessage(msg);

    });

    function responseMessage(msg) {
        jQuery('.success-box').fadeIn(200);
        jQuery('.success-box div.text-message').html("<span>" + msg + "</span>");
    }

    // MNU TOGGLE TOP
    var theToggle = document.getElementById('toggle');

    // hasClass
    function hasClass(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    // addClass
    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }
    // removeClass
    function removeClass(elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
    // toggleClass
    function toggleClass(elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(" " + className + " ") >= 0) {
                newClass = newClass.replace(" " + className + " ", " ");
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        } else {
            elem.className += ' ' + className;
        }
    }

    theToggle.onclick = function () {
        toggleClass(this, 'on');
        return false;
    }

});

