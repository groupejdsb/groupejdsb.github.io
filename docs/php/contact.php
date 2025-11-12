<?php
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email']: null;
    $sujet = isset($_POST['sujet']) ? $_POST['sujet']: null;
    $telephone = isset($_POST['telephone']) ? $_POST['telephone']: null;
    $message = isset($_POST['message']) ? $_POST['message']: null; 

    $to      = 'simon@groupejdsb.com';
    $subject = "Contact de Groupe JDSB: " . $sujet;
    $emessage = wordwrap($message, 70, "\r\n");
    $emessage .= "\r\n\r\n" . "De: " . $name;
    $emessage .= "\r\n\r\n" . "Telephone: " . $telephone;
    $emessage .= "\r\n\r\n" . "Répondre directement à ce courriel pour répondre à l'adresse entrée dans le formulaire ($email).";

    $headers = "From: webmaster@jdsb.com \r\n" .
        'Reply-To: ' . $email . "\r\n";

    mail($to, $subject, $emessage, $headers);
?>