function declOfNum(num: number, forms: string[]) {
    const numberAbs = Math.abs(num) % 100;
    const currentNum = numberAbs % 10;

    if (numberAbs > 10 && numberAbs < 20) { return forms[2]; }
    if (currentNum > 1 && currentNum < 5) { return forms[1]; }
    if (currentNum == 1) { return forms[0]; }

    return forms[2];
}

export default declOfNum;