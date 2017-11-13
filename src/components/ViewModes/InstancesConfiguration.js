import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import InstanceConfiguration from '../InstanceConfiguration/InstanceConfiguration';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import addInstance from '../../store/actions/addInstance';
import updateInstance from '../../store/actions/updateInstance';
import deleteInstance from '../../store/actions/deleteInstance';

// Default new configuration.
const defaultConfig = () => ({
    parentSelectors: [
        {name: 'IDENTITY', params: []},
    ],
    recombiners: [
        {name: 'IDENTITY', params: []},
    ],
    mutators: [
        {name: 'IDENTITY', params: []},
    ],
    survivorSelectors: [
        {name: 'IDENTITY', params: []},
    ],
    locked: false,
    rebuild: false,
    expanded: true,
});

const InstancesConfiguration = (props) => {
    return (
        <div className="container">
        {props.instanceConfigurations.map((config, key) => {
            return (
                <div key={key} style={{marginBottom: 20}}>
            <Card initiallyExpanded={true}>
                <CardHeader
                    title={`Instance #${key}`}
                    actAsExpander={true}
                    showExpandableButton={true}
                    //subtitle="Set up instances of evolutionary algorithms operating according to global configuration settings."
                />
                <Divider/>
                <CardText style={{padding: 0}} expandable={true}>
                    <InstanceConfiguration config={config} options={props.options} params={props.params}/>
                    <Divider/>
                    <CardActions>
                        <IconButton
                            tooltip="Lock"
                            iconClassName="material-icons"
                            onClick={() => console.log('click')}
                        >lock</IconButton>
                        <IconButton
                            tooltip="Clone"
                            iconClassName="material-icons"
                            onClick={() => console.log('click')}
                        >filter_none</IconButton>
                        <IconButton
                            tooltip="Delete"
                            iconClassName="material-icons"
                            onClick={() => console.log('click')}
                        >delete_forever</IconButton>
                    </CardActions>
                </CardText>
            </Card>
            </div>
            );
        })}
        <IconButton
            tooltip="Add new instance"
            iconClassName="material-icons"
            onClick={() => props.addInstance(defaultConfig())}
        >add_circle</IconButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    instanceConfigurations: state.instanceConfigurations,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addInstance: addInstance,
        updateInstance: updateInstance,
        deleteInstance: deleteInstance
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesConfiguration);