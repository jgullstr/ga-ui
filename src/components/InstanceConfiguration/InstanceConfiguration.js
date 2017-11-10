/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

const CardExampleExpandable = () => (
  <Card>
    <CardHeader
      title="Without Avatar"
      subtitle="Subtitle"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
    <CardText expandable={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
  </Card>
);

class LocalConfigForm extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Overview" />
            <Tab label="General" />
            <Tab label="Parent selection" />
            <Tab label="Recombination" />
            <Tab label="Mutation"/>
            <Tab label="Survivor selection"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Overview</TabContainer>}
        {value === 1 && <TabContainer>General</TabContainer>}
        {value === 2 && <TabContainer>Parent selection</TabContainer>}
        {value === 3 && <TabContainer>Recombination</TabContainer>}
        {value === 4 && <TabContainer>Mutation</TabContainer>}
        {value === 5 && <TabContainer>Survivor selection</TabContainer>}
      </div>
    );
  }
}

LocalConfigForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const config = (props) => {
  return (
    <h1>Cionfiuginhg</h1>
  );
}


export default config;