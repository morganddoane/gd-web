export const sleep = async (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const capFirst = (s: string): string => {
    return s.toLowerCase().charAt(0).toUpperCase() + s.toLowerCase().slice(1);
};

export const findLowerCase = (
    searches: (string | undefined)[],
    searchTerm: string
): boolean => {
    return searches
        .map((w) => (w ? w.toLowerCase() : ''))
        .join('')
        .includes(searchTerm.toLowerCase());
};
