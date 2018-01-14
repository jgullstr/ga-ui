import React from 'react';
//import ConfigField from './ConfigField';

import genetic from '../../genetic';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import IconButton from 'material-ui/IconButton';
import ConfigField from './ConfigField';

const ConfigForm = (props) => {
    if(!genetic.hasOwnProperty(props.type)) {
        throw new RangeError('Undefined function type: ' + props.type);
    }
    if (!genetic[props.type].hasOwnProperty(props.value.fn)) {
        throw new RangeError('Undefined function: ' + props.value.fn);
    }
    const fn = genetic[props.type][props.value.fn];
    const params = props.value.params;
    const hasParams = fn.params.length > 0;

    const DeleteButton = <IconButton
        tooltip="Delete"
        iconClassName="material-icons"
        onClick={() => console.log('delete')}
    >delete_forever</IconButton>;

    const functionForm = fn.params.map((field, key) => <ConfigField key={key} {...field} value={params[key]} path={[...props.path, 'params', key]}/>);
    return (
        <Card style={{margin: 10}} initiallyExpanded={hasParams}>
            <CardHeader
                title={fn.name}
                subtitle={fn.description}
                actAsExpander={hasParams}
                showExpandableButton={hasParams}
                avatar={DeleteButton}
            />
            <CardText expandable={true}>
                {functionForm}
            </CardText>
        </Card>
    );
}

export default ConfigForm;