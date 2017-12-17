import codecs from './codecs';
import evaluators from './evaluators';
import initializers from './initializers';
import mutators from './mutators';
import populations from './populations';
import recombiners from './recombiners';
import parentSelectors from './parentSelectors';
import survivorSelectors from './survivorSelectors';
import functions from './functions';

const getOptions = (obj) => {
    const newObj = {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key].name;
        }
    }
    return newObj;
}

const getParams = (obj) => {
    const newObj = {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key].hasOwnProperty('params') ? obj[key].params : [];
        }
    }
    return newObj;
}

const genetic = {
    codecs: codecs,
    populations: populations,
    initializers: initializers,
    parentSelectors: parentSelectors,
    recombiners: recombiners,
    mutators: mutators,
    survivorSelectors: survivorSelectors,
    evaluators: evaluators,
    functions: functions,
};

export const geneticOptions = {
    initializers: getOptions(initializers),
    parentSelectors: getOptions(parentSelectors),
    recombiners: getOptions(recombiners),
    mutators: getOptions(mutators),
    survivorSelectors: getOptions(survivorSelectors),
    evaluators: getOptions(evaluators),
    functions: getOptions(functions),
}

export const geneticParams = {
    initializers: getParams(initializers),
    parentSelectors: getParams(parentSelectors),
    recombiners: getParams(recombiners),
    mutators: getParams(mutators),
    survivorSelectors: getParams(survivorSelectors),
    evaluators: getParams(evaluators),
    functions: getParams(functions),
}

export default genetic;