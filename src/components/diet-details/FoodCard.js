import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        margin: '1em'
    },
    media: {
        height: "140px",
        width: "100%" // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#3bb33d',
    },
}));

export const FoodCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const comida = props?.comida;

    return (
        <>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={comida?.imagen} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {comida?.nombre}
                    </Typography>
                    <Typography>
                        Calorias: {comida.calorias}
                    </Typography>
                    <Typography>
                        Gramos: {comida.gramos}
                    </Typography>
                    <Typography variant="body1">
                        Ingredientes:
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {comida.ingredientes}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
