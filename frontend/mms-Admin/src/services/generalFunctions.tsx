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
