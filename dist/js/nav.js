$(function() {
  $(".burger-container, nav.navbar-mobile ul>li>a").click(function() {
    $("nav.navbar-mobile").toggleClass("opened");
  });

  $("nav a, #btn-contact, footer a.footer-logo, a.contact-us").click(function(e) {
    e.preventDefault();
    var to = $(this).attr("href");
    var topTarget = $(to).length === 0 ? 0 : $(to).position().top - 75;
    $("html,body").animate(
      {
        scrollTop: topTarget
      },
      "slow"
    );
  });
});
