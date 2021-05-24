--? NUTRIOLOGOS
-- Insertar
CREATE TRIGGER NUTRIOLOGOS_INSERTADOS_TRIGGER
ON NUTRIOLOGOS
FOR INSERT
AS
DECLARE @query varchar(1000), @nutriologoId UNIQUEIDENTIFIER, @nombre VARCHAR(50), @apellido VARCHAR(50), @especialidad VARCHAR(50), @correo VARCHAR(50), @contrasena VARCHAR(50)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @apellido=(SELECT apellido FROM inserted)
	SET @especialidad=(SELECT especialidad FROM inserted)
	SET @correo=(SELECT correo FROM inserted)
	SET @contrasena=(SELECT contrasena FROM inserted)
	SET @query= CONCAT('Insert into Nutriologos: ', @nutriologoId, ', ', @nombre, ', ', @apellido, ', ', @especialidad, ', ', @correo, ', ', @contrasena )
INSERT NUTRIOLOGOSINSERTADOS
	(host,usuario,fecha,accion, nutriologoId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @nutriologoId);

-- Actualizar
CREATE TRIGGER NUTRIOLOGOS_MODIFICADOS_TRIGGER
ON NUTRIOLOGOS
FOR UPDATE
AS
DECLARE @query varchar(1000), @nutriologoId UNIQUEIDENTIFIER, @nombre VARCHAR(50), @apellido VARCHAR(50), @especialidad VARCHAR(50), @correo VARCHAR(50), @contrasena VARCHAR(50)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @apellido=(SELECT apellido FROM inserted)
	SET @especialidad=(SELECT especialidad FROM inserted)
	SET @correo=(SELECT correo FROM inserted)
	SET @contrasena=(SELECT contrasena FROM inserted)
	SET @query= CONCAT('Update Nutriologos: ', @nutriologoId, ', ', @nombre, ', ', @apellido, ', ', @especialidad, ', ', @correo, ', ', @contrasena )
INSERT NUTRIOLOGOSMODIFICADOS
	(host,usuario,fecha,accion, nutriologoId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @nutriologoId);

-- Delete
CREATE TRIGGER NUTRIOLOGOS_ELIMINADOS_TRIGGER
ON NUTRIOLOGOS
FOR DELETE
AS
DECLARE @query varchar(1000), @nutriologoId UNIQUEIDENTIFIER
	SET @nutriologoId=(SELECT nutriologoId FROM deleted)
	SET @query= CONCAT('DELETE FROM NUTRIOLOGOS WHERE ID=', @nutriologoId)
INSERT NUTRIOLOGOSELIMINADOS
	(host,usuario,fecha,accion, nutriologoId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @nutriologoId);




--? PACIENTES
-- Insert
CREATE TRIGGER PACIENTES_INSERTADOS_TRIGGER
ON PACIENTES
FOR INSERT
AS
DECLARE @query varchar(1000), @pacienteId UNIQUEIDENTIFIER, @nutriologoId UNIQUEIDENTIFIER, @nombreCompleto VARCHAR(150), @email VARCHAR(100), @sexo VARCHAR(20), @peso float, @altura int, @imc float, @calorias int
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombreCompleto=(SELECT nombreCompleto FROM inserted)
	SET @email=(SELECT email FROM inserted)
	SET @sexo=(SELECT sexo FROM inserted)
	SET @peso=(SELECT peso FROM inserted)
	SET @altura=(SELECT altura FROM inserted)
	SET @imc=(SELECT imc FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @query= CONCAT('Insert into PACIENTES: ', @pacienteId, ', ', @nutriologoId, ', ', @nombreCompleto, ', ', @email, ', ', @sexo, ', ', @peso, ', ', @altura, ', ', @imc, ', ', @calorias )
INSERT PACIENTESINSERTADOS
	(host,usuario,fecha,accion, pacienteId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @pacienteId);

--Modificar
CREATE TRIGGER PACIENTES_MODIFICADOS_TRIGGER
ON PACIENTES
FOR UPDATE
AS
DECLARE @query varchar(1000), @pacienteId UNIQUEIDENTIFIER, @nutriologoId UNIQUEIDENTIFIER, @nombreCompleto VARCHAR(150), @email VARCHAR(100), @sexo VARCHAR(20), @peso float, @altura int, @imc float, @calorias int
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombreCompleto=(SELECT nombreCompleto FROM inserted)
	SET @email=(SELECT email FROM inserted)
	SET @sexo=(SELECT sexo FROM inserted)
	SET @peso=(SELECT peso FROM inserted)
	SET @altura=(SELECT altura FROM inserted)
	SET @imc=(SELECT imc FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @query= CONCAT('UPDATE PACIENTES: ', @pacienteId, ', ', @nutriologoId, ', ', @nombreCompleto, ', ', @email, ', ', @sexo, ', ', @peso, ', ', @altura, ', ', @imc, ', ', @calorias )
INSERT PACIENTESMODIFICADOS
	(host,usuario,fecha,accion, pacienteId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @pacienteId);

-- Delete
CREATE TRIGGER PACIENTES_ELIMINADOS_TRIGGER
ON PACIENTES
FOR DELETE
AS
DECLARE @query varchar(1000), @pacienteId UNIQUEIDENTIFIER
	SET @pacienteId=(SELECT pacienteId FROM deleted)
	SET @query= CONCAT('DELETE FROM PACIENTES WHERE ID=', @pacienteId)
INSERT PACIENTESELIMINADOS
	(host,usuario,fecha,accion, pacienteId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @pacienteId);





--? COMIDAS
-- Insertar
CREATE TRIGGER COMIDAS_INSERTADOS_TRIGGER
ON COMIDAS
FOR INSERT
AS
DECLARE @query varchar(1000), @comidaId UNIQUEIDENTIFIER, @nombre VARCHAR(30), @imagen VARCHAR(300), @ingredientes VARCHAR(300)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @imagen=(SELECT imagen FROM inserted)
	SET @ingredientes=(SELECT ingredientes FROM inserted)
	SET @query= CONCAT('Insert into Comidas: ', @comidaId, ', ', @nombre, ', ', @imagen, ', ', @ingredientes)
INSERT COMIDASISERTADOS
	(host,usuario,fecha,accion, comidaId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @comidaId);
-- Actualizar
CREATE TRIGGER COMIDAS_MODIFICADOS_TRIGGER
ON COMIDAS
FOR UPDATE
AS
DECLARE @query varchar(1000), @comidaId UNIQUEIDENTIFIER, @nombre VARCHAR(30), @imagen VARCHAR(300), @ingredientes VARCHAR(300)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @imagen=(SELECT imagen FROM inserted)
	SET @ingredientes=(SELECT ingredientes FROM inserted)
	SET @query= CONCAT('Update COMIDAS: ', @comidaId, ', ', @nombre, ', ', @imagen, ', ', @ingredientes)
INSERT COMIDASMODIFICADOS
	(host,usuario,fecha,accion, comidaId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @comidaId);
-- Delete
CREATE TRIGGER COMIDAS_ELIMINADOS_TRIGGER
ON COMIDAS
FOR DELETE
AS
DECLARE @query varchar(1000), @comidaId UNIQUEIDENTIFIER
	SET @comidaId=(SELECT comidaId FROM deleted)
	SET @query= CONCAT('DELETE FROM COMIDAS WHERE ID=', @comidaId)
INSERT COMIDASELIMINADOS
	(host,usuario,fecha,accion, comidaId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @comidaId);





--? DIETA
-- Insertar
CREATE TRIGGER DIETA_INSERTADOS_TRIGGER
ON DIETAS
FOR INSERT
AS
DECLARE @query varchar(1000), @dietaId UNIQUEIDENTIFIER, @nutriologoId uniqueidentifier,@pacienteId uniqueidentifier,@nombredieta VARCHAR(50),@fechaInicio DATE
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nombredieta=(SELECT nombredieta FROM inserted)
	SET @fechaInicio=(SELECT fechaInicio FROM inserted)
	SET @query= CONCAT('Insert into Dieta: ', @dietaId, ', ', @nutriologoId, ', ', @pacienteId, ', ', @nombredieta, ', ', @fechaInicio )
INSERT DIETAINSERTADOS
	(host,usuario,fecha,accion, dietaid)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @dietaId);

--Actualizar
CREATE TRIGGER DIETA_MODIFICADOS_TRIGGER
ON DIETAS
FOR UPDATE
AS
DECLARE @query varchar(1000), @dietaId UNIQUEIDENTIFIER, @nutriologoId uniqueidentifier,@pacienteId uniqueidentifier,@nombredieta VARCHAR(50),@fechaInicio DATE
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nombredieta=(SELECT nombredieta FROM inserted)
	SET @fechaInicio=(SELECT fechaInicio FROM inserted)
	SET @query= CONCAT('UPDATE Dieta: ', @dietaId, ', ', @nutriologoId, ', ', @pacienteId, ', ', @nombredieta, ', ', @fechaInicio )
INSERT DIETAMODIFICADOS
	(host,usuario,fecha,accion, dietaid)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @dietaId);
-- Delete
CREATE TRIGGER DIETA_ELIMINADOS_TRIGGER
ON DIETAS
FOR DELETE
AS
DECLARE @query varchar(1000), @dietaId UNIQUEIDENTIFIER
	SET @dietaId=(SELECT dietaId FROM deleted)
	SET @query= CONCAT('DELETE FROM DIETA WHERE ID=', @dietaId)
INSERT DIETAELIMINADOS
	(host,usuario,fecha,accion, dietaid)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @dietaId);





--? DIADIETA
-- Insertar
CREATE TRIGGER DIADIETA_INSERTADOS_TRIGGER
ON DIADIETA
FOR INSERT
AS
DECLARE @query varchar(1000), @diaDietaId UNIQUEIDENTIFIER, @dietaId UNIQUEIDENTIFIER,@comidaId UNIQUEIDENTIFIER,@ordenDia int, @ordenComida int, @nombreComida VARCHAR(300),@gramos float,@calorias float
	SET @diaDietaId=(SELECT diaDietaId FROM inserted)
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @ordenDia=(SELECT ordenDia FROM inserted)
	SET @nombreComida=(SELECT nombreComida FROM inserted)
	SET @gramos=(SELECT gramos FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @query= CONCAT('Insert into DIADIETA: ', @diaDietaId, ', ',@dietaId, ', ',@comidaId, ', ', @ordenDia, ', ', @ordenComida, ', ', @nombreComida, ', ', @gramos, ', ', @calorias)
INSERT DIADIETAINSERTADOS
	(host,usuario,fecha,accion, diaDietaId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @diaDietaId);

-- Actualizar
CREATE TRIGGER DIADIETA_MODIFICADOS_TRIGGER
ON DIADIETA
FOR UPDATE
AS
DECLARE @query varchar(1000), @diaDietaId UNIQUEIDENTIFIER, @dietaId UNIQUEIDENTIFIER,@comidaId UNIQUEIDENTIFIER,@ordenDia int, @ordenComida int, @nombreComida VARCHAR(300),@gramos float,@calorias float
	SET @diaDietaId=(SELECT diaDietaId FROM inserted)
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @ordenDia=(SELECT ordenDia FROM inserted)
	SET @nombreComida=(SELECT nombreComida FROM inserted)
	SET @gramos=(SELECT gramos FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @query= CONCAT('Update into DIADIETA: ', @diaDietaId, ', ',@dietaId, ', ',@comidaId, ', ', @ordenDia, ', ', @ordenComida, ', ', @nombreComida, ', ', @gramos, ', ', @calorias)
INSERT DIADIETAMODIFICADOS
	(host,usuario,fecha,accion, diaDietaId)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @diaDietaId);

-- Delete
CREATE TRIGGER DIADIETA_ELIMINADOS_TRIGGER
ON DIADIETA
FOR DELETE
AS
DECLARE @query varchar(1000), @diaDietaId UNIQUEIDENTIFIER
	SET @diaDietaId=(SELECT diaDietaId FROM deleted)
	SET @query= CONCAT('DELETE FROM DIETA WHERE ID=', @diaDietaId)
INSERT DIETAELIMINADOS
	(host,usuario,fecha,accion, dietaid)
VALUES(@@SERVERNAME, SUSER_NAME(), GETDATE(), @query, @diaDietaId);