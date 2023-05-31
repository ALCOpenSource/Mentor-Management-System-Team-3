function capitalizeEachWord(mySentence: string | undefined | null): string | null {
    try {
        if (mySentence === undefined || mySentence == null)
            return null;

        const words = mySentence?.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");
    } catch { return mySentence ?? null; }
}

export { capitalizeEachWord };

export function randomizeArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

export function arraysEqual<T>(a1: T[], a2: T[]) {
    if (!a1 && !a2)
        return null;
    if (!a1 || !a2)
        return false;
    if (a1.length===0 || a2.length===0)
        return true;

    return a1 === a2 || (
        a1 !== null && a2 !== null &&
        a1.length === a2.length &&
        a1
            .map(function (val, idx) { return val === a2[idx]; })
            .reduce(function (prev, cur) { return prev && cur; }, true)
    );
}