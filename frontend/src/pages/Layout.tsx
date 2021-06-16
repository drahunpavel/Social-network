import React from 'react';
import { Container, Grid, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';

import { SideMenu } from '../Components/SideMenu';
import { useHomeStyles } from '../pages/Home/theme';
import { SearchTextField } from '../Components/SearchTextField';
import { Tags } from '../Components/Tags';
import { Users } from '../Components/Users';


interface Layout {
    children: React.ReactNode;
};


export const Layout: React.FC<Layout> = ({ children }): React.ReactElement => {

    const classes = useHomeStyles();

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid sm={1} md={3} item>
                    <SideMenu classes={classes} />
                </Grid>
                <Grid sm={8} md={6} item>
                    {children}
                </Grid>
                <Grid sm={3} md={3} item>
                    <div className={classes.rightSide}>
                        <SearchTextField
                            variant="outlined"
                            placeholder="Поиск по сети"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <Tags
                            classes={classes}
                        />
                        <Users />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
