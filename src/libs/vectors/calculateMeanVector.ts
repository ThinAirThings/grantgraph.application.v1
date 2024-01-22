


export const calculateMeanVector = (vectors: number[][]) => {
    const sumVector = vectors.reduce((acc, vector) => 
        acc.map((sum, idx) => sum + vector[idx]), 
        new Array(vectors[0].length).fill(0)
    )
    return sumVector.map(sum => sum / vectors.length)
}