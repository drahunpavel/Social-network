import { colors, Menu, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHomeStyles } from '../../pages/Home/theme';
import { selectUserData } from '../../store/ducks/user/selectors';
import { signOut } from '../../store/ducks/user/actionCreators';

// signOut

interface UserSideProfileProps {
    classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: React.FC<UserSideProfileProps> = ({
    classes,
}: UserSideProfileProps) => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        window.localStorage.removeItem('token');
        dispatch(signOut());
    };

    if (!userData) {
        return null;
    }

    return (
        <>
            <div onClick={handleOpenPopup} className={classes.sideProfile}>
                <Avatar
                    alt={`Аватарка пользователя UserAvatar`}
                    src="https://i.pinimg.com/originals/16/d3/ac/16d3ac4608a0534abe596e52fe1e6f68.jpg"
                />
                <div className={classes.sideProfileInfo}>
                    <b>{userData.fullname}</b>
                    <Typography style={{ color: colors.grey[500] }}>@{userData.username}</Typography>
                </div>
                <ArrowBottomIcon />
            </div>
            <Menu
                classes={{
                    paper: classes.profileMenu,
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClosePopup}
                keepMounted>
                <Link to={`/user/${userData._id}`}>
                    <MenuItem onClick={handleClosePopup}>Мой профиль</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
            </Menu>
        </>
    );
};
