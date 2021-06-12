import React from 'react';
import { Button, FormControl, FormGroup, TextField } from '@material-ui/core';
import { ModalBlock } from '../../../Components/ModalBlock';
import { useStylesSignIn } from '../SignIn';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; //прослойка между react-hook-form и yup
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';

import { Notification } from '../../../Components/Notification';
import { Color } from '@material-ui/lab/Alert';
import { LoadingStatus } from '../../../store/types';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { fetchSignUp } from '../../../store/ducks/user/actionCreators';
export interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
};

export interface RegisterModalFormProps {
    fullname: string;
    username: string;
    email: string;
    password: string;
    password2: string;

};

const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required('Введите своё имя'),
    email: yup.string().email('Неверная почта').required('Введите почту'),
    username: yup.string().required('Введите логин'),
    password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
    password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'), //ссылка на поле password, сравнение

});

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }): React.ReactElement => {
    const classes = useStylesSignIn();

    const dispatch = useDispatch();

    const loadingStatus = useSelector(selectUserStatus);

    const openNotificationRef = React.useRef<(text: string, type: Color) => void>(() => { });

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterModalFormProps>({
        resolver: yupResolver(RegisterFormSchema)
    });

    const onSubmit = async (data: RegisterModalFormProps) => {
        dispatch(fetchSignUp(data));
    };

    React.useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            openNotificationRef.current('Регистрация успешна!', 'success');
            onClose();
        } else if (loadingStatus === LoadingStatus.ERROR) {
            openNotificationRef.current('Ошибка при регистрации', 'error');
        }
    }, [loadingStatus]);

    return <Notification>
        {
            callback => {
                openNotificationRef.current = callback;
                return (
                    <ModalBlock
                        visible={open}
                        onClose={onClose}
                        classes={classes}
                        title="Создайте учетную запись">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                                <FormGroup aria-label="position" row>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                className={classes.registerField}
                                                autoFocus
                                                id="fullname"
                                                label="Имя"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                type="fullname"
                                                onBlur={onBlur}
                                                onChange={value => onChange(value)}
                                                value={value}
                                                helperText={errors.fullname?.message}
                                                error={!!errors.fullname}
                                                fullWidth
                                            />
                                        )}
                                        name="fullname"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                className={classes.registerField}
                                                autoFocus
                                                id="username"
                                                label="Логин"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                type="username"
                                                onBlur={onBlur}
                                                onChange={value => onChange(value)}
                                                value={value}
                                                helperText={errors.username?.message}
                                                error={!!errors.username}
                                                fullWidth
                                            />
                                        )}
                                        name="username"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
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
                                                onBlur={onBlur}
                                                onChange={value => onChange(value)}
                                                value={value}
                                                helperText={errors.email?.message}
                                                error={!!errors.email}
                                                fullWidth
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
                                                className={classes.registerField}
                                                autoFocus
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
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                className={classes.registerField}
                                                autoFocus
                                                id="password2"
                                                label="Пароль"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                type="password"
                                                onBlur={onBlur}
                                                onChange={value => onChange(value)}
                                                value={value}
                                                helperText={errors.password2?.message}
                                                error={!!errors.password2}
                                                fullWidth
                                            />
                                        )}
                                        name="password2"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />

                                    <Button
                                        disabled={loadingStatus === LoadingStatus.LOADING}
                                        type='submit'
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Зарегистрироваться
                                </Button>
                                </FormGroup>
                            </FormControl>
                        </form>

                    </ModalBlock>
                );
            }
        }
    </Notification>


};

export default RegisterModal;