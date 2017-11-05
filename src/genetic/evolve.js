/**
 * Evolve population one generation.
 * Earlier stages of evolution can be accessed from function contexts.
 * @returns {Population} evolved generation.
 */
export const evolve = (selectParents) => (recombine) => (mutate) => (selectSurvivors) => (population) => {
    // Pass contextual data to each function for more complex use-cases.
    let context = {
      population: population
    }

    // Create mating pool.
    const parents = selectParents.call(context, population);
    context.parents = parents;
  
    // Recombine by calling recombine with chunks of parents corresponding to
    // amount of arguments in the recombine function.
    const childValues = parents.chunk(recombine.length).reduce((values, chunk) => {
      if (chunk.length !== recombine.length) {
        // If last chunk does not contain enough values,
        // skip recombination and add parents to preserve population size.
        return [...values, ...chunk];  
      }
      return [...values, ...recombine.apply(context, chunk)];
    }, []);
    const children = parents.fromArray(childValues);
    context.children = children;

    // Mutate each child value into new population.
    const mutants = children.map((child) => mutate.call(context, child));
    context.mutants = mutants;

    // Select survivors and return evolved population.
    return selectSurvivors.call(context, mutants);
}
