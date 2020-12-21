<?php
    include('functions.php');
    if(isset($_POST['nome']) && $_POST['nome'] != '' && isset($_POST['data']) && $_POST['data'] != '' && isset($_POST['cpf']) && $_POST['cpf'] != '' && 
    isset($_POST['telefone']) &&  $_POST['telefone'] != '' && isset($_POST['email'])  && $_POST['email'] != '' && 
    isset($_POST['user']) &&  $_POST['user'] != '' && isset($_POST['senha']) && $_POST['senha'] != '') {
        $novoUsuario = array(
            'nome' =>  $_POST['nome'],
            'dt_nascimento' => $_POST['data'],
            'cpf' => $_POST['cpf'],
            'telefone' => $_POST['telefone'],
            'email' => $_POST['email'],
            'usuario' => $_POST['user'],
            'senha' => $_POST['senha'],
        );

        if(cadastrar(conectaBanco(), $novoUsuario)) {
            setLocalStorage('createdUser', '{ status:"success", details: "Cadastrado com sucesso" }');
        }
        else {
            setLocalStorage('createdUser', '{ status:"error", details: "Nome de usuário já cadastrado" }', 'cadastro.php');
        }
    }
    else {
        setLocalStorage('createdUser', '{ status:"warning", details: "Preencha todos os campos!" }', 'cadastro.php');
    }
    

    function setLocalStorage($itemName, $item, $rota = '') {
        $js_code = 'sessionStorage.setItem("'.$itemName.'", JSON.stringify(' . $item . '));
        window.location.href = "./'. $rota .'"';
        echo '<script>' . $js_code . '</script>';
    }
?>