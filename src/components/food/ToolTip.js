import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(4),
        backgroundColor: '#3bb33d',
        '&:hover': {
            backgroundColor: '#1eb020',
        },
    },
}));



const ToolTip = ({ onOpen }) => {
    const classes = useStyles();

    return (
        <Fab onClick={onOpen} color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
        </Fab>
    );
};

export default ToolTip;