<?php
require_once("functions.php");
$conn = conectaBanco();

if(!empty($_POST)) {
    $sql= 'INSERT INTO `pontuacao`(`id_usuario`, `pontuacao`, `nivel`, `tempo`) VALUES (1,'.$_POST['pontuacao'].','.$_POST['nivel'].',\''.$_POST['timer'].'\')';
    $conn->exec($sql);
}
?>