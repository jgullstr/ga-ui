import React from 'react';
//import ConfigField from './ConfigField';

import genetic from '../../genetic';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import ConfigField from './ConfigField';

const ConfigForm = (props) => {
    if(!genetic.hasOwnProperty(props.type)) {
        throw new RangeError('Undefined function type: ' + props.type);
    }
    if (!genetic[props.type].hasOwnProperty(props.value)) {
        throw new RangeError('Undefined function: ' + props.value);
    }
    const fn = genetic[props.type][props.value];
    const hasParams = fn.params.length > 0;
    console.log(fn);
    console.log(props);

    const DeleteButton = <IconButton
        tooltip="Delete"
        iconClassName="material-icons"
        onClick={() => console.log('delete')}
    >delete_forever</IconButton>;

    return (
        <Card initiallyExpanded={hasParams}>
            <CardHeader
                title={fn.name}
                subtitle={fn.description}
                actAsExpander={hasParams}
                showExpandableButton={hasParams}
                children= {DeleteButton}
            />
            <CardText style={{padding: 0}} expandable={true}>
                {fn.params.map((field, key) => <ConfigField {...field}/>)}
            </CardText>
        </Card>
    );
}

export default ConfigForm;