import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
    maxWidth: 345,
    margin: '1em'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditDialog = () => {
    setDialog(!dialog)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.avatar}
            </Avatar>
          }
          title={props.title}
              
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Calorias: {props.calories}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Gramos: {props.grams}
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
