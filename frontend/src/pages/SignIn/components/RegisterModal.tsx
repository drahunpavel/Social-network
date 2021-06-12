import React from 'react';
import { Button, FormControl, FormGroup, TextField } from '@material-ui/core';
import { ModalBlock } from '../../../Components/ModalBlock';
import { useStylesSignIn } from '../SignIn';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; //прослойка между react-hook-form и yup
import * as yup from "yup";
export interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
};

export interface RegisterModalFormProps {
    fullname: string;
    username: string;
    password: string;
    email: string;
};

const RegisterFormSchema = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Введите почту'),
    fullname: yup.string().min(6, 'ПВведите полное имя').required(),
    username: yup.string().min(6, 'Введите свой логин').required(),
    password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required(),
});

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