<?php
session_start();
require_once("functions.php");
verificaLogado();
if(!empty($_POST)) {
   login(conectaBanco(),$_POST['user'],$_POST['senha']);
}
?>
<!DOCTYPE html>
<html lang="pt">
   <head>
      <meta charset="UTF-8">
      <title>
         Login
      </title>
      <link rel="stylesheet" type="text/css" href="css/style.css">
      <link rel="stylesheet" type="text/css" href="css/index.css">
      <script src="js/toast.js"></script>
   </head>
   <body>
      <header>
         <h1>Login</h1>
      </header>
      <section>
         <h2>Formulário de Login:</h2>

         <form action="index.php" method="POST">
            <label for="user">Usuário:</label><br>
            <input type="text" id="user" name="user"><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha"><br>
            <button class="mt-2" type="submit" name="btnLogin">START!</button>
         </form>
      </section>
      <a href="cadastro.php">Cadastre-se aqui</a>
      <footer class="text-center"><p>Desenvolvido para a disciplina SI401<p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/</footer>
      
      <div id="toasts"></div>
   </body>
</html>

