<?php
try{
    $conn= new PDO("mysql:host=localhost", "root", "");
    $sql= '
    CREATE DATABASE grupo17;
    use grupo17;
    

    SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    START TRANSACTION;
    SET time_zone = "+00:00";
    
    
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!40101 SET NAMES utf8mb4 */;
    
    --
    -- Database: `grupo17`
    --
    
    -- --------------------------------------------------------
    
    --
    -- Table structure for table `pontuacao`
    --
    
    CREATE TABLE `pontuacao` (
      `id` int(11) NOT NULL,
      `id_usuario` int(11) NOT NULL,
      `pontuacao` int(11) NOT NULL,
      `nivel` int(11) NOT NULL,
      `tempo` time NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    
    -- --------------------------------------------------------
    
    --
    -- Table structure for table `usuario`
    --
    
    CREATE TABLE `usuario` (
      `id` int(11) NOT NULL,
      `user` varchar(50) NOT NULL,
      `senha` varchar(50) NOT NULL,
      `nome` varchar(50) NOT NULL,
      `nascimento` date NOT NULL,
      `cpf` varchar(20) NOT NULL,
      `telefone` varchar(20) NOT NULL,
      `email` varchar(50) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    
    --
    -- Indexes for dumped tables
    --
    
    --
    -- Indexes for table `pontuacao`
    --
    ALTER TABLE `pontuacao`
      ADD PRIMARY KEY (`id`),
      ADD KEY `id_usuario` (`id_usuario`);
    
    --
    -- Indexes for table `usuario`
    --
    ALTER TABLE `usuario`
      ADD PRIMARY KEY (`id`),
      ADD UNIQUE KEY `user` (`user`);
    
    --
    -- AUTO_INCREMENT for dumped tables
    --
    
    --
    -- AUTO_INCREMENT for table `pontuacao`
    --
    ALTER TABLE `pontuacao`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
    
    --
    -- AUTO_INCREMENT for table `usuario`
    --
    ALTER TABLE `usuario`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
    
    --
    -- Constraints for dumped tables
    --
    
    --
    -- Constraints for table `pontuacao`
    --
    ALTER TABLE `pontuacao`
      ADD CONSTRAINT `pontuacao_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
    COMMIT;
    
    /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;';
    $conn->exec($sql);
}catch(PDOException$e){
    echo"Ocorreu um erro: " . $e->getMessage();
}
?>