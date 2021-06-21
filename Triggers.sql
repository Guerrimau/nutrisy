
CREATE TRIGGER NUTRIOLOGOS_INSERTADOS_TRIGGER
ON NUTRIOLOGOS
FOR INSERT
AS
DECLARE @query varchar(1000), @nutriologoId UNIQUEIDENTIFIER, @nombre VARCHAR(50), @apellido VARCHAR(50), @especialidad VARCHAR(50), @correo VARCHAR(50), @contrasena VARCHAR(50), @usuario VARCHAR(100), @createdBy varchar(100)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @apellido=(SELECT apellido FROM inserted)
	SET @especialidad=(SELECT especialidad FROM inserted)
	SET @correo=(SELECT correo FROM inserted)
	SET @usuario=(SELECT createdBy FROM inserted)
	SET @contrasena=(SELECT contrasena FROM inserted)
	SET @query= CONCAT('Insert into Nutriologos: ', @nutriologoId, ', ', @nombre, ', ', @apellido, ', ', @especialidad, ', ', @correo, ', ', @contrasena )
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'INSERT',@query,'NUTRIOLOGOS');

-- Actualizar
CREATE TRIGGER NUTRIOLOGOS_MODIFICADOS_TRIGGER
ON NUTRIOLOGOS
FOR UPDATE
AS
DECLARE @query varchar(1000), @nutriologoId UNIQUEIDENTIFIER, @nombre VARCHAR(50), @apellido VARCHAR(50), @especialidad VARCHAR(50), @correo VARCHAR(50), @contrasena VARCHAR(50), @createdBy varchar(100)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @apellido=(SELECT apellido FROM inserted)
	SET @especialidad=(SELECT especialidad FROM inserted)
	SET @correo=(SELECT correo FROM inserted)
	SET @contrasena=(SELECT contrasena FROM inserted)
	SET @query= CONCAT('Update Nutriologos: ', @nutriologoId, ', ', @nombre, ', ', @apellido, ', ', @especialidad, ', ', @correo, ', ', @contrasena )
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'UPDATE',@query,'NUTRIOLOGOS');

-- Delete
CREATE TRIGGER NUTRIOLOGOS_ELIMINADOS_TRIGGER
ON NUTRIOLOGOS
FOR DELETE
AS
DECLARE @query varchar(1000), @nutriologoId UNIQUEIDENTIFIER, @createdBy varchar(100)
	SET @nutriologoId=(SELECT nutriologoId FROM deleted)
	SET @query= CONCAT('DELETE FROM NUTRIOLOGOS WHERE ID=', @nutriologoId)
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'UPDATE',@query,'DELETE');


--? PACIENTES
-- Insert
CREATE TRIGGER PACIENTES_INSERTADOS_TRIGGER
ON PACIENTES
FOR INSERT
AS
DECLARE @query varchar(1000), @pacienteId UNIQUEIDENTIFIER, @nutriologoId UNIQUEIDENTIFIER, @nombreCompleto VARCHAR(150), @email VARCHAR(100), @sexo VARCHAR(20), @peso float, @altura int, @imc float, @calorias int, @createdBy varchar(100)
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombreCompleto=(SELECT nombreCompleto FROM inserted)
	SET @email=(SELECT email FROM inserted)
	SET @sexo=(SELECT sexo FROM inserted)
	SET @peso=(SELECT peso FROM inserted)
	SET @altura=(SELECT altura FROM inserted)
	SET @imc=(SELECT imc FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('INSERT INTO PACIENTES (nutriologoId, nombreCompleto, email, sexo, peso, altura, imc, calorias ) VALUES (', @nutriologoId, ', ', @nombreCompleto, ', ', @email, ', ', @sexo, ', ', @peso, ', ', @altura, ', ', @imc, ', ', @calorias, ')')
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'INSERT',@query,'PACIENTES');

--Modificar
CREATE TRIGGER PACIENTES_MODIFICADOS_TRIGGER
ON PACIENTES
FOR UPDATE
AS
DECLARE @query varchar(1000), @pacienteId UNIQUEIDENTIFIER, @nutriologoId UNIQUEIDENTIFIER, @nombreCompleto VARCHAR(150), @email VARCHAR(100), @sexo VARCHAR(20), @peso float, @altura int, @imc float, @calorias int, @createdBy varchar(100)
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @nombreCompleto=(SELECT nombreCompleto FROM inserted)
	SET @email=(SELECT email FROM inserted)
	SET @sexo=(SELECT sexo FROM inserted)
	SET @peso=(SELECT peso FROM inserted)
	SET @altura=(SELECT altura FROM inserted)
	SET @imc=(SELECT imc FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('UPDATE PACIENTES SET nombreCompleto=', @nombreCompleto, ', email= ', @email, ', sexo=', @sexo, ', peso=', @peso, ', altura=', @altura, ', imc=', @imc, ', calorias=', @calorias, 'WHERE pacienteId=',@pacienteId )
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla) VALUES(@@SERVERNAME, @createdBy , GETDATE(),'UPDATE',@query, 'PACIENTES');

-- Delete
CREATE TRIGGER PACIENTES_ELIMINADOS_TRIGGER
ON PACIENTES
FOR DELETE
AS
DECLARE @query varchar(1000), @pacienteId UNIQUEIDENTIFIER, @createdBy varchar(100)
	SET @pacienteId=(SELECT pacienteId FROM deleted)
	SET @createdBy=(SELECT createdBy FROM deleted)
	SET @query= CONCAT('DELETE FROM PACIENTES WHERE pacienteId=', @pacienteId)
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla) VALUES(@@SERVERNAME, @createdBy , GETDATE(), 'DELETE', @query, 'PACIENTES');

--? COMIDAS
-- Insertar
CREATE TRIGGER COMIDAS_INSERTADOS_TRIGGER
ON COMIDAS
FOR INSERT
AS
DECLARE @query varchar(1000), @comidaId UNIQUEIDENTIFIER, @nombre VARCHAR(30), @imagen VARCHAR(300), @ingredientes VARCHAR(300), @createdBy varchar(100)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @imagen=(SELECT imagen FROM inserted)
	SET @ingredientes=(SELECT ingredientes FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('INSERT INTO COMIDAS (imagen, nombre, ingredientes) VALUES (', @imagen, ', ',@nombre , ', ', @ingredientes,')')
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'INSERT',@query,'COMIDAS');

-- Actualizar
CREATE TRIGGER COMIDAS_MODIFICADOS_TRIGGER
ON COMIDAS
FOR UPDATE
AS
DECLARE @query varchar(1000), @comidaId UNIQUEIDENTIFIER, @nombre VARCHAR(30), @imagen VARCHAR(300), @ingredientes VARCHAR(300), @createdBy varchar(100)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @nombre=(SELECT nombre FROM inserted)
	SET @imagen=(SELECT imagen FROM inserted)
	SET @ingredientes=(SELECT ingredientes FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('UPDATE COMIDAS SET nombre=', @nombre,', ingredientes=', @ingredientes, ', imagen=', @imagen,'WHERE comidaId=',@comidaId )
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'UPDATE',@query,'COMIDAS');

-- Delete
CREATE TRIGGER COMIDAS_ELIMINADOS_TRIGGER
ON COMIDAS
FOR DELETE
AS
DECLARE @query varchar(1000), @comidaId UNIQUEIDENTIFIER, @createdBy varchar(100)
	SET @comidaId=(SELECT comidaId FROM deleted)
	SET @createdBy=(SELECT createdBy FROM deleted)
	SET @query= CONCAT('DELETE FROM COMIDAS WHERE comidaId=', @comidaId)
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'DELETE',@query,'COMIDAS');



SELECT * FROM BITACORAS

--? DIETA
-- Insertar
CREATE TRIGGER DIETA_INSERTADOS_TRIGGER
ON DIETAS
FOR INSERT
AS
DECLARE @query varchar(1000), @dietaId UNIQUEIDENTIFIER, @nutriologoId uniqueidentifier,@pacienteId uniqueidentifier,@nombredieta VARCHAR(50),@fechaInicio DATE, @createdBy varchar(100)
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nombredieta=(SELECT nombredieta FROM inserted)
	SET @fechaInicio=(SELECT fechaInicio FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('INSERT INTO DIETAS (nutriologoId, pacienteId, nombreDieta, fechaInicio) VALUES (', @nutriologoId, ', ', @pacienteId, ', ', @nombredieta, ', ', @fechaInicio, ')' )    
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'INSERT',@query,'DIETA');

--Actualizar
CREATE TRIGGER DIETA_MODIFICADOS_TRIGGER
ON DIETAS
FOR UPDATE
AS
DECLARE @query varchar(1000), @dietaId UNIQUEIDENTIFIER, @nutriologoId uniqueidentifier,@pacienteId uniqueidentifier,@nombredieta VARCHAR(50),@fechaInicio DATE, @createdBy varchar(100)
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @nutriologoId=(SELECT nutriologoId FROM inserted)
	SET @pacienteId=(SELECT pacienteId FROM inserted)
	SET @nombredieta=(SELECT nombredieta FROM inserted)
	SET @fechaInicio=(SELECT fechaInicio FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('UPDATE DIETAS SET nutriologoId=', @nutriologoId, ', pacienteId=', @pacienteId, ',nombreDieta= ', @nombredieta, ', fechaInicio=', @fechaInicio, 'WHERE dietaId=',@dietaId )
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'UPDATE',@query,'DIETA');

-- Delete
CREATE TRIGGER DIETA_ELIMINADOS_TRIGGER
ON DIETAS
FOR DELETE
AS
DECLARE @query varchar(1000), @dietaId UNIQUEIDENTIFIER, @createdBy varchar(100)
	SET @dietaId=(SELECT dietaId FROM deleted)
	SET @createdBy=(SELECT createdBy FROM deleted)
	SET @query= CONCAT('DELETE FROM DIETA WHERE ID=', @dietaId)
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'DELETE',@query,'DIETA');



--? DIADIETA
-- Insertar
CREATE TRIGGER DIADIETA_INSERTADOS_TRIGGER
ON DIADIETA
FOR INSERT
AS
DECLARE @query varchar(1000), @diaDietaId UNIQUEIDENTIFIER, @dietaId UNIQUEIDENTIFIER,@comidaId UNIQUEIDENTIFIER,@ordenDia int, @ordenComida int, @nombreComida VARCHAR(300),@gramos float,@calorias float, @createdBy varchar(100)
	SET @diaDietaId=(SELECT diaDietaId FROM inserted)
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @ordenDia=(SELECT ordenDia FROM inserted)
	SET @nombreComida=(SELECT nombreComida FROM inserted)
	SET @gramos=(SELECT gramos FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('INSERT INTO DIADIETA (dietaId, comidaId, ordenDia, ordenComida, nombreComida, gramos, calorias) VALUES (',@dietaId, ', ',@comidaId, ', ', @ordenDia, ', ', @ordenComida, ', ', @nombreComida, ', ', @gramos, ', ', @calorias,')')
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'INSERT',@query,'DIADIETA');


-- Actualizar
CREATE TRIGGER DIADIETA_MODIFICADOS_TRIGGER
ON DIADIETA
FOR UPDATE
AS
DECLARE @query varchar(1000), @diaDietaId UNIQUEIDENTIFIER, @dietaId UNIQUEIDENTIFIER,@comidaId UNIQUEIDENTIFIER,@ordenDia int, @ordenComida int, @nombreComida VARCHAR(300),@gramos float,@calorias float, @createdBy varchar(100)
	SET @diaDietaId=(SELECT diaDietaId FROM inserted)
	SET @dietaId=(SELECT dietaId FROM inserted)
	SET @comidaId=(SELECT comidaId FROM inserted)
	SET @ordenDia=(SELECT ordenDia FROM inserted)
	SET @nombreComida=(SELECT nombreComida FROM inserted)
	SET @gramos=(SELECT gramos FROM inserted)
	SET @calorias=(SELECT calorias FROM inserted)
	SET @createdBy=(SELECT createdBy FROM inserted)
	SET @query= CONCAT('UPDATE DIETAS SET dietaId=',@dietaId, ', comidaId=',@comidaId, ',ordenDia= ', @ordenDia, ', ordenComida=', @ordenComida, ', nombreComida=', @nombreComida, ', gramos=', @gramos, ', calorias=', @calorias, 'WHERE diaDietaId=',@diaDietaId )
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'UPDATE',@query,'DIADIETA');

-- Delete
CREATE TRIGGER DIADIETA_ELIMINADOS_TRIGGER
ON DIADIETA
FOR DELETE
AS
DECLARE @query varchar(1000), @diaDietaId UNIQUEIDENTIFIER, @createdBy varchar(100)
	SET @diaDietaId=(SELECT diaDietaId FROM deleted)
	SET @createdBy=(SELECT createdBy FROM deleted)
	SET @query= CONCAT('DELETE FROM DIETA WHERE diaDietaId=', @diaDietaId)
INSERT BITACORAS(host,usuario,fecha,accion,query,tabla ) VALUES(@@SERVERNAME, @createdBy,GETDATE(),'DELETE',@query,'DIADIETA');