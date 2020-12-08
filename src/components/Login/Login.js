import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid';
import Person  from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Fondo from '../img/fondo.jpg'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + Fondo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(15, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignInSide() {
    const classes = useStyles();


    const pswdRef = useRef(null);
    const unameRef = useRef(null);

    let status = false;
    let uname = ""
    let pswd = ""

    /*const performLogin = () => {
        uname = unameRef.current.value;
        pswd = pswdRef.current.value;
    
        if (pswd !== "" && uname !== "") {
            let data = JSON.stringify({
                username: uname,
                password: pswd
            });
            fetch(`${BASE_URL}/u/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: data
            }).then((res) => {
                console.log(res)
                if (res.status == 200) {
                    status = true
                } else {
                    status = false
                }
                return res.json();
            }, (error) => {

            })
                .then((res) => {
                    if (status) {
                        login(res);
                    } else {
                        alert("Usuario o contraseña incorrectos")  
                        uname = ""
                        pswd = ""
                    }

                });

        } else {
            alert("Favor de completar los campos.");
        }
    };*/

    /*const handleRegistry = () =>{
        return (
            <Registrar/>
        )
    }*/


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Person />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Usuario"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={unameRef}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={pswdRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => console.log("Iniciar sesion")}
                        >
                            Sign In
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}