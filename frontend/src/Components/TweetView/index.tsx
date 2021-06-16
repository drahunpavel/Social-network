import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Tweet } from '../Tweet';

import { fetchTweetData, setTweetData } from '../../store/ducks/tweet/actionCreators';
import { selectIsTweetLoading, selectTweetItems } from '../../store/ducks/tweet/selectors';

import { useHomeStyles } from '../../pages/Home/theme';
import { CircularProgress } from '@material-ui/core';

export const TweetView: React.FC = (): React.ReactElement | null => {

  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsTweetLoading);
  const tweetData = useSelector(selectTweetItems);
  //params - параметры из урла
  const params: { id?: string } = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchTweetData(id));
    }

    //при unmounte компонента, т.е. когда перехожу из просмотра поста к ленте новостей
    //очищаю в редаксе объект выбранного поста
    return () => {
      dispatch(setTweetData(undefined));
    };
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className={classes.tweetsCentred}>
        <CircularProgress />
      </div>
    );
  }

  if (tweetData) {
    return <Tweet classes={classes} {...tweetData} isTweetView={true} />;
  }

  return null;
};

