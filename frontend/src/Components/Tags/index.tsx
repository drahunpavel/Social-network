import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useHomeStyles } from '../../pages/Home/theme';

import { selectTagsItems, selectIsTagsLoading} from '../../store/ducks/tags/selectors';


interface TagsProps {
    classes: ReturnType<typeof useHomeStyles>;
};

export const Tags: React.FC<TagsProps> = ({
    classes,
    //или компонент, или null
}: TagsProps):React.ReactElement | null => {

    const items = useSelector(selectTagsItems);
    const isLoading = useSelector(selectIsTagsLoading);

    if(isLoading){
        return null;
    };

    return(
        <Paper className={classes.rightSideBlock}>
        <Paper className={classes.rightSideBlockHeader} variant="outlined">
          <b>Актуальные темы</b>
        </Paper>
        <List>
            {
                items.map((obj, idx) => (
                    <Fragment  key={idx}>
                            <ListItem className={classes.rightSideBlockItem}>
                                <Link to={`/home/search?q=${obj.name}`}>
                                    <ListItemText
                                        primary={obj.name}
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                            Твитов: {obj.count}
                                            </Typography>
                                        }
                                    />
                                </Link>
                            </ListItem>
                        <Divider component="li" />
                    </Fragment>
                ))
            }
        </List>
      </Paper>
    )
}