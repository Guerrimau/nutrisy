import React, { useState, useContext, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FoodCard } from '../components/food/FoodCard'
import { NewFoodDialog } from '../components/food/newFoodDialog';
import { EditFoodDialog } from '../components/food/editFoodDialog';
import ToolTip from '../components/shared/ToolTip';
import { ComidasContext } from '../context/comidas-context';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

}));


export const Food = () => {
    const classes = useStyles();

    const { comidas } = useContext(ComidasContext);

    const [dialog, setDialog] = useState(false);

    const handleDialogClick = () => {
        setDialog(!dialog);
    };

    return (
        <div>
            <h1>Comidas</h1>
            <Container>
                <Grid container direction='row' className={classes.root}>
                    {
                        comidas?.map((item, index) => {
                            return (
                                <FoodCard comida={item} comidaId={item.comidaId} avatar={item.nombre[0]} title={item.nombre} description={item.ingredientes}
                                    calories={item.calorias} grams={item.gramos}
                                />
                            )
                        })
                    }
                </Grid>
            </Container>
            <ToolTip onOpen={handleDialogClick} />
            <NewFoodDialog open={dialog} onClose={handleDialogClick} />
        </div>

    );
};
