<?php
require_once("functions.php");
session_start();
verificaPermissao();
?>
<!DOCTYPE html>
<html lang="pt">
   <head>
      <meta charset="UTF-8">
      <title>
         <?php echo $titulo?>
      </title>
      <link rel="stylesheet" type="text/css" href="css/style.css">
      <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      <?php
         if(substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['REQUEST_URI'], '/') + 1)=="game.php") {
            echo '<script src="js/jogo.js"></script>';
            echo '<script src="js/toast.js"></script>';
         }
      ?>
   </head>
   <?php
   if(substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['REQUEST_URI'], '/') + 1)=="game.php"){
      echo "<body onload='init()'>";
   }
   else{
      echo "<body>";
   }
   ?>
   
      <nav class="navbar">
         <a href="game.php" class="navbar-content item">Game</a>
         <a href="ranking.php" class="navbar-content item">Ranking Global</a>
         <a href="perfil.php" class="navbar-content item">Perfil</a>
         <a href="logout.php" class="navbar-content item float-right mr-2">Logout</a>
      </nav>