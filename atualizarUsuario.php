<?php
require_once("functions.php");
if(isset($_POST['nome']) && $_POST['nome'] != '' &&  isset($_POST['telefone']) &&  $_POST['telefone'] != '' && 
    isset($_POST['email'])  && $_POST['email'] != '' && isset($_POST['senha']) && $_POST['senha'] != '' && isset($_POST['idUser']) && $_POST['idUser'] != '') {
        $novoUsuario = array(
            'idUser' =>  $_POST['idUser'],
            'nome' =>  $_POST['nome'],
            'telefone' => $_POST['telefone'],
            'email' => $_POST['email'],
            'senha' => $_POST['senha'],
        );
        atualizarUser(conectaBanco(), $novoUsuario);
        if(atualizarUser(conectaBanco(), $novoUsuario)) {
            setLocalStorage('createdUser', '{ status:"success", details: "Usuário atualizado com sucesso" }');
        }
        else {
            setLocalStorage('createdUser', '{ status:"error", details: "Nome de usuário já cadastrado" }');
        }
    }
    else {
        setLocalStorage('createdUser', '{ status:"warning", details: "Preencha todos os campos!" }');
    }
?>