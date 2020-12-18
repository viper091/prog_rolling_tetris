<?php
include("header.php")
?>
      <header>
         <h1>
            Ranking Global
         </h1>
      </header>
      <section class="content">
         <h2>Informações dos jogadores:</h2>
         <table class="text-center">
            <tr>
               <th>Usuário</th>
               <th>Pontuação</th>
               <th>Nível atingido</th>
               <th>Tempo de duração da partida</th>
            </tr>
            <?php
                     require_once("functions.php");
                     $conn = conectaBanco();

                     $sql= 'SELECT pontuacao.id_usuario, pontuacao.pontuacao, pontuacao.nivel, pontuacao.tempo, usuario.user FROM pontuacao, usuario WHERE pontuacao.id_usuario=usuario.id ORDER BY pontuacao.pontuacao DESC limit 10';

                     foreach ($conn->query($sql) as $row) {
                        echo "<tr>";

                        echo "<td>".$row['user']."</td>";
                        echo "<td>".$row['pontuacao']."</td>";
                        echo "<td>".$row['nivel']."</td>";
                        echo "<td>".$row['tempo']."</td>";
                     
                        echo "</tr>";
                    }


                     ?>
         </table>
         <?php
   
                $sql = "SELECT rank from (SELECT t.*, @rownum := @rownum + 1 AS rank FROM pontuacao t, (SELECT @rownum := 0) r ORDER BY t.pontuacao DESC) as subquery where id_usuario = ".$_SESSION['idUser'];

                $stmt = $conn->prepare($sql); 
                $stmt->execute(); 
                $row = $stmt->fetch();
                if($stmt->rowCount() > 0){
                     echo "<h3 class='text-center'>Você está na posição ".$row['rank']." do ranking</h3>";
                }
                else{
                  echo "<h3 class='text-center'>Você ainda não pontuou</h3>";
                }
                     ?>
                     <hr>
      </section>
      <footer class="text-center"><p>Desenvolvido para a disciplina SI401<p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/</footer>
   </body>
</html>

