import codecs from './codecs';
import evaluators from './evaluators';
import initializers from './initializers';
import mutators from './mutators';
import populations from './populations';
import recombiners from './recombiners';
import parentSelectors from './parentSelectors';
import survivorSelectors from './survivorSelectors';

const identity = {
    name: "Identity function",
    description: "Returns unaltered value(s).",
    params: [],
    fn: x => x
}

const genetic = {
    codecs: codecs,
    populations: populations,
    initializers: initializers,
    parentSelectors: {...parentSelectors, IDENTITY: identity},
    recombiners: {...recombiners, IDENTITY: identity},
    mutators: {...mutators, IDENTITY: identity},
    survivorSelectors: {...survivorSelectors, IDENTITY: identity},
    evaluators: evaluators,
};

export default genetic;