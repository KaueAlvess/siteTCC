<?php
session_start();

// Conectar ao banco de dados
$conn = new mysqli("localhost", "root", "root", "banco");

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Lógica para realizar a doação
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Adicionar ou remover moedas para o usuário (logado, exemplo sem ID de usuário)
    $usuario_id = 1;  // Exemplo fixo, ajuste conforme necessário

    $quantidade = $_POST['quantidade'];  // Quantidade de moedas a adicionar ou remover
    $tipo = $_POST['tipo'];  // Tipo: 'adicionar' ou 'remover'

    if ($tipo == 'adicionar') {
        // Adicionar moedas
        $sql = "UPDATE usuarios SET moedas = moedas + ? WHERE id = ?";
    } else {
        // Remover moedas
        $sql = "UPDATE usuarios SET moedas = moedas - ? WHERE id = ?";
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $quantidade, $usuario_id);
    $stmt->execute();

    echo "Moedas atualizadas com sucesso!";
}

$conn->close();
?>
