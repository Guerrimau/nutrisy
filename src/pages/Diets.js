import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import { TableContainer, Typography, Button, TextField, IconButton } from '@material-ui/core';
import {
    Edit,
    Delete
} from "@material-ui/icons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ToolTip from '../components/shared/ToolTip';
import { NewDietDialog } from "../components/diet/NewDietDialog";
import { EditDietDialog } from "../components/diet/editDietDialog";
import { DietasContext } from '../context/dietas-context';

export const Diets = () => {
    const [selectedDiet, setSelectedDiet] = useState({});
    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    const history = useHistory();

    const { dietas, traerDietas, eliminarDieta } = useContext(DietasContext);

    useEffect(() => {
        traerDietas();
    }, [])

    const handleAddDialogClick = () => {
        setAddDialog(!addDialog);
    }
    
    const handleEditDialogClick = (diet) => {
        setSelectedDiet(diet)
        setEditDialog(!editDialog);
    }

    const handleDietDetailsClick = (diet) => {
        history.push({ pathname: '/details', state: diet });
    }

    return (
        <div>
            <h1>Dietas</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Nombre de Dieta</TableCell>
                            <TableCell>Fecha de inicio</TableCell>
                            <TableCell>Comidas</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dietas.map(item => (
                                <TableRow key={item.dietaId}>
                                    <TableCell>
                                        {item.nombreCompleto}
                                    </TableCell>
                                    <TableCell>
                                        {item.nombreDieta}
                                    </TableCell>
                                    <TableCell>
                                        {item.fechaInicio.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            style={{backgroundColor: "green", color: "white"}}
                                            onClick={() => handleDietDetailsClick(item)}>Comidas</Button>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEditDialogClick(item)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => eliminarDieta(item)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ToolTip onOpen={handleAddDialogClick} />
            <NewDietDialog open={addDialog} onClose={handleAddDialogClick} />
            <EditDietDialog open={editDialog} onClose={handleEditDialogClick} dieta={selectedDiet} />
        </div>
    )
}
