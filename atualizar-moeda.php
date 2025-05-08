<?php
session_start();

// Conectar ao banco de dados
$conn = new mysqli("localhost", "root", "root", "banco");

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Atualizar a quantidade de moedas do usuário
$usuario_id = 1;  // Exemplo fixo
$quantidade = $_POST['quantidade'];  // Quantidade de moedas

$sql = "UPDATE usuarios SET moedas = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $quantidade, $usuario_id);
$stmt->execute();

$conn->close();
?>
