<?php
// Conectar ao banco
$conn = new mysqli("localhost", "root", "root", "teste");

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Buscar cupom
$codigoCupom = $_POST['cupom']; // ou $_GET['cupom'], depende do seu formulário
$sql = "SELECT * FROM cupons WHERE codigo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $codigoCupom);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $cupom = $result->fetch_assoc();
    echo "Desconto: " . $cupom['desconto'] . "% válido até: " . $cupom['validade'];
} else {
    echo "Cupom inválido.";
}

$conn->close();
?>
