<?php
include("header.php")
?>
      <header>
         <h1>
            Editar Perfil 
         </h1>
      </header>
      <section class="content">
         <h2>Dados do perfil:</h2>
         <form action="game.html">
            <label for="nome">Nome Completo:</label><br>
            <input type="text" id="nome" name="nome" value="Nome" ><br>
            <label for="data">Data de nascimento:</label><br>
            <input type="text" id="data" name="data" value="10/10/2000" disabled><br>
            <label for="cpf">CPF:</label><br>
            <input type="text" id="cpf" name="cpf" value="111.099.690-07" disabled><br>
            <label for="telefone">Telefone:</label><br>
            <input type="text" id="telefone" name="telefone" value = "(19) 99999-9999"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" value="test@teste.com"><br>
            <label for="user">Usuário:</label><br>
            <input type="text" id="user" name="user" value="User" disabled><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha" value="aaaaa"><br>
            <button type="submit" name="btnSalvar">Salvar</button>
         </form>
      </section>

      <footer class="text-center"><p>Desenvolvido para a disciplina SI401<p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/</footer>
   </body>
</html>

