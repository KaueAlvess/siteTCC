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
    id_usuario INT PRIMARY KEY,
    saldo DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE transacoes_moedas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    tipo VARCHAR(20),
    quantidade DECIMAL(10,2),
    descricao VARCHAR(255),
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao@exemplo.com', 'senha123');

INSERT INTO moedas (id_usuario, saldo) VALUES
(1, 100);

INSERT INTO transacoes_moedas (id_usuario, tipo, quantidade, descricao) VALUES
(1, 'ganho', 50, 'Doação realizada');
