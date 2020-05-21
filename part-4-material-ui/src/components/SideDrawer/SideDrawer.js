import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import StoreIcon from "@material-ui/icons/Store";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ReplayIcon from "@material-ui/icons/Replay";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

const toggleDrawer = (side, open) => event => {
  if (
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }
  setState({ ...state, [side]: open });
};

function handleListItemClick(role) {
  window.location.href = `/?role=${role}`;
}

async function resetDemo() {
  console.log("reset the demo");

  //await reset();
}

async function createAnOrder() {
  console.log("creat an order");

  //await createOrder();
}

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

const classes = useStyles();

const sideList = side => (
  <div
    className={classes.list}
    role="presentation"
    onClick={toggleDrawer(side, false)}
    onKeyDown={toggleDrawer(side, false)}
  >
    <List>
      <ListItem
        button
        key={"host"}
        onClick={event => handleListItemClick("host")}
      >
        <ListItemIcon>
          <PermContactCalendarIcon />
        </ListItemIcon>
        <ListItemText primary={"Host"} />
      </ListItem>
      <ListItem
        button
        key={"manufacturer"}
        onClick={event => handleListItemClick("manufacturer")}
      >
        <ListItemIcon>
          <LocalDrinkIcon />
        </ListItemIcon>
        <ListItemText primary={"Manufacturer"} />
      </ListItem>
      <ListItem
        button
        key={"shipping"}
        onClick={event => handleListItemClick("shipping")}
      >
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary={"Shipping"} />
      </ListItem>
      <ListItem
        button
        key={"retailer"}
        onClick={event => handleListItemClick("retailer")}
      >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary={"Retailer"} />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button key={"Order"} onClick={event => createAnOrder()}>
        <ListItemIcon>
          <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary={"Create an order"} />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button key={"Reset"} onClick={event => resetDemo()}>
        <ListItemIcon>
          <ReplayIcon />
        </ListItemIcon>
        <ListItemText primary={"Reset"} />
      </ListItem>
    </List>
  </div>
);

const Drawer = () => {
  return (
    <div>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
};
export default Drawer;
