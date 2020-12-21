<?php
include("header.php")
?>
      <header>
         <h1>
            Rolling Tetris
         </h1>
      </header>
      <section class="content">
         <h2>Game:</h2>
         <aside class="float-right" style="width: 32%;">
            <ul>
               <li>Tempo da partida: <span id="time">0</span></li>
               <li>Pontuação: <span id="pontuacao">0</span></li>
               <li>Número de linhas eliminadas: <span id="linhas">0</span>  </li>
               <li>Nível de dificuldade: <span id="nivel">0</span></li>
               <table class="text-center mt-4">
                  <tbody>
                     <tr>
                        <th>Nome</th>
                        <th>Pontuação</th>
                        <th>Nível atingido</th>
                        <th>Tempo de duração da partida</th>
                     </tr>
                     <?php
                     require_once("functions.php");
                     $conn = conectaBanco();

                     $sql= 'SELECT pontuacao.id_usuario, pontuacao.pontuacao, pontuacao.nivel, pontuacao.tempo, usuario.nome FROM pontuacao, usuario WHERE pontuacao.id_usuario = '.$_SESSION['idUser'].' and pontuacao.id_usuario=usuario.id ORDER BY pontuacao.pontuacao DESC';

                     foreach ($conn->query($sql) as $row) {
                        echo "<tr>";

                        echo "<td>".$row['nome']."</td>";
                        echo "<td>".$row['pontuacao']."</td>";
                        echo "<td>".$row['nivel']."</td>";
                        echo "<td>".$row['tempo']."</td>";
                     
                        echo "</tr>";
                    }


                     ?>
                  </tbody>
               </table>
            </ul>
         </aside>
         <table id="tabela" style="width: 30%;" class="center"></table>
      </section>
      <div id="gameSize" class="modal">
         <div class="modal-content text-center">
            <h2 class="text-dark">Escolha o tamanho do tabuleiro</h2>
            <button onclick="generateTable(10,20, true)">10 x 20</button> OU
            <button onclick="generateTable(22,44, true)">22 x 44</button>
         </div>
      </div>
      <div id="startGame" class="modal">
         <div class="modal-content text-center">
            <h2 class="text-dark">Iniciar uma nova partida?</h2>
            <button onclick="jogar()"> Sim</button> <button onclick="redirectLogin()">Não</button>          
         </div>
      </div>
      <div id="fimDeJogo" class="modal">
         <div class="modal-content text-center">
            <h2 class="text-dark">Bom jogo!</h2>
            <button onclick="reload()">Jogar novamente</button>
         </div>
      </div>
      <footer class="text-center">
         <p>Desenvolvido para a disciplina SI401
         <p><br>Estilos inspirados/baseados em https://nostalgic-css.github.io/NES.css/
      </footer>
      
      <div id="toasts"></div>
   </body>
</html>

