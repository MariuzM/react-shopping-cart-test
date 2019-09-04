import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import RoundButton from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';

import NavigationIcon from '@material-ui/icons/Navigation';
import DeleteIcon from '@material-ui/icons/Delete';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import { ProductConsumer } from '../Context/context';

// import UpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { green } from '@material-ui/core/colors';

import ProductList from '../Context/ProductList';
import Cart from '../Context/Cart/Cart';

// import { ProductConsumer } from '../Context/context';

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

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };

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
  // fabGreen: {
  //   color: theme.palette.common.white,
  //   backgroundColor: green[500],
  //   '&:hover': {
  //     backgroundColor: green[600]
  //   }
  // }
}));

export default function Floater() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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

  const theme2 = createMuiTheme({
    palette: {
      primary: green
    }
  });

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
      icon: <DeleteIcon />,
      label: 'Delete'
    }
  ];

  return (
    // <ProductConsumer>
    //   {value => {
    //     const { cart } = value;
    //     if (cart.length > 0) {
    //       return console.log(cart.length);
    //     } else {
    //       // return console.log('test');
    //     }
    //   }}
    // </ProductConsumer>

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
