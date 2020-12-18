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
   </head>
   <body>
      <header>
         <h1>
            Cadastro 
         </h1>
      </header>
      <section class="content">
         <h2>Dados para cadastro:</h2>
         <form action="game.php">
            <label for="nome">Nome Completo:</label><br>
            <input type="text" id="nome" name="nome"><br>
            <label for="data">Data de nascimento:</label><br>
            <input type="text" id="data" name="data"><br>
            <label for="cpf">CPF:</label><br>
            <input type="text" id="cpf" name="cpf"><br>
            <label for="telefone">Telefone:</label><br>
            <input type="text" id="telefone" name="telefone"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br>
            <label for="user">Usuário:</label><br>
            <input type="text" id="user" name="user"><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha"><br>
            <button class="mt-2" type="submit" name="btnCadastro">Cadastrar</button>
         </form>
         <a class="float-right" href="index.php">Já possui login? Faça seu login aqui</a>
      </section>
      <footer class="text-center"><p>Desenvolvido para a disciplina SI401<p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/</footer>
   </body>
</html>
