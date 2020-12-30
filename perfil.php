<?php
$titulo = "Editar Perfil";

include("header.php");

require_once("functions.php");
$user = getDadosUser();
?>
      <header>
         <h1>
            Editar Perfil 
         </h1>
      </header>
      <section class="content">
         <h2>Dados do perfil:</h2>
         <form action="atualizarUsuario.php" method="POST">
            <input type="hidden" id="idUser" name="idUser" value="<?php echo $user["id"] ?>">
            <label for="nome">Nome Completo:</label><br>
            <input type="text" id="nome" name="nome" value="<?php echo $user["nome"] ?>"><br>
            <label for="data">Data de nascimento:</label><br>
            <input type="text" id="data" name="data" value="<?php echo $user["nascimento"] ?>" disabled><br>
            <label for="cpf">CPF:</label><br>
            <input type="text" id="cpf" name="cpf" value="<?php echo $user["cpf"] ?>" disabled><br>
            <label for="telefone">Telefone:</label><br>
            <input type="text" id="telefone" name="telefone" value="<?php echo $user["telefone"] ?>"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" value="<?php echo $user["email"] ?>"><br>
            <label for="user">Usuário:</label><br>
            <input type="text" id="user" name="user"  value="<?php echo $user["user"] ?>" disabled><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha"  value="<?php echo $user["senha"] ?>"><br>
            <button type="submit" name="btnSalvar">Salvar</button>
         </form>
      </section>

      <footer class="text-center"><p>Desenvolvido para a disciplina SI401<p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/</footer>
   </body>
</html>

