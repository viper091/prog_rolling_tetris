<?php
session_start();
require_once("functions.php");
verificaLogado();
?>
<!DOCTYPE html>
<html lang="pt">
   <head>
      <meta charset="UTF-8">
      <title>
         Cadastro
      </title>
      <link rel="stylesheet" type="text/css" href="css/style.css">
      <script src="js/toast.js"></script>
   </head>
   <body>
      <header>
         <h1>
            Cadastro 
         </h1>
      </header>
      <section class="content">
         <h2>Dados para cadastro:</h2>
         <form action="cadastrar.php" method="POST">
            <label for="nome">Nome Completo:</label><br>
            <input type="text" id="nome" name="nome" placeholder="Ex: João Da Silva"><br>
            <label for="data">Data de nascimento:</label><br>
            <input type="text" id="data" name="data" placeholder="Ex: 2010-11-29"><br>
            <label for="cpf">CPF:</label><br>
            <input type="text" id="cpf" name="cpf" placeholder="Ex: 999.999.999-99"><br>
            <label for="telefone">Telefone:</label><br>
            <input type="text" id="telefone" name="telefone" placeholder="Ex: 19 99999-9999"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" placeholder="Ex: joao@gmail.com"><br>
            <label for="user">Usuário:</label><br>
            <input type="text" id="user" name="user" placeholder="Ex: Joao"><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha"><br>
            <button class="mt-2" type="submit" name="btnCadastro">Cadastrar</button>
         </form>
         <a class="float-right" href="index.php">Já possui login? Faça seu login aqui</a>
      </section>
      
      <footer class="text-center"><p>Desenvolvido para a disciplina SI401<p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/</footer>
      
      <div id="toasts"></div>
   </body>
</html>

