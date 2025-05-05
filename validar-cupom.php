<?php
// Cabeçalho para resposta em JSON
header('Content-Type: application/json');

// Conectar ao banco de dados
$host = "localhost";
$user = "root";      // Usuário do MySQL
$pass = "root";          // Senha do MySQL
$dbname = "banco"; // Nome do banco de dados

$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar a conexão com o banco de dados
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Falha na conexão com o banco de dados.']));
}

// Obter o cupom enviado pela requisição
$cupom = isset($_POST['cupom']) ? $_POST['cupom'] : null;

// Verificar se o cupom foi enviado
if (!$cupom) {
    echo json_encode(['success' => false, 'message' => 'Cupom não fornecido.']);
    exit;
}

// Consultar no banco de dados o cupom enviado
$query = "SELECT * FROM cupons WHERE codigo = '$cupom'";
$result = $conn->query($query);

// Verificar se o cupom existe no banco
if ($result->num_rows > 0) {
    $cupomData = $result->fetch_assoc();
    
    // Verificar se o cupom está expirado
    $dataAtual = new DateTime();
    $dataExpiracao = new DateTime($cupomData['validade']);
    
    if ($dataAtual > $dataExpiracao) {
        echo json_encode(['success' => false, 'message' => 'Cupom expirado.']);
    } else {
        // Retornar o valor de desconto
        $desconto = $cupomData['desconto'];
        echo json_encode(['success' => true, 'desconto' => $desconto, 'message' => 'Cupom válido!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Cupom inválido.']);
}

// Fechar a conexão com o banco de dados
$conn->close();
?>
