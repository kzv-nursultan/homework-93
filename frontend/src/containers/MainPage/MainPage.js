import React, {useEffect} from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../store/sagas/eventsSaga";
import EventItem from "../../components/EventItem/EventItem";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    margin: '25px auto',
    justifyContent: "space-evenly",
  },
  events: {
    border: '1px solid black',
    width: '60%',
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "Bold",
    backgroundColor: 'white',
    margin: '-16px 5px 0px 5px',
    height: 20
  },
  tools: {
    border: '1px solid black',
    width: '39%'
  }
})

const MainPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);

  useEffect(()=>{
    dispatch(getRequest( ));
  }, [dispatch]);

  let eventList = (
    <Typography component='h2'>
      You don't have any events
    </Typography>
  );

  if (events.length > 0) {
    eventList = (
      events.map(object =>(
        <EventItem
        key = {object._id}
        name={object.eventName}
        date={object.date}
        duration={object.duration}
        id={object._id}
        author={object.author}
        />
      ))
    );
  }

  return (
   <Grid container className={classes.root}>

     <Grid container item className={classes.events}>
       <Typography variant='h5' className={classes.title}>
         Events List
       </Typography>
       {eventList}
     </Grid>

     <Grid container item className={classes.tools}>
       <CreateEvent/>
     </Grid>

   </Grid>
  );
};

export default MainPage;