<?php
session_start();

$conn = new mysqli("localhost", "root", "root", "banco");
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
$usuario_id = 1;
$quantidade = $_POST['quantidade'];

$sql = "UPDATE usuarios SET moedas = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $quantidade, $usuario_id);
$stmt->execute();
// Atualizar a quantidade de moedas do usuário
$conn->close();
?>
