import React from 'react';
import { useHistory } from 'react-router-dom';

//MU
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHomeStyles } from '../../pages/Home/theme';

interface BackButtonProps {
    classes: ReturnType<typeof useHomeStyles>;
}

export const BackButton:React.FC<BackButtonProps> = ({
    classes
}:BackButtonProps):React.ReactElement => {

    const history = useHistory();

    //при клике возвращет на предыдущие состояние урла
    const handleClickButton = () => history.goBack();

    return(
        <IconButton onClick={handleClickButton} className={classes.tweetsHeaderBackButton} color='primary'>
            <ArrowBackIcon/>
        </IconButton>
    )
};