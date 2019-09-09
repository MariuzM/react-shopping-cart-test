import React from 'react';
import ProductList from '../Context/ProductList';
import Cart from '../Context/Cart/Cart';

import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Zoom, Box } from '@material-ui/core';
import RoundButton from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { ProductContext } from '../Context/context';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100vw'
  },
  item: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  empty: {
    display: 'none'
  },
  margin: {
    margin: theme.spacing(6)
  }
}));

export default function Floater() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { clearCart } = React.useContext(ProductContext);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  // const theme2 = createMuiTheme({
  //   palette: {
  //     primary: green
  //   }
  // });

  const roundButtons = [
    {
      color: 'primary',
      className: classes.item,
      // className: classes.empty,
      icon: <NavigationIcon />,
      label: 'Next'
    },
    {
      color: 'secondary',
      className: classes.item,
      icon: <DeleteIcon onClick={clearCart} />,
      label: 'Delete'
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Store" {...a11yProps(0)} />
          <Tab label="My Cart" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProductList />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Cart />
        </TabPanel>
      </SwipeableViews>

      {roundButtons.map((item, index) => (
        <Zoom
          key={item.color}
          in={index === value}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`
            // display: `${value === 1 ? true : 'none'}`
          }}
          unmountOnExit
        >
          <RoundButton
            aria-label={item.label}
            className={item.className}
            color={item.color}
          >
            {item.icon}
          </RoundButton>
        </Zoom>
      ))}
    </div>
  );
}
