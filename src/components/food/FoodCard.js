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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ComidasContext } from '../../context/comidas-context';
import { EditFoodDialog } from './editFoodDialog';

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

  const { eliminarComida } = useContext(ComidasContext)

  const [dialog, setDialog] = useState(false);
 
  const comida = props?.comida;
  console.log(comida);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditDialog = () => {
    setDialog(!dialog)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardMedia 
          className={classes.media}
          image={comida?.imagen}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {comida?.nombre}
          </Typography>
          <Typography variant="body1">
            Ingredientes:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {comida.ingredientes}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => handleEditDialog()}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => eliminarComida(props)} aria-label="eliminar">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <EditFoodDialog open={dialog} onClose={handleEditDialog} comida={props.comida} />
    </>
  );
}
