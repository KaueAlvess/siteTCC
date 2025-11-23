CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    sexo VARCHAR(20),
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    descricao TEXT
);

INSERT INTO produtos (nome, tipo, sexo, preco, descricao) VALUES
('Camiseta West Coast Choopers', 'Camiseta', 'Masculino', 39.90, 'Conforto e estilo no mesmo lugar'),
('Moletom Cropped de Jeans', 'Moletom', 'Feminino', 99.90, 'Moletom feminino'),
('Calca Denim Preta', 'Calca', 'Masculino', 90.90, 'Calça preta masculina'),
('Camiseta feminina cinza', 'Camiseta', 'Feminina', 40.90, 'Confortável e básica'),
('Blusa masculina preta', 'Moletom', 'Masculino', 90.90, 'Blusa preta masculina'),
('Camiseta marrom chocolate', 'Camiseta', 'Feminina', 49.90, 'Camiseta confeccionada em algodão de gola em V e manga comprida'),
('Camiseta esmeralda', 'Camiseta', 'Unissex', 39.90, 'Camisa confeccionada em tecido acetinado. Gola com lapela e manga comprida com acabamento em punho com pregas'),
('Camiseta verde claro', 'Camiseta', 'Unissex', 69.90, 'Camisa confeccionada em linho e viscose 48%. Gola com lapela e manga abaixo do cotovelo com punho. Fecho frontal com botões'),
('Calca de veludo verde', 'Calca', 'Feminina', 89.90, 'Calça de cintura alta e cós elástico. Parte inferior com acabamento em linha evasê'),
('Calca verde', 'Calca', 'Feminina', 79.90, 'Calça confeccionada com linho e viscose 45%. Cintura alta com cós elástico. Bolsos laterais');

SELECT * FROM produtos;