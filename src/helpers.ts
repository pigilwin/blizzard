export class Helpers {

    /**
     * Create a random number
     * @param {number} min 
     * @param {number} max 
     * @param {boolean} round
     * @returns {number}
     */
    public static random(min: number, max: number, round: boolean): number {
        const generatedNumber: number = Math.random() * (max - min + 1) + 1;
        if (round) {
            return Math.floor(generatedNumber);
        }
        return generatedNumber; 
    }
}