import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
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
    parentSelectors: [],
    recombiners: [],
    mutators: [],
    survivorSelectors: [],
    locked: false,
    rebuild: false,
    expanded: true,
});

const lockInstance = (e, index) => {
    e.stopPropagation();
    console.log('locked ' + index);
}

const LockButton = (index, locked) => <IconButton
    style={{width: 40, height: 40, padding: 0}}
    tooltip={locked ? "Unlock" : "Lock"}
    iconClassName="material-icons"
    onClick={(e) => lockInstance(e, index) }
>{locked ? "lock" : "lock_open"}</IconButton>

const InstancesConfiguration = (props) => {
    // Clone instance.
    const cloneInstance = (config) => props.addInstance(
        JSON.parse(JSON.stringify({
            ...config,
            locked: false
        }))
    );

    // Todo: Delete instance.
    const deleteInstance = (index) => {
        console.log('deleted ' + index);
    }



    return (
        <div className="container">
        {props.instanceConfigurations.map((config, index) => {
            return (
                <div key={index} style={{marginBottom: 20}}>
                    <Card initiallyExpanded={true}>
                        <CardHeader
                            title={`Instance #${index}`}
                            subtitle={config.locked ? "lock" : "Lock instance to compute."}
                            actAsExpander={true}
                            showExpandableButton={true}
                            avatar={LockButton(index, config.locked)}
                        />
                        <Divider/>
                        <CardText style={{padding: 0}} expandable={true}>
                            <InstanceConfiguration index={index}/>
                            <Divider/>
                            <CardActions>
                                <IconButton
                                    tooltip="Clone"
                                    iconClassName="material-icons"
                                    onClick={() => cloneInstance(config)}
                                >filter_none</IconButton>
                                <IconButton
                                    tooltip="Delete"
                                    iconClassName="material-icons"
                                    onClick={(event) => deleteInstance(index)}
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