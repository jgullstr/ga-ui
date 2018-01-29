import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import InstanceConfiguration from '../InstanceConfiguration/InstanceConfiguration';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import updateInstance from '../../store/actions/updateInstance';
import geneticInstanceToggleLock from '../../store/geneticActions/geneticInstanceToggleLock';
import geneticInstanceDelete from '../../store/geneticActions/geneticInstanceDelete';
import geneticInstanceAdd from '../../store/geneticActions/geneticInstanceAdd';

// Default new configuration.
const defaultConfig = () => ({
    parentSelectors: [],
    recombiners: [],
    mutators: [],
    survivorSelectors: [],
    locked: false,
    expanded: true,
});

const InstancesConfiguration = (props) => {
    // Clone instance.
    const cloneInstance = (config) => props.geneticInstanceAdd(
        JSON.parse(JSON.stringify({
            ...config,
            locked: false
        }))
    );

    const LockButton = (index, locked) => <IconButton
        style={{width: 40, height: 40, padding: 0}}
        tooltip={locked ? "Unlock" : "Lock"}
        iconClassName="material-icons"
        onClick={(e) => { e.stopPropagation(); props.geneticInstanceToggleLock(index, !locked) }}
    >{locked ? "lock" : "lock_open"}</IconButton>

    return (
        <div className="container">
        {props.instanceConfigurations.map((config, index) => {
            return (
                <div key={index} style={{marginBottom: 20}}>
                    <Card initiallyExpanded={true}>
                        <CardHeader
                            title={`Instance #${index}`}
                            subtitle={config.locked ? "Locked" : "Lock instance to compute."}
                            actAsExpander={true}
                            showExpandableButton={true}
                            avatar={LockButton(index, config.locked)}
                        />
                        <Divider/>
                        <CardText style={{padding: 0}} expandable={true}>
                            <InstanceConfiguration index={index} disabled={config.locked}/>
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
                                    onClick={(event) => props.geneticInstanceDelete(index)}
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
            onClick={() => props.geneticInstanceAdd(defaultConfig())}
        >add_circle</IconButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    instanceConfigurations: state.instanceConfigurations,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateInstance: updateInstance,
        geneticInstanceAdd: geneticInstanceAdd,
        geneticInstanceDelete: geneticInstanceDelete,
        geneticInstanceToggleLock: geneticInstanceToggleLock
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesConfiguration);