$(function() {
  // Scrolling
  $(window).scroll(function() {
    checkScroll();
  });

  function checkScroll() {
    if ($(document).scrollTop() > 0) {
      $("nav").addClass("shrink");
    } else {
      $("nav").removeClass("shrink");
    }
    checkActiveSection();
    if (!areAllRevealed()) {
      console.log("checking...");
      // Problème de performance avec le reveal en mobile et le navbar qui descend...
      //revealItems();
    }
  }

  function checkActiveSection() {
    var apropos = Math.floor($("#apropos").position().top - 75);
    var proprietes = Math.floor($("#proprietes").position().top - 75);
    var partenariat = Math.floor($("#partenariat").position().top - 75);
    if ($(document).scrollTop() >= partenariat) {
      $("nav a").removeClass("active");
      $('nav a[href="#partenariat"]').addClass("active");
    } else if ($(document).scrollTop() >= proprietes) {
      $("nav a").removeClass("active");
      $('nav a[href="#proprietes"]').addClass("active");
    } else if ($(document).scrollTop() >= apropos) {
      $("nav a").removeClass("active");
      $('nav a[href="#apropos"]').addClass("active");
    } else {
      $("nav a").removeClass("active");
      $('nav a[href="#accueil"]').addClass("active");
    }
  }

  function areAllRevealed() {
    var toReturn = true;
    $(".to-reveal").each(function() {
      if ($(this).css("opacity") != 1) {
        toReturn = false;
        return false;
      }
    });
    return toReturn;
  }
  function revealItems() {
    $(".to-reveal").each(function() {
      var limit = Math.floor($(this).position().top);
      if ($(document).scrollTop() + $(window).height() >= limit) {
        $(this).css("opacity", 1);
      }
    });
  }

  // Text Replace
  function setDroitsReserves() {
    var year = new Date().getFullYear();
    $("span.year").html(year);
  }

  // App start
  function appStart() {
    checkScroll();
    setDroitsReserves();
  }
  appStart();
});
