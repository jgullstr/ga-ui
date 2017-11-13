import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import InstanceConfiguration from '../InstanceConfiguration/InstanceConfiguration';

const InstancesConfiguration = (props) => {
    return (
        <Card>
            <CardHeader
                title="New instance"
                subtitle="Set up instances of evolutionary algorithms operating according to global configuration settings."
            />
            <Divider/>
            <CardText style={{padding: 0}}>
                <InstanceConfiguration options={props.options} params={props.params}/>
            </CardText>
            <Divider/>
            <CardActions>
            <IconButton
                tooltip="Add instance"
                iconClassName="material-icons"
                onClick={() => console.log('click')}
            >add</IconButton>
            </CardActions>
        </Card>
    );
}
export default InstancesConfiguration;