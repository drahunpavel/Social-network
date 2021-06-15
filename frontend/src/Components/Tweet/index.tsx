import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
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

interface TweetProps {
  _id: string,
  text: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string,
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
  isTweetView: boolean;
}

export const Tweet: React.FC<TweetProps> = ({
  _id,
  text,
  user,
  classes,
  createdAt,
  isTweetView
}: TweetProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

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



  return (
    <div onClick={handleClickTweet} className={classes.tweetWrapper}>
      <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватарка пользователя ${user.fullname}`}
          src={user.avatarUrl}
        />
        <div>
          {isTweetView ?
            <Fragment>
              <Typography className={classes.fullTweetViewHeader}>
                <b>{user.fullname}</b>
                <span className={classes.tweetUserName}>@{user.username}&nbsp;·&nbsp;{formatDate(new Date(createdAt))}</span>
              </Typography>
              <Typography className={classes.fullTweetViewText} gutterBottom>
                {text}
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
                <MenuItem onClick={handleClose}>
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
