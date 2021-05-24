import React, { useEffect, useState } from 'react'
import { Divider } from "@material-ui/core";
import { ipcRenderer as ipc } from 'electron';
import "../styles/table.css";

export const Binnacles = () => {

    const [comidasInsertadas, setComidasInsertadas] = useState([]);

    useEffect(() => {
        ipc.invoke("TRAERCOMIDASINSERTADAS").then(items => {
            setComidasInsertadas(items)
        })
    }, [])

    console.log(comidasInsertadas);

    return (
        <div>
            <h1>Bitácoras</h1>
            <Divider />

            <h3>Comidas Insertadas</h3>
            <table className="border">
                <tr>
                    <th>id</th>
                    <th>comidaId</th>
                    <th>host</th>
                    <th>usuario</th>
                    <th>accion</th>
                    <th>fecha</th>
                </tr>
                {
                    comidasInsertadas.map(item => {
                        const fecha = new Date(item.fecha).toISOString()

                        return (
                            <tr key="item.id">
                                <td>{item.id}</td>
                                <td>{item.comidaId}</td>
                                <td>{item.host}</td>
                                <td>{item.usuario}</td>
                                <td>{item.accion}</td>
                                <td>{fecha}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}
