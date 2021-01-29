CREATE DATABASE NUTRISY

USE NUTRISY;

CREATE TABLE NUTRIOLOGOS(
	nutriologoId uniqueidentifier default newId(),
	nombre varchar(30),
	apellido varchar(30),
	especialidad varchar(30),
	correo varchar(50),
	contrasena varchar(30),
	PRIMARY KEY(nutriologoId)
);

CREATE TABLE PACIENTES(
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
	FOREIGN KEY (nutriologoId) REFERENCES NUTRIOLOGOS(nutriologoId)
);

CREATE TABLE COMIDAS(
	comidaId uniqueidentifier default newId(),
	nombre varchar(30),
	imagen varchar(300),
	ingredientes varchar(300),
	PRIMARY KEY(comidaId) 
);


CREATE TABLE DIETAS(
	dietaId uniqueidentifier default newId(),
	nutriologoId uniqueidentifier,
	pacienteId uniqueidentifier,
	nombreDieta varchar(50),
	fechaInicio Date,
	PRIMARY KEY (dietaId),
	FOREIGN KEY (nutriologoId) REFERENCES NUTRIOLOGOS(nutriologoId),
	FOREIGN KEY (pacienteId) REFERENCES PACIENTES(pacienteId),
);

CREATE TABLE DIADIETA(
	diaDietaId uniqueidentifier default newId(),
	dietaId uniqueidentifier,
	comidaId uniqueidentifier,
	ordenDia int,
	ordenComida int,
	nombreComida varchar(20),
	gramos float,
	calorias float,
	FOREIGN KEY (dietaId) REFERENCES DIETAS(dietaId),
	FOREIGN KEY (comidaId) REFERENCES COMIDAS(comidaId)
);

-- DIADIETA
-- La fecha es para ordenar las comidas de el mismo dia
-- nombreComida es para poner el nombre donde va por ejemplo: "Desayuno"
-- orden es para ver el orden en el que se van a acomodar



--Agregar una comida
INSERT INTO COMIDAS (nombre, ingredientes, calorias, gramos)
VALUES('Huevo con Jamon', 'Dos huevos, Dos rebanas de jamon, Una cucharada de aceite', 350, 46)

--Eliminar una comida por ID
DELETE FROM COMIDAS WHERE comidaId='52DD4789-61F2-4CC0-9116-5B14B88FF55F'

--Actualizar una comida por ID
UPDATE COMIDAS
SET nombre='Huevo con algo mas', ingredientes ='Nada'
WHERE comidaId= '52DD4789-61F2-4CC0-9116-5B14B88FF55F'

--Ver una comida por ID
SELECT * FROM COMIDAS WHERE comidaId='D80A46E2-631C-4D27-A88B-8A413D16AF6A' 
