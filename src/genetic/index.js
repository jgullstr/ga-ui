import codecs from './codec';
import {evolve} from './evolve';
import evaluators from './evaluators';
import initializers from './initializers';
import mutators from './mutation';
import populations from './population';
import recombinators from './recombination'
import parentSelectors from './parentselection'
import survivorSelectors from './survivorselection'

const identity = {
    name: "Identity function",
    description: "Returns unaltered value(s).",
    params: [],
    fn: x => x
}

const genetic = {
    codecs: codecs,
    populations: populations,
    parentSelectors: [...parentSelectors, identity],
    recombinators: [...recombinators, identity],
    mutators: [...mutators, identity],
    survivorSelectors: [...survivorSelectors, identity],
    evaluators: evaluators,
    initializers: initializers,
    generator: evolve,
};

export default genetic;