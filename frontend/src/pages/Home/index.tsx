import React from 'react';
import { Container, Grid, InputAdornment, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';


import { AddTweetForm } from '../../Components/AddTweetForm';
import { Tweet } from '../../Components/Tweet';
import { SideMenu } from '../../Components/SideMenu';
import { useHomeStyles } from '../../pages/Home/theme';
import { SearchTextField } from '../../Components/SearchTextField';
import { Tags } from '../../Components/Tags';
import { BackButton } from '../../Components/BackButton/BackButton';
import { TweetView } from '../../Components/TweetView';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import { fetchTags } from '../../store/ducks/tags/actionCreators';
import { selectIsTweetsLoading, selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { Route } from 'react-router-dom';
import { fetchTweetData } from '../../store/ducks/tweet/actionCreators';
import { Users } from '../../Components/Users';





// TODO
// 2. Попробовать сделать пункт "Главная" в меню

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectIsTweetsLoading);

  // const handleFetchTweets = () => dispatch(fetchTweets());

  React.useEffect(() => {
    dispatch(fetchTweets());
    // dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Paper className={classes.tweetsWrapper} variant="outlined">
      <Paper className={classes.tweetsHeader} variant="outlined">
        <Route path='/home/:any'>
          <BackButton classes={classes} />
        </Route>
        <Route path={['/home', '/home/search']} exact>
          <Typography variant="h6">Все посты</Typography>
        </Route>
        <Route path="/home/tweet">
          <Typography variant="h6">Просмотр поста</Typography>
        </Route>
      </Paper>
      {/* //todo разобраться с данным функционалом */}
      <Route path={['/home', '/home/search']} exact>
        <Paper>
          <div className={classes.addForm}>
            <AddTweetForm classes={classes} />
          </div>
          <div className={classes.addFormBottomLine} />
        </Paper>
      </Route>

      <Route path="/home" exact>
        {isLoading ? (
          <div className={classes.tweetsCentred}>
            <CircularProgress />
          </div>
        ) : (
          tweets.map((tweet, idx) => (
            <Tweet key={tweet._id} classes={classes} {...tweet} images={tweet.images} isTweetView={false} />
          ))
        )}
      </Route>
      <Route path="/home/tweet/:id" component={TweetView} exact />

    </Paper>
  );
};
