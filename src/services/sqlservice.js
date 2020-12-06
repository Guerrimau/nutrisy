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
                    password: 'administrador123'
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


const crearComida = (e, arguments) => {
    
    const crearComidaQuery = "INSERT INTO COMIDAS (nombre, ingredientes,calorias,gramos) VALUES (@nombre,@ingredientes,@calorias,@gramos)"

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
                request.addParameter('calorias', TYPES.Int, arguments?.calorias)
                request.addParameter('gramos', TYPES.Int, arguments?.gramos)

                connection.execSql(request);
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



ipcMain.handle("CREARCOMIDA", crearComida);
ipcMain.handle('GETCOMIDAS', getComidas);