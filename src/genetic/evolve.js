/**
 * Evolve population one generation.
 * Earlier stages of evolution can be accessed from function contexts.
 * @returns {Population} evolved generation.
 */
export const evolve = (selectParents) => (recombiners) => (mutate) => (selectSurvivors) => (population) => {
    // Time execution.
    const initTime = performance.now();

    // Pass contextual data to each function for more complex use-cases.
    let context = {
      population: population
    }

    // Create mating pool.
    const matingPool = selectParents.call(context, population);
    context.matingPool = matingPool;

    context.parents = [];
  
    // Recombine by calling recombine with chunks of parents corresponding to
    // amount of arguments in the recombine function.
    const childValues = recombiners.reduce((result, recombine) => matingPool.chunk(recombine.length).reduce((values, chunk) => {
      if (chunk.length !== recombine.length) {
        // If last chunk does not contain enough values,
        // skip recombination and add parents to preserve population size.
        return [...values, ...chunk];  
      }
      const parents = chunk.slice();
      for (let i = 0; i < recombine.length; i++) {
        context.parents.push(parents);
      }
      const recombined = recombine.apply(context, chunk);
      return chunk.length === 1 ? [...values, recombined] : [...values, ...recombined];
    }, []), []);
    const children = matingPool.fromArray(childValues);
    context.children = children;

    // Mutate each child value into new population.
    const mutants = children.map((child, index) => {
      context.childIndex = index;
      return mutate.call(context, child)
    });
    context.mutants = mutants;
    delete(context.childIndex);
    
    // Select survivors and return evolved population.
    const result = selectSurvivors.call(context, mutants);

    // Execution time is saved as a property on the evolved population.
    const executionTime = performance.now() - initTime;
    result.executionTime = executionTime;
    
    return result;
}

export default evolve;