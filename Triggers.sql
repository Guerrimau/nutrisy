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

DROP TRIGGER NUTRIOLOGOS_MODIFICADOS_TRIGGER