<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formdan gelen verileri temizleyip alıyoruz
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Gönderilecek e-posta bilgileri
    $to = "emir26han62@gmail.com"; // Kendi e-posta adresinizi buraya yazın
    $subject = "Yeni İletişim Formu Mesajı";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // E-posta gönderimi
    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Mesaj başarıyla gönderildi.</p>";
    } else {
        echo "<p>Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.</p>";
    }
}
?>