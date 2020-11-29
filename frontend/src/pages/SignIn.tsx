import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        // height: '100vh',
        height: 'calc(100vh - 84px)'
    },
    blueSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#71C9F8',
        flex: '0 0 50%',
        overflow: 'hidden',
        position: 'relative',
    },
    blueSideBigIcon: {
      position: 'absolute',
      left: '50%',
      top: '45%',
      transform: 'translate(-50%, -50%)',  
      width: '150%',
      height: '150%',
    },
    blueSideListInfo:{
        position: 'relative',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width: 380,
        '& h6': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 20
        }
    },
    blueSideListIcon: {
        fontSize: 32,
        marginRight: 15,
    },
    blueSideListItem: {
        marginTop: 40,
    },
    loginSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 50%',
       
    },
    loginSideicons: {
        fontSize: 50,
    },
    loginSideWrapper: {
        height: '380px'
    },
    loginSideTitle: {
        fontWeight: 700,
        fontSize: 32,
        marginBottom: 45,
        marginTop: 20
    },
    loginButton: {
        marginTop: 20
    }
}));

function SignIn() {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <section className={classes.blueSide}>
                <WifiTetheringIcon className={classes.blueSideBigIcon} color='primary'/>
                <ul className={classes.blueSideListInfo}>
                    <li className={classes.blueSideListItem}><Typography variant='h6'><SearchIcon className={classes.blueSideListIcon}/> Читайте о том, что вам интересно</Typography></li>
                    <li className={classes.blueSideListItem}><Typography variant='h6'><PeopleIcon className={classes.blueSideListIcon}/>Узнайте, о чем говорят в мире</Typography></li>
                    <li className={classes.blueSideListItem}><Typography variant='h6'><ChatBubbleOutlineIcon className={classes.blueSideListIcon}/> Присоединяйтесь к общению</Typography></li>
                </ul>
            </section>
            <section className={classes.loginSide}>
                <div className={classes.loginSideWrapper}>
                    <WifiTetheringIcon className={classes.loginSideicons} color='primary'/>
                    <Typography className={classes.loginSideTitle} variant='h4'>Узнайте, что происходит в мире прямо сейчас</Typography>
                    <Typography><b>Присоединяйтесь прямо сейчас</b></Typography>
                    <br/>
                    <Button className={classes.loginButton} variant='contained' color='primary' fullWidth>Зарегистрироваться</Button>
                    <Button className={classes.loginButton} variant='outlined' color='primary' fullWidth>Войти</Button>
                </div>
            </section>
        </div>
    )
}

export default SignIn
