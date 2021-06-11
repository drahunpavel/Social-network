import React from 'react';
import { Button, FormControl, FormGroup, TextField } from '@material-ui/core';
import { ModalBlock } from '../../../Components/ModalBlock';
import { useStylesSignIn } from '../SignIn';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
    // classes: ReturnType<typeof useStylesSignIn>;
};


const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }): React.ReactElement => {
    const classes = useStylesSignIn();

    return (
        <ModalBlock
            visible={open}
            onClose={onClose}
            classes={classes}
            title="Создайте учетную запись">
            <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <TextField
                        className={classes.registerField}
                        autoFocus
                        id="name"
                        label="Имя"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        className={classes.registerField}
                        autoFocus
                        id="email"
                        label="E-Mail"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        className={classes.registerField}
                        autoFocus
                        id="password"
                        label="Пароль"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        type="password"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" fullWidth>
                        Далее
            </Button>
                </FormGroup>
            </FormControl>
        </ModalBlock>
    );
};

export default RegisterModal;