CREATE DATABASE amorsaude;

SHOW TABLES;

-- Criação da tabela clinics (versão otimizada para MySQL 8+)
CREATE TABLE IF NOT EXISTS clinics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL COMMENT 'Razão Social',
    fantasy_name VARCHAR(255) NOT NULL COMMENT 'Nome Fantasia',
    cnpj VARCHAR(18) NOT NULL UNIQUE COMMENT 'CNPJ Formatado',
    region VARCHAR(50) NOT NULL COMMENT 'Regional',
    inauguration_date DATE NOT NULL COMMENT 'Data de Inauguração',
    active BOOLEAN DEFAULT TRUE COMMENT 'Status (TRUE=Ativa, FALSE=Inativa)',
    medical_specialties JSON NOT NULL COMMENT 'Especialidades Médicas',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cria a tabela de migrations para compatibilidade com Laravel
CREATE TABLE IF NOT EXISTS migrations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Registra a migration manualmente
INSERT INTO migrations (migration, batch) VALUES 
('2024_05_01_000000_create_clinics_table', 1);



-- Inserção dos dados completos
INSERT INTO clinics (
    company_name, 
    fantasy_name, 
    cnpj, 
    region, 
    inauguration_date, 
    active, 
    medical_specialties
) VALUES 
    ('Amor Saúde Centro Ltda', 'Amor Saúde Centro', '12.345.678/0001-99', 'Centro', '2020-01-15', TRUE, 
    '["Cardiologia", "Dermatologia", "Pediatria", "Ginecologia", "Ortopedia"]'),
    
    ('Bem Estar Saúde S/A', 'Clínica Bem Estar', '98.765.432/0001-11', 'Zona Norte', '2019-05-20', TRUE, 
    '["Cardiologia", "Neurologia", "Pediatria", "Oftalmologia", "Ortopedia"]'),
    
    ('Vida Saudável Medicina Ltda', 'Clínica Vida Saudável', '23.456.789/0001-22', 'Zona Sul', '2021-03-10', TRUE, 
    '["Dermatologia", "Ginecologia", "Pediatria", "Neurologia", "Oftalmologia"]'),
    
    ('Bem Viver Centro Médico S/A', 'Centro Médico Bem Viver', '34.567.890/0001-33', 'Zona Leste', '2018-11-05', TRUE, 
    '["Cardiologia", "Ortopedia", "Neurologia", "Oftalmologia", "Ginecologia"]'),
    
    ('Saúde Integral Ltda', 'Saúde Integral', '45.678.901/0001-44', 'Zona Oeste', '2022-02-28', FALSE, 
    '["Pediatria", "Dermatologia", "Oftalmologia", "Neurologia", "Ginecologia"]'),
    
    ('Vida Plena Saúde S/A', 'Vida Plena', '56.789.012/0001-55', 'Centro', '2020-07-15', TRUE, 
    '["Cardiologia", "Ortopedia", "Neurologia", "Dermatologia", "Pediatria"]'),
    
    ('Horizonte Saúde Ltda', 'Horizonte Saúde', '67.890.123/0001-66', 'Zona Norte', '2021-09-01', TRUE, 
    '["Ginecologia", "Oftalmologia", "Cardiologia", "Pediatria", "Dermatologia"]');

-- Verificação dos dados inseridos
SELECT 
    id,
    fantasy_name AS 'Nome Fantasia',
    cnpj AS 'CNPJ',
    region AS 'Região',
    CASE active 
        WHEN TRUE THEN 'Ativa' 
        ELSE 'Inativa' 
    END AS 'Status',
    JSON_PRETTY(medical_specialties) AS 'Especialidades Médicas',
    DATE_FORMAT(inauguration_date, '%d/%m/%Y') AS 'Inauguração'
FROM clinics;



DELETE FROM users WHERE email = 'teste@exemplo.com';
