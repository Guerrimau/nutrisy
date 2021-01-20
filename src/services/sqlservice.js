const Connection = require("tedious").Connection
const Request = require("tedious").Request
const { ipcMain } = require('electron')
const { TYPES } = require("tedious")

/**
 * Read data from the database
 * @param 'connection' connection object to use to connect to DB
 * @param 'sqlQuery' sqlQuery as a string to be executed against the database
 * @returns 'Promise' A promise object with either collection of data or an error
*/
const readFromDb = (connection, sqlQuery) => {
    return new Promise((resolve, reject) => {
        let items = []

        console.log('Reading rows from the Table...')

        // Read all rows from table
        let request = new Request(sqlQuery, (err, rowCount, rows) => {
            if (err) {
                reject(err)
            } else {
                console.log(rowCount + ' row(s) returned')
                resolve(items)
                connection.close()
            }
        })

        request.on('doneInProc', (rowCount, more, rows) => {
            items = []
            rows.map(row => {
                let result = {}
                row.map(child => {
                    result[child.metadata.colName] = child.value
                })
                items.push(result)
            })
        })

        // Execute SQL statement
        connection.execSql(request)
    })
}

/**
 * Connect to the database
 * @returns 'Promise' A promise object containing an open connection to the database
*/
const connectToServer = () => {
    return new Promise((resolve, reject) => {
        const config = {
            server: 'localhost',
            authentication: {
                type: 'default',
                options: {
                    userName: 'sa',
                    password: 'Administrador123'
                }
            },
            options: {
                database: 'NUTRISY',
                instanceName: 'MSSQLSERVER',

                // These two settings are really important to make successfull connection
                encrypt: false,
                trustServerCertificate: false,

                // This will allow you to access the rows returned. 
                // See 'doneInProc' event below
                rowCollectionOnDone: true
            }
        }

        let connection = new Connection(config)

        connection.connect()

        connection.on('connect', function (err) {
            if (err) {
                console.log('Error: ', err)
                reject(err)
            } else {
                // If no error, then good to go...
                console.log('Connection Successful!')
                resolve(connection)
            }
        })

        connection.on('end', () => { console.log("Connection Closed!") })
    })
}



//! FUNCIONES DE COMIDAS

const crearComida = (e, arguments) => {
    
    const crearComidaQuery = "INSERT INTO COMIDAS (imagen, nombre, ingredientes) VALUES (@imagen, @nombre,@ingredientes)"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(crearComidaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        connection.close()
                    }
                })
                request.addParameter('nombre', TYPES.NVarChar, arguments?.nombre)
                request.addParameter('ingredientes', TYPES.NVarChar, arguments?.ingredientes)
                request.addParameter('imagen', TYPES.NVarChar, arguments?.imagen)

                connection.execSql(request);

                resolve(true);
            }).catch(err => reject(err))
    })
}

const getComidas = () => {
    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let sqlStr = 'SELECT * FROM COMIDAS'

                return readFromDb(connection, sqlStr)
            })
            .then(products => resolve(products))
            .catch(err => reject(err))
    })
}

const eliminarComida = (e, arguments) => {

    const eliminarComidaQuery = "DELETE FROM COMIDAS WHERE comidaId=@comidaId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(eliminarComidaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se elimino la comida con exito")
                        connection.close()
                    }
                })
                request.addParameter("comidaId", TYPES.UniqueIdentifier, arguments?.comidaId)
                connection.execSql(request);
            })
            .then(e => resolve("Se elimino con exito"))
            .catch(e => reject(e))
    });
}

const actualizarComida = (e, arguments) => {
    const actualizarComidaQuery = "UPDATE COMIDAS SET nombre=@nombre, ingredientes=@ingredientes, imagen=@imagen WHERE comidaId=@comidaId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(actualizarComidaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se elimino la comida con exito")
                        connection.close()
                    }
                })
                request.addParameter("comidaId", TYPES.UniqueIdentifier, arguments?.comidaId)
                request.addParameter('nombre', TYPES.NVarChar, arguments?.nombre)
                request.addParameter('ingredientes', TYPES.NVarChar, arguments?.ingredientes)
                request.addParameter('imagen', TYPES.NVarChar, arguments?.imagen)

                connection.execSql(request);
            })
            .then(e => resolve(e))
            .catch(e => reject(e))
    })
}

ipcMain.handle("ACTUALIZARCOMIDA", actualizarComida);
ipcMain.handle("ELIMINARCOMIDA", eliminarComida);
ipcMain.handle("CREARCOMIDA", crearComida);
ipcMain.handle('GETCOMIDAS', getComidas);



//! FUNCIONES DE PACIENTES

const traerPacientes = (e, nutriologoId) => {
    
    const traerPacientesQuery = "SELECT * FROM PACIENTES WHERE nutriologoId=@nutriologoId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                
                let items = [];

                let request = new Request(traerPacientesQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve(items)
                        connection.close()
                    }
                });
                request.addParameter("nutriologoId", TYPES.UniqueIdentifier, nutriologoId)

                request.on('doneInProc', (rowCount, more, rows) => {
                    items = []
                    rows.map(row => {
                        let result = {}
                        row.map(child => {
                            result[child.metadata.colName] = child.value
                        })
                        items.push(result);
                    })
                })

                connection.execSql(request);
            })
            .catch(e => reject(e))
    });
}

const crearPaciente = (e, arguments) => {
    const crearPacienteQuery = "INSERT INTO PACIENTES (nutriologoId, nombreCompleto, email, sexo, peso, altura, imc, calorias ) VALUES (@nutriologoId, @nombreCompleto, @email, @sexo, @peso, @altura, @imc, @calorias)";
    
    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(crearPacienteQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se ha creado un nuevo paciente")
                        connection.close()
                    }
                })
                request.addParameter("nutriologoId", TYPES.UniqueIdentifier, arguments?.nutriologoId)
                request.addParameter("nombreCompleto", TYPES.VarChar, arguments?.nombreCompleto)
                request.addParameter("email", TYPES.VarChar, arguments?.email)
                request.addParameter("sexo", TYPES.VarChar, arguments?.sexo)
                request.addParameter("peso", TYPES.Float, arguments?.peso)
                request.addParameter("altura", TYPES.Int, arguments?.altura)
                request.addParameter("imc", TYPES.Float, arguments?.imc)
                request.addParameter("calorias", TYPES.Int, arguments?.calorias)

                connection.execSql(request);
            }).catch(err => reject(err))
    })
}

const actualizarPaciente = (e, arguments) => {
    const actualizarPacienteQuery = "UPDATE PACIENTES SET nombreCompleto=@nombreCompleto, email=@email, sexo=@sexo, peso=@peso, altura=@altura, imc=@imc, calorias=@calorias WHERE pacienteId=@pacienteId";

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(actualizarPacienteQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se actualizo con exito")
                        connection.close()
                    }
                })
                request.addParameter("pacienteId", TYPES.UniqueIdentifier, arguments?.pacienteId)
                request.addParameter("nombreCompleto", TYPES.VarChar, arguments?.nombreCompleto)
                request.addParameter("email", TYPES.VarChar, arguments?.email)
                request.addParameter("sexo", TYPES.VarChar, arguments?.sexo)
                request.addParameter("peso", TYPES.Float, arguments?.peso)
                request.addParameter("altura", TYPES.Int, arguments?.altura)
                request.addParameter("imc", TYPES.Float, arguments?.imc)
                request.addParameter("calorias", TYPES.Int, arguments?.calorias)

                console.log(request);
                connection.execSql(request);
            })
            .then(e => resolve(e))
            .catch(e => reject(e))
    })

}

const eliminarPaciente = (e, arguments) => {
    const eliminarPacienteQuery = "DELETE FROM PACIENTES WHERE pacienteId=@pacienteId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(eliminarPacienteQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se elimino el paciente con exito")
                        connection.close()
                    }
                })
                request.addParameter("pacienteId", TYPES.UniqueIdentifier, arguments?.pacienteId)
                connection.execSql(request);
            })
            .then(e => resolve("Se elimino con exito"))
            .catch(e => reject(e))
    });
} 

ipcMain.handle("TRAERPACIENTES", traerPacientes);
ipcMain.handle("CREARPACIENTE", crearPaciente);
ipcMain.handle("ACTUALIZARPACIENTE", actualizarPaciente);
ipcMain.handle("ELIMINARPACIENTE", eliminarPaciente);



//! Funciones de Dietas
const traerDietas= (e, nutriologoId) => {
    
    const traerDietasQuery = "SELECT dietaId, DIETAS.nutriologoId, DIETAS.pacienteId, nombreCompleto, nombreDieta, fechaInicio FROM DIETAS, PACIENTES WHERE DIETAS.nutriologoId=@nutriologoId AND DIETAS.pacienteId = PACIENTES.pacienteId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                
                let items = [];

                let request = new Request(traerDietasQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve(items)
                        connection.close()
                    }
                });
                request.addParameter("nutriologoId", TYPES.UniqueIdentifier, nutriologoId)

                request.on('doneInProc', (rowCount, more, rows) => {
                    items = []
                    rows.map(row => {
                        let result = {}
                        row.map(child => {
                            result[child.metadata.colName] = child.value
                        })
                        items.push(result);
                    })
                })

                connection.execSql(request);
            })
            .catch(e => reject(e))
    });
}

const crearDieta = (e, arguments) => {
    const crearDietaQuery = "INSERT INTO DIETAS (nutriologoId, pacienteId, nombreDieta, fechaInicio) VALUES (@nutriologoId, @pacienteId, @nombreDieta, @fechaInicio)";
    
    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(crearDietaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se ha creado un nuevo paciente")
                        connection.close()
                    }
                })
                request.addParameter("nutriologoId", TYPES.UniqueIdentifier, arguments?.nutriologoId)
                request.addParameter("pacienteId", TYPES.UniqueIdentifier, arguments?.pacienteId)
                request.addParameter("nombreDieta", TYPES.VarChar, arguments?.nombreDieta)
                request.addParameter("fechaInicio", TYPES.Date, arguments?.fechaInicio)

                connection.execSql(request);
            }).catch(err => reject(err))
    })
}

const actualizarDieta = (e, arguments) => {
    const actualizarDietaQuery = "UPDATE DIETAS SET nutriologoId=@nutriologoId, pacienteId=@pacienteId, nombreDieta=@nombreDieta, fechaInicio=@fechaInicio WHERE dietaId=@dietaId";

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(actualizarDietaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se actualizo con exito")
                        connection.close()
                    }
                })
                request.addParameter("nutriologoId", TYPES.UniqueIdentifier, arguments?.nutriologoId)
                request.addParameter("pacienteId", TYPES.UniqueIdentifier, arguments?.pacienteId)
                request.addParameter("nombreDieta", TYPES.VarChar, arguments?.nombreDieta)
                request.addParameter("fechaInicio", TYPES.Date, arguments?.fechaInicio)

                connection.execSql(request);
            })
            .then(e => resolve(e))
            .catch(e => reject(e))
    })

}

const eliminarDieta = (e, arguments) => {
    const eliminarDietaQuery = "DELETE FROM DIETAS WHERE dietaId=@dietaId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(eliminarDietaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se elimino el paciente con exito")
                        connection.close()
                    }
                })
                request.addParameter("dietaId", TYPES.UniqueIdentifier, arguments?.dietaId)
                connection.execSql(request);
            })
            .then(e => resolve("Se elimino con exito"))
            .catch(e => reject(e))
    });
} 

ipcMain.handle("TRAERDIETAS", traerDietas);
ipcMain.handle("CREARDIETA", crearDieta);
ipcMain.handle("ACTUALIZARDIETA", actualizarDieta);
ipcMain.handle("ELIMINARDIETA", eliminarDieta);



//! Dia Dieta Funciones

const traerDiaDietas= (e, arguments) => {
    
    const traerDiaDietasQuery = "SELECT * FROM DIADIETA WHERE dietaId=@dietaId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                
                let items = [];

                let request = new Request(traerDiaDietasQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve(items)
                        connection.close()
                    }
                });
                request.addParameter("dietaId", TYPES.UniqueIdentifier, arguments?.dietaId)

                request.on('doneInProc', (rowCount, more, rows) => {
                    items = []
                    rows.map(row => {
                        let result = {}
                        row.map(child => {
                            result[child.metadata.colName] = child.value
                        })
                        items.push(result);
                    })
                })

                connection.execSql(request);
            })
            .catch(e => reject(e))
    });
}

const crearDiaDieta = (e, arguments) => {
    const crearDiaDietaQuery = "INSERT INTO DIADIETA (dietaId, comidaId, ordenDia, ordenComida, nombreComida, gramos, calorias) VALUES (@dietaId, @comidaId, @ordenDia, @ordenComida, @nombreComida, @gramos, @calorias)";
    
    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(crearDiaDietaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se ha creado un nuevo paciente")
                        connection.close()
                    }
                })
                request.addParameter("dietaId", TYPES.UniqueIdentifier, arguments?.dietaId)
                request.addParameter("comidaId", TYPES.UniqueIdentifier, arguments?.comidaId)
                request.addParameter("ordenDia", TYPES.Int, arguments?.ordenDia)
                request.addParameter("ordenComida", TYPES.Int, arguments?.ordenComida)
                request.addParameter("nombreComida", TYPES.VarChar, arguments?.nombreComida)
                request.addParameter("gramos", TYPES.Float, arguments?.gramos)
                request.addParameter("calorias", TYPES.Float, arguments?.calorias)

                connection.execSql(request);
            }).catch(err => reject(err))
    })
}

const actualizarDiaDieta = (e, arguments) => {
    const actualizarDiaDietaQuery = 'UPDATE DIETAS SET dietaId=@dietaId, comidaId=@comidaId, ordenDia=@ordenDia, ordenComida=@ordenComida, nombreComida=@nombreComida, gramos=@gramos, calorias=@calorias  WHERE diaDietaId=@diaDietaId' 
    
    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(actualizarDiaDietaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se ha creado un nuevo paciente")
                        connection.close()
                    }
                })
                request.addParameter("dietaId", TYPES.UniqueIdentifier, arguments?.dietaId)
                request.addParameter("comidaId", TYPES.UniqueIdentifier, arguments?.comidaId)
                request.addParameter("ordenDia", TYPES.Int, arguments?.ordenDia)
                request.addParameter("ordenComida", TYPES.Int, arguments?.ordenComida)
                request.addParameter("nombreComida", TYPES.VarChar, arguments?.nombreComida)
                request.addParameter("gramos", TYPES.Float, arguments?.gramos)
                request.addParameter("calorias", TYPES.Float, arguments?.calorias)

                connection.execSql(request);
            }).catch(err => reject(err))
    })
}

const eliminarDiaDieta = (e, arguments) => {
    const eliminarDiaDietaQuery = "DELETE FROM DIADIETA WHERE diaDietaId=@diaDietaId"

    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let request = new Request(eliminarDiaDietaQuery, (err, rowCount, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(rowCount + ' row(s) returned')
                        resolve("Se elimino el paciente con exito")
                        connection.close()
                    }
                })
                request.addParameter("dietaId", TYPES.UniqueIdentifier, arguments?.dietaId)
                connection.execSql(request);
            })
            .then(e => resolve("Se elimino con exito"))
            .catch(e => reject(e))
    });
} 

ipcMain.handle("TRAERDIADIETAS", traerDiaDietas);
ipcMain.handle("CREARDIADIETA", crearDiaDieta);
ipcMain.handle("ACTUALIZARDIADIETA", actualizarDiaDieta);
ipcMain.handle("ELIMINARDIADIETA", eliminarDiaDieta);