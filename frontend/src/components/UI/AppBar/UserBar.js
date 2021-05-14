import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {Grid, Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {logoutRequest} from "../../../store/sagas/usersSaga";

const useStyle = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    color: 'white',
    fontWeight:'bold'
  },
  avatar: {
    width: 30,
    height: 30,
    border: '1px solid white',
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
});

const UserBar = ({displayName, avatar}) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userId = useSelector(state => state?.users?.user._id);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logoutRequest(userId));
    history.push('/');
  };

  const image = {avatar}.avatar ? {avatar}.avatar : 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';

  return (
    <Grid item className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.header}
      >
        Hello, {displayName}
      </Button>
      <Grid item className={classes.avatar} style={{backgroundImage: "url('" + image + "')"}}/>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logOutHandler}> Log Out </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserBar;