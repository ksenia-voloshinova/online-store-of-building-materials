function getArrayFromNumber(num: number) {
    return Array.from({ length: num }, (_, i) => i + 1);
}

export default getArrayFromNumber;