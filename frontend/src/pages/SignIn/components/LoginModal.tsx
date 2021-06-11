import React from 'react';
import { Button, FormControl, FormGroup, TextField } from '@material-ui/core';
import { ModalBlock } from '../../../Components/ModalBlock';
import { Color } from '@material-ui/lab/Alert';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; //прослойка между react-hook-form и yup
import * as yup from "yup";

import { useStylesSignIn } from '../SignIn';
import { Notification } from '../../../Components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignIn } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';

export interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    // classes: ReturnType<typeof useStylesSignIn>;
};

export interface LoginModalFormProps {
    email: string;
    password: string;
};

const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Введите почту'),
    password: yup.string().min(6, 'Проверьте свой пароль').required(),
});

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }): React.ReactElement => {
    const classes = useStylesSignIn();

    const dispatch = useDispatch();

    const loadingStatus = useSelector(selectUserStatus);

    const openNotificationRef = React.useRef<(text: string, type: Color) => void>(() => { });

    const { control, handleSubmit, formState: { errors } } = useForm<LoginModalFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });

    const onSubmit = async (data: LoginModalFormProps) => {
        dispatch(fetchSignIn(data));
    };


    React.useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            openNotificationRef.current('Авторизация успешна!', 'success');
            onClose();
        } else if (loadingStatus === LoadingStatus.ERROR) {
            openNotificationRef.current('Неверный логин или пароль', 'error');
        }
    }, [loadingStatus]);


    return <Notification>
        {
            callback => {
                openNotificationRef.current = callback;
                return (
                    <ModalBlock
                        visible={open}
                        onClose={(onClose)}
                        classes={classes}
                        title="Войти в аккаунт">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                                <FormGroup aria-label="position" row>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                className={classes.loginSideField}
                                                id="email"
                                                label="E-Mail"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                type="email"
                                                onBlur={onBlur}
                                                onChange={value => onChange(value)}
                                                value={value}
                                                helperText={errors.email?.message}
                                                error={!!errors.email}
                                                fullWidth
                                                autoFocus
                                            />
                                        )}
                                        name="email"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                className={classes.loginSideField}
                                                id="password"
                                                label="Пароль"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                type="password"
                                                onBlur={onBlur}
                                                onChange={value => onChange(value)}
                                                value={value}
                                                helperText={errors.password?.message}
                                                error={!!errors.password}
                                                fullWidth
                                            />
                                        )}
                                        name="password"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    <Button
                                        // onClick={onClose} 
                                        type='submit'
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Войти
                            </Button>
                                </FormGroup>
                            </FormControl>
                        </form>
                    </ModalBlock>
                )
            }
        }
    </Notification>
};

export default LoginModal;