<?php
session_start();
require_once("functions.php");
$conn = conectaBanco();

if(!empty($_POST)) {
    $sql= 'INSERT INTO `pontuacao`(`id_usuario`, `pontuacao`, `nivel`, `tempo`) VALUES ('.$_SESSION['idUser'].','.$_POST['pontuacao'].','.$_POST['nivel'].',\''.$_POST['timer'].'\')';
    $conn->exec($sql);
}
?>