DROP DATABASE IF EXISTS estoque_db;
CREATE DATABASE estoque_db;
USE estoque_db;

CREATE TABLE filial (
    id_filial INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cep VARCHAR(8) NOT NULL
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100) NOT NULL
);

CREATE TABLE estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    id_filial INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    UNIQUE (id_filial, id_produto)
);

INSERT INTO filial (nome, cnpj, telefone, email, cep) VALUES
('Filial Centro', '12345678000190', '3132221100', 'centro@empresa.com', '30110000'),
('Filial Norte', '98765432000155', '3133445566', 'norte@empresa.com', '31910000'),
('Filial Contagem', '11222333000144', '3134455677', 'contagem@empresa.com', '32010000'),
('Filial Betim', '55666777000188', '3135566788', 'betim@empresa.com', '32600000');

INSERT INTO produto (nome, preco, categoria) VALUES
('Arroz 5kg', 24.90, 'Alimentos'),
('Feijão 1kg', 8.50, 'Alimentos'),
('Detergente 500ml', 3.20, 'Limpeza'),
('Sabão em Pó 1kg', 12.75, 'Limpeza'),
('Papel Higiênico 12un', 18.99, 'Higiene'),
('Escova de Dente', 5.40, 'Higiene'),
('Refrigerante 2L', 7.80, 'Bebidas'),
('Água Mineral 1,5L', 2.50, 'Bebidas');

INSERT INTO estoque (id_filial, id_produto) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 5),
(2, 6),
(3, 3),
(3, 7),
(3, 8),
(4, 1),
(4, 6),
(4, 8);
