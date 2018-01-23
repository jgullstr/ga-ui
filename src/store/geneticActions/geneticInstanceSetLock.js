
const geneticInstanceSetLock = (index, locked) => {
    return {
        type: "GENETIC_INSTANCE_TOGGLE_LOCK",
        payload: {
            index: index,
            locked: locked
        }
    }
}

export default geneticInstanceSetLock;