CREATE DATABASE ProyectoFinal;
USE ProyectoFinal;

CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreProducto VARCHAR(50) NOT NULL, 
    descProducto VARCHAR(50) NOT NULL,
    precioProducto INT
);


CREATE TABLE planes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombrePlan VARCHAR(50) NOT NULL, 
    descripcionPlan VARCHAR(50) NOT NULL,
    precioPlan INT
);

CREATE USER 'proyectofinal'@'localhost' IDENTIFIED BY 'usuario1';
GRANT ALL PRIVILEGES ON proyectofinal.* TO 'usuario1'@'localhost';
