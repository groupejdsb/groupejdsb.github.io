$(function() {
  $("#contact-form input, #contact-form textarea").keyup(function() {
    var id = $(this).attr("id");
    var selector = "#" + id;
    $(selector + "-group p.error-field").remove();
    var isValid = document.getElementById(id).checkValidity();
    if (isValid) {
      $(selector).removeClass("invalid");
      $(selector).addClass("valid");
    } else {
      $(selector).addClass("invalid");
      $(selector).removeClass("valid");
    }
  });

  var request;

  $("#contact-form").submit(function(e) {
    e.preventDefault();

    $("#contact-form p.error-field").remove();

    var name = isValid("name");
    var email = isValid("email");
    var sujet = isValid("sujet");
    var telephone = isValid("telephone");
    var message = isValid("message");

    if (name && email && message) {
      var $form = $(this);
      if (request) {
        request.abort();
      }
      var $inputs = $form.find("input,textarea");

      $inputs.prop("disabled", true);

      request = $.ajax({
        type: "POST",
        url: "../php/contact.php",
        data: {
          name: name,
          email: email,
          sujet: sujet,
          telephone: telephone,
          message: message
        }
      })
        .done(function() {
          setStatusMessage("Message envoyé avec succès!", "success");
          clearForm();
        })
        .fail(function() {
          setStatusMessage(
            "Erreur lors de l'envoi du message, veuillez nous contacter par courriel en utilisant votre boite courriel ou réessayez plus tard.",
            "error"
          );
        })
        .always(function() {
          $inputs.prop("disabled", false);
        });
    }
  });

  function setStatusMessage(msg, status) {
    $("#status-message").html(msg);
    $("#status-message").removeClass("alert-success");
    $("#status-message").removeClass("alert-error");
    $("#status-message").addClass("alert-" + status);
    $("#status-message").fadeIn();
  }
  function clearForm() {
    $("#contact-form p.error-field").remove();

    $("#name")
      .val("")
      .removeClass("invalid")
      .removeClass("valid");
    $("#email")
      .val("")
      .removeClass("invalid")
      .removeClass("valid");
    $("#sujet")
      .val("")
      .removeClass("invalid")
      .removeClass("valid");
    $("#telephone")
      .val("")
      .removeClass("invalid")
      .removeClass("valid");
    $("#message")
      .val("")
      .removeClass("invalid")
      .removeClass("valid");
  }

  function isValid(id) {
    var selector = "#" + id;
    var isValid = document.getElementById(id).checkValidity();
    if (!isValid) {
      $(selector).addClass("invalid");
      $("<p class='error-field'>Erreur</p>").insertAfter(selector);
      return false;
    }
    $(selector).addClass("valid");
    $(selector + "-group p.error-field").remove();
    return $(selector).val();
  }
});
