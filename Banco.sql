CREATE DATABASE banco;

USE banco;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE moedas (
    id_usuario INT PRIMARY KEY,  -- Relacionamento com a tabela de usuários
    saldo DECIMAL(10,2) DEFAULT 0,  -- Saldo de moedas do usuário
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE transacoes_moedas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,  -- Relacionamento com o usuário
    tipo VARCHAR(20),  -- 'ganho' ou 'gasto'
    quantidade DECIMAL(10,2),  -- Quantidade de moedas
    descricao VARCHAR(255),  -- Descrição do motivo da transação
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserindo um usuário fictício
INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao@exemplo.com', 'senha123');

-- Inserindo saldo inicial de moedas para o usuário
INSERT INTO moedas (id_usuario, saldo) VALUES
(1, 100);  -- Usuário com id=1 tem 100 moedas

-- Registro de uma transação de ganho de moedas
INSERT INTO transacoes_moedas (id_usuario, tipo, quantidade, descricao) VALUES
(1, 'ganho', 50, 'Doação realizada');
