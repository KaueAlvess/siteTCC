<?php
session_start();

$conn = new mysqli("localhost", "root", "root", "banco");

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario_id = 1;
    $quantidade = $_POST['quantidade'];
    $tipo = $_POST['tipo'];
    if ($tipo == 'adicionar') {
        $sql = "UPDATE usuarios SET moedas = moedas + ? WHERE id = ?";
    } else {
        $sql = "UPDATE usuarios SET moedas = moedas - ? WHERE id = ?";
    }
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $quantidade, $usuario_id);
    $stmt->execute();

    echo "Moedas atualizadas com sucesso!";
}

$conn->close();
?>
