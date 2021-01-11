import React from 'react';

//MU
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHomeStyles } from '../../pages/Home/theme';
import { useHistory } from 'react-router-dom';


interface BackButtonProps {
    classes: ReturnType<typeof useHomeStyles>;
}

export const BackButton:React.FC<BackButtonProps> = ({
    classes
}:BackButtonProps):React.ReactElement => {

    const history = useHistory();

    const handleClickButton = () => {
        history.goBack();
    };

    return(
        <IconButton onClick={handleClickButton} className={classes.tweetsHeaderBackButton} color='primary'>
            <ArrowBackIcon/>
        </IconButton>
    )
};