import { colors, makeStyles, Theme } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

export const useHomeStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100vh',
  },
  logo: {
    margin: '10px 0',
  },
  logoIcon: {
    fontSize: 36,
  },
  sideMenuList: {
    position: 'sticky',
    top: 0,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: 230,
  },
  sideMenuListItem: {
    cursor: 'pointer',
    '&:hover': {
      '& div': {
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
        '& h6': {
          color: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
    },

    '& div': {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      padding: '0 25px 0 20px',
      borderRadius: 30,
      height: 50,
      marginBottom: 15,
      transition: 'background-color 0.1s ease-in-out',
    },
  },
  sideMenuListItemLabel: {
    fontWeight: 700,
    fontSize: 20,
    marginLeft: 15,
  },
  sideMenuListItemIcon: {
    fontSize: 32,
    marginLeft: -5,
  },
  sideMenuTweetButton: {
    padding: theme.spacing(3.2),
    marginTop: theme.spacing(2),
  },
  tweetsWrapper: {
    borderRadius: 0,
    height: '100%',
    borderTop: '0',
    borderBottom: '0',
  },
  tweetsCentred: {
    marginTop: 50,
    textAlign: 'center',
  },
  tweetsHeader: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '0',
    borderLeft: '0',
    borderRight: '0',
    borderRadius: 0,
    padding: '10px 15px',
    '& h6': {
      fontWeight: 800,
    },
  },
  tweetsHeaderBackButton: {
    marginRight: 30
  },
  tweet: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    paddingTop: 15,
    paddingLeft: 20,
    '&:hover': {
      backgroundColor: 'rgb(245, 248, 250)',
    },
  },
  tweetAvatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
  },
  tweetWrapper: {
    color: 'inherit',
    textDecoration: 'none'
  },
  tweetFooter: {
    display: 'flex',
    position: 'relative',
    left: -13,
    justifyContent: 'space-between',
    maxWidth: 450,
  },
  fullTweetViewHeader: {
    display: 'flex',
    flexDirection: 'column',
  },
  fullTweetViewText: {
    marginTop: 20,
    fontSize: 22,
    wordBreak: 'break-word',
  },
  tweetUserName: {
    color: grey[500],
  },
  rightSide: {
    paddingTop: 20,
    position: 'sticky',
    top: 0,
  },
  rightSideBlock: {
    backgroundColor: '#F5F8FA',
    borderRadius: 15,
    marginTop: 20,
    '& .MuiList-root': {
      paddingTop: 0,
    },
  },
  rightSideBlockHeader: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    backgroundColor: 'transparent',
    padding: '13px 18px',
    '& b': {
      fontSize: 20,
      fontWeight: 800,
    },
  },
  rightSideBlockItem: {
    cursor: 'pointer',
    '& .MuiTypography-body1': {
      fontWeight: 700,
    },
    '& .MuiListItemAvatar-root': {
      minWidth: 50,
    },
    '& .MuiListItemText-root': {
      margin: 0,
    },
    '&:hover': {
      backgroundColor: '#edf3f6',
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  addForm: {
    padding: 20,
  },
  addFormBody: {
    display: 'flex',
    width: '100%',
  },
  addFormBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addFormBottomActions: {
    marginTop: 10,
    paddingLeft: 70,
  },
  addFormTextarea: {
    width: '100%',
    border: 0,
    fontSize: 20,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none',
  },
  addFormBottomLine: {
    height: 12,
    backgroundColor: '#E6ECF0',
  },
  addFormCircleProgress: {
    position: 'relative',
    width: 20,
    height: 20,
    margin: '0 10px',
    '& .MuiCircularProgress-root': {
      position: 'absolute',
    },
  },
  addFormBottomRight: {
    display: 'flex',
    alignItems: 'center',
  },

  imageList: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },

  imageListItem: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 6,
    marginRight: 10,
    '& img': {
      width: '100%',
      height: '100%',
    },

    '& svg path': {
      fill: 'white',
    }
  },

  removeIcon: {
    marginTop: -60,
    marginLeft: 50,
    background: 'black',
    borderRadius: 5,
    height: 14,
    width: 14
  },


  sideProfile: {
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    bottom: 30,
    padding: '10px 15px',
    width: 260,
    borderRadius: 50,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.lightBlue[50],
    },
  },
  sideProfileInfo: {
    flex: 1,
    marginLeft: 10,
    '& b': {
      fontSize: 16,
    },
  },

  profileMenu: {
    top: 'auto !important',
    left: '17.5% !important',
    // left: '160px!important',
    width: '250px !important',
    bottom: '110px !important',
    'box-shadow': '1px 1px 10px rgba(0, 0, 0, 0.08)',
    'border-radius': '20px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '& a': {
      color: 'black',
      textDecoration: 'none',
    },
  },

}));
