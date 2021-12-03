export const random = (min: number, max: number, round: boolean): number => {
    const generatedNumber: number = Math.random() * (max - min + 1) + min;
    if (round) {
        return Math.floor(generatedNumber);
    }
    return generatedNumber; 
};