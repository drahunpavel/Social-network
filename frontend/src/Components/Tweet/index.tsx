import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ReplyOutlined';

import { Avatar, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import { useHomeStyles } from '../../pages/Home/theme';
import { formatDate } from '../../utils/formatDate';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { ImageList } from '../ImageList';
import { ImageObj } from '../AddTweetForm';
import mediumZoom from 'medium-zoom'
import { selectIsTweetLoading } from '../../store/ducks/tweet/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { removeTweet } from '../../store/ducks/tweets/actionCreators';
import { User } from '../../store/ducks/user/contracts/state';

interface TweetProps {
  _id: string,
  text: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string,
  images?: ImageObj[],
  user: User
  isTweetView: boolean;
}

export const Tweet: React.FC<TweetProps> = ({
  _id,
  text,
  user,
  classes,
  createdAt,
  isTweetView,
  images
}: TweetProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const isLoading = useSelector(selectIsTweetLoading);

  const dispatch = useDispatch();

  const handleClickTweet = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    history.push(`/home/tweet/${_id}`);
  };


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };


  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    handleClose(event);
    if (window.confirm('Вы действительно хотите удалить твит?')) {
      dispatch(removeTweet(_id));

    }
  };


  React.useEffect(() => {
    if (!isLoading && isTweetView) {
      mediumZoom('.post-image');
    }
  }, [isLoading, isTweetView]);


  return (
    <div onClick={handleClickTweet} className={classes.tweetWrapper}>
      <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
        <Avatar
          className={classes.tweetAvatar}
          // alt={`Аватарка пользователя ${user.fullname}`}
          src={'user.avatarUrl'}
        />
        <div>
          {isTweetView ?
            <Fragment>
              <Typography className={classes.fullTweetViewHeader}>
                <Link to={`/user/${user._id}`}><b>{user.fullname}</b></Link>
                <span className={classes.tweetUserName}>@{user.username}&nbsp;·&nbsp;{formatDate(new Date(createdAt))}</span>
              </Typography>
              <Typography className={classes.fullTweetViewText} gutterBottom>
                {text}
                {images && <ImageList classes={classes} images={images} />}
              </Typography>
              <Typography className={classes.fullTweetViewHeader}>
                <span className={classes.tweetUserName}>{format(new Date(createdAt), 'H:mm:ss', { locale: ruLang })}&nbsp;&nbsp;{format(new Date(createdAt), 'dd MMM yyyy г.', { locale: ruLang })}</span>
              </Typography>
            </Fragment>
            :
            <Fragment>
              <Typography>
                <b>{user.fullname}</b>&nbsp;
                <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
                <span className={classes.tweetUserName}>·</span>&nbsp;
                <span className={classes.tweetUserName}>{formatDate(new Date(createdAt))}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {text}
                {images && <ImageList classes={classes} images={images} />}
              </Typography>
            </Fragment>
          }
          <div className={classes.tweetFooter}>
            <div>
              <IconButton>
                <CommentIcon style={{ fontSize: 20 }} />
              </IconButton>
              <span>1</span>
            </div>
            <div>
              <IconButton>
                <RepostIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <LikeIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <ShareIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div className={''}>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}

              >
                <MenuItem onClick={handleClose}>
                  Редактировать
                </MenuItem>
                <MenuItem onClick={handleRemove}>
                  Удалить
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

