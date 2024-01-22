// Create Cosine Similarity Function
export const cosineSimilarity = (a: number[], b: number[]) => {
    const dotProduct = a.reduce((acc, value, index) => acc + value * b[index], 0)
    const magnitudeA = Math.sqrt(a.reduce((acc, value) => acc + value * value, 0))
    const magnitudeB = Math.sqrt(b.reduce((acc, value) => acc + value * value, 0))
    return dotProduct / (magnitudeA * magnitudeB)
}