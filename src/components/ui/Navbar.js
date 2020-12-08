import React, { Children } from 'react'
import { AppBar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Home, ExitToApp } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4)
    }
}));

export const Navbar = ({ children }) => {

    const classes = useStyles();

    const drawerOptions = [
        {
            text: "Inicio",
            icon: <Home />
        },
        {
            text: "Comidas",
            icon: <Home />
        },
        {
            text: "Dietas",
            icon: <Home />
        },
    ]

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
            >
                <div className={classes.drawerContainer}>
                    <Typography variant="h4" style={{ width: drawerWidth, height: "65px"}}>
                        Nutrisy
                    </Typography>
                    <Divider />
                    <List>
                        {
                            drawerOptions.map((item, index) => {
                                const { text, icon } = item;
                                return (
                                    <ListItem button key={text}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                );
                            })
                        }
                        <Divider style={{ marginTop: "20px", marginBottom: "5px" }} />
                        <ListItem
                            button
                            key="Cerrar sesion">
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary="Cerrar sesion" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                { children }
            </main>
        </div>
    )
}
