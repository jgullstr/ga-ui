import { registerAction } from './actionLibrary';
import {arrayMove} from 'react-sortable-hoc';

const reducer = (configurations = [], action) => {
    const {oldIndex, newIndex} = action.payload;
    return oldIndex === newIndex ? configurations : arrayMove(configurations, oldIndex, newIndex);
};

export default registerAction('ORDER_INSTANCE_FUNCTIONS', reducer, ['instanceConfigurations']);