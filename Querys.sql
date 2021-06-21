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
	query varchar(100),
	createdBy varchar(100)
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
	query varchar(100),
	createdBy varchar(100)
);

CREATE TABLE COMIDAS
(
	comidaId uniqueidentifier default newId(),
	nombre varchar(30),
	imagen varchar(300),
	ingredientes varchar(300),
	PRIMARY KEY(comidaId),
	query varchar(100),
	createdBy varchar(100)
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
	query varchar(100),
	createdBy varchar(100)
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
	PRIMARY KEY (diaDietaId),
	FOREIGN KEY (dietaId) REFERENCES DIETAS(dietaId),
	FOREIGN KEY (comidaId) REFERENCES COMIDAS(comidaId),
	query varchar(100),
	createdBy varchar(100)
);

--? BITACORAS
CREATE TABLE BITACORAS (
	id uniqueidentifier default newId(),
	host varchar(50),
	usuario varchar(50),
	tabla varchar(200),
	accion varchar(20),
	query varchar(3000),
	fecha DATETIME,
	PRIMARY KEY (id),
);

