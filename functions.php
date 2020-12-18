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

