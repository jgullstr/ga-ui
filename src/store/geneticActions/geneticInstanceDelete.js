
const geneticInstanceDelete = (index) => {
    return {
        type: "GENETIC_INSTANCE_DELETE",
        payload: index
    }
}

export default geneticInstanceDelete;