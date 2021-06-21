import React, { useEffect, useState } from 'react'
import { TableContainer, Divider } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ipcRenderer as ipc } from 'electron';
import "../styles/table.css";

export const Binnacles = () => {

    const [bitacoras, setBitacoras] = useState([]);

    useEffect(() => {
        ipc.invoke("TRAERBITACORAS").then(items => {
            setBitacoras(items)
        })
    }, [])

    return (
        <div>
            <h1>Bitácoras</h1>
            <Divider />
            <TableContainer style={{ overflow: "hidden"}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>host</TableCell>
                            <TableCell>usuario</TableCell>
                            <TableCell>tabla</TableCell>
                            <TableCell>accion</TableCell>
                            <TableCell>query</TableCell>
                            <TableCell>fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bitacoras !== undefined ?
                            bitacoras.map((item) => {
                                const fecha = new Date(item.fecha).toISOString()
                                return (
                                    <TableRow key={item.id}>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.host}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.usuario}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.tabla}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.accion}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.query}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {fecha}
                                    </TableCell>
                                </TableRow>
                                );
                            }) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
