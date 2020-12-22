<?php
function conectaBanco(){
    try{
        return new PDO("mysql:host=localhost;dbname=grupo17", "root", "");       
    }catch(PDOException$e){
        echo"Ocorreu um erro: " . $e->getMessage();
    }
}

function login($conn, $usuario, $senha){

    $sql = "select id FROM usuario where user = :user and senha = :senha";
    $stmt = $conn->prepare($sql); 
    $stmt->bindValue(':user', $usuario, PDO::PARAM_STR);
    $stmt->bindValue(':senha', $senha, PDO::PARAM_STR);
    $stmt->execute(); 
    $row = $stmt->fetch();
    if($stmt->rowCount() > 0){
         $_SESSION['idUser'] = $row['id'];
         echo $_SESSION['idUser'];
         verificaLogado();
    }
    else{
        echo '<p>Usuário ou senha incorretos</p>';
    }
}

function atualizarUser($conn, $usuario) {
    $sql = "UPDATE usuario SET nome=:nome, telefone=:telefone, email=:email, senha=:senha WHERE ID = :idUser";
    $stmt = $conn->prepare($sql);
    if($stmt->execute($usuario)) {
        return true;
    }

    return "Erro ao atualizar o usuário";
}

function getDadosUser() {
    if(estaLogado()) {
        $sql = "SELECT * FROM USUARIO WHERE ID = :idUser";
        $conn = conectaBanco();
        $stmt = $conn->prepare($sql);
        $stmt->execute(['idUser' => $_SESSION['idUser']]);

        if($stmt->rowCount() > 0) {
            return $stmt->fetch();
        }
    }
    return null;
}

function cadastrar($conn, $aluno) {
    try {
        $sql = "INSERT INTO usuario(nome, nascimento, cpf, telefone, email, user, senha)
            VALUES(:nome, :dt_nascimento, :cpf, :telefone, :email, :usuario, :senha)";
        if($conn->prepare($sql)->execute($aluno)) {
            return true;
        }

        return false;
    } catch(PDOException $e) {
        return false;
    }
}

function estaLogado(){
    if(isset( $_SESSION['idUser'])){
        return true;
    }else{
        return false;
    }
}

function verificaLogado(){
    if(estaLogado()){
        header('Location: game.php'); 
    }
}

function verificaPermissao(){
    if(!estaLogado()){
        header('Location: index.php'); 
    }
}

function logout(){
    unset($_SESSION['idUser']);
    header('Location: index.php'); 
}

?>

