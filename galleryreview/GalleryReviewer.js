
var currentSelection = 1;
var galleryArray = [];
var gallerySize = 42;

  $(document).ready(function () {



    // draw gallery
    for (var i = 0; i < gallerySize; i++) {

      if (i % 4 === 0) {
        var picContainer = $('.nobullets').append(
        '<li><img class="img-box" src="john_hogtied.jpg"/></li>'
    );
      }
      else if (i % 3 === 0) {
        var picContainer = $('.nobullets').append(
          '<li><img class="img-box" src="cupcake.jpg"/></li>'
        );
      }
      else {
       var picContainer = $('.nobullets').append(
        '<li><img class="img-box" src="peppermint.jpg"/></li>'
        );
      }





    // Every 3rd img is the first img of a row.

    if (i % 3 === 1 || i === 0) {
      $('li:nth-child('+i+') img').toggleClass('row-start')
    }
      if (i === 0) {
      }
      galleryArray.push(picContainer)

      //END for
    }


    // TO ADD: row-start highlighted

    $('li:nth-child('+currentSelection+') img').toggleClass('targeted');

    $('.gallery-container li img').on('click', selectPic);

    var imgGallery = document.getElementsByClassName('img-box');

    for(var i = 0; i < imgGallery.children; i++){
      imgGallery.children[i].addEventListener('click', selectPic)
    }



    $(document).keydown (function (e) {

      // 74 = j (target next)
      if ((e.keyCode) === 74 && currentSelection != gallerySize)  {
        $('li:nth-child('+currentSelection+') img').toggleClass('targeted');
        currentSelection += 1;
        $('li:nth-child('+currentSelection+') img').toggleClass('targeted');

        // if it's a new row, move camera
        if (currentSelection % 3 === 1) {
          scrollTo($('li:nth-child('+currentSelection+') img'))
        }
      }
      // 75 = k (target previous)
      if ((e.keyCode) === 75 && currentSelection != 1) {
        $('li:nth-child('+currentSelection+') img').toggleClass('targeted');
        currentSelection -= 1;
        $('li:nth-child('+currentSelection+') img').toggleClass('targeted');

        // if it's a new row, move camera
        if (currentSelection % 3 === 0) {
          scrollTo($('li:nth-child('+currentSelection+') img'))
        }
      }

      // 32 = space (select pic)
      if ((e.keyCode) === 32 && e.target == document.body)  {
        e.preventDefault();
        $('li:nth-child('+currentSelection+') img').toggleClass('selected');
      }

      // 86 = v (enlarge image)
      if ((e.keyCode) === 86)  {
        // TODO
        console.log("Vicariously Viewing Vixens")
      }
    });

    function selectPic(u) {
      // create function to verify that toggle is checked and link is inactive.
      $(u.target).toggleClass("selected");
      console.log('clicking');

    }

    // scrollTo: Smooth scrolls to target id
    function scrollTo(target) {
      var offset;
      var scrollSpeed = 0;
        var wheight = $(window).height();
        offset = $(target).offset().top - $(window).height() / 2 + $('.targeted')[0].height/2;

      $('html, body').animate({scrollTop:offset}, scrollSpeed);
    }
  });