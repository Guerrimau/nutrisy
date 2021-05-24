CREATE DATABASE NUTRISY

USE NUTRISY

CREATE TABLE NUTRIOLOGOS
(
	nutriologoId uniqueidentifier default newId(),
	nombre varchar(30),
	apellido varchar(30),
	especialidad varchar(30),
	correo varchar(50),
	contrasena varchar(30),
	PRIMARY KEY(nutriologoId),
	query varchar(100)
);

CREATE TABLE PACIENTES
(
	pacienteId uniqueidentifier default newId(),
	nutriologoId uniqueidentifier,
	nombreCompleto varchar(150),
	email varchar(100),
	sexo varchar(20),
	peso float,
	altura int,
	imc float,
	calorias int,
	PRIMARY KEY(pacienteId),
	FOREIGN KEY (nutriologoId) REFERENCES NUTRIOLOGOS(nutriologoId),
	query varchar(100)
);

CREATE TABLE COMIDAS
(
	comidaId uniqueidentifier default newId(),
	nombre varchar(30),
	imagen varchar(300),
	ingredientes varchar(300),
	PRIMARY KEY(comidaId),
	query varchar(100)
);


CREATE TABLE DIETAS
(
	dietaId uniqueidentifier default newId(),
	nutriologoId uniqueidentifier,
	pacienteId uniqueidentifier,
	nombreDieta varchar(50),
	fechaInicio Date,
	PRIMARY KEY (dietaId),
	FOREIGN KEY (nutriologoId) REFERENCES NUTRIOLOGOS(nutriologoId),
	FOREIGN KEY (pacienteId) REFERENCES PACIENTES(pacienteId),
	query varchar(100)
);

CREATE TABLE DIADIETA
(
	diaDietaId uniqueidentifier default newId(),
	dietaId uniqueidentifier,
	comidaId uniqueidentifier,
	ordenDia int,
	ordenComida int,
	nombreComida varchar(20),
	gramos float,
	calorias float,
	FOREIGN KEY (dietaId) REFERENCES DIETAS(dietaId),
	FOREIGN KEY (comidaId) REFERENCES COMIDAS(comidaId),
	query varchar(100)
);

--? BITACORAS

CREATE TABLE NUTRIOLOGOSINSERTADOS (
	id uniqueidentifier default newId(),
	nutriologoId varchar(200),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE NUTRIOLOGOSMODIFICADOS (
	id uniqueidentifier default newId(),
	nutriologoId varchar(200),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE NUTRIOLOGOSELIMINADOS (
	id uniqueidentifier default newId(),
	nutriologoId varchar(200),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE PACIENTESINSERTADOS (
	id uniqueidentifier default newId(),
	pacienteId varchar(200),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE PACIENTESMODIFICADOS (
	id uniqueidentifier default newId(),
	pacienteId varchar(200),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE PACIENTESELIMINADOS (
	id uniqueidentifier default newId(),
	pacienteId varchar(200),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE COMIDASISERTADOS
(
	id uniqueidentifier default newId(),
	comidaId varchar(50),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE COMIDASMODIFICADOS
(
	id uniqueidentifier default newId(),
	comidaId varchar(50),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
	
);

CREATE TABLE COMIDASELIMINADOS
(
	id uniqueidentifier default newId(),
	comidaId varchar(50),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
	
);

CREATE TABLE DIETAINSERTADOS
(
	id uniqueidentifier default newId(),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
	dietaid varchar(300)
);

CREATE TABLE DIETAMODIFICADOS
(
	id uniqueidentifier default newId(),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
	dietaid varchar(300)
);

CREATE TABLE DIETAELIMINADOS
(
	id uniqueidentifier default newId(),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
	dietaid varchar(300)
);

CREATE TABLE DIADIETAINSERTADOS
(
	id uniqueidentifier default newId(),
	diaDietaId varchar(50),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE DIADIETAMODIFICADOS
(
	id uniqueidentifier default newId(),
	diaDietaId varchar(50),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

CREATE TABLE DIADIETAELIMINADOS
(
	id uniqueidentifier default newId(),
	diaDietaId varchar(50),
	host varchar(50),
	usuario varchar(50),
	accion varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

--Agregar una comida
INSERT INTO COMIDAS
	(nombre, ingredientes, calorias, gramos)
VALUES('Huevo con Jamon', 'Dos huevos, Dos rebanas de jamon, Una cucharada de aceite', 350, 46)

--Eliminar una comida por ID
DELETE FROM COMIDAS WHERE comidaId='52DD4789-61F2-4CC0-9116-5B14B88FF55F'

--Actualizar una comida por ID
UPDATE COMIDAS
SET nombre='Huevo con algo mas', ingredientes ='Nada'
WHERE comidaId= '52DD4789-61F2-4CC0-9116-5B14B88FF55F'

--Ver una comida por ID
SELECT *
FROM COMIDAS
WHERE comidaId='D80A46E2-631C-4D27-A88B-8A413D16AF6A' 
