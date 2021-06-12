import React from 'react';
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import { useHomeStyles } from '../../pages/Home/theme';
import { selectUsersItems } from '../../store/ducks/users/selectors';
import { useSelector } from 'react-redux';

export const Users = (): React.ReactElement => {
    const classes = useHomeStyles();

    const items = useSelector(selectUsersItems);

    return (
        <Paper className={classes.rightSideBlock}>
            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                <b>Кого читать</b>
            </Paper>
            <List>
                {
                    items.map((items, index) =>
                        <ListItem key={index} className={classes.rightSideBlockItem}>
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://pbs.twimg.com/profile_images/1267938486566428673/US6KRPbA_normal.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Dock Of Shame"
                                secondary={
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        @FavDockOfShame
                                    </Typography>
                                }
                            />
                            <Button color="primary">
                                <PersonAddIcon />
                            </Button>
                        </ListItem>
                    )
                }
                <Divider component="li" />
            </List>
        </Paper>
    );
};