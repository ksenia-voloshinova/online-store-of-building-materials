function getDate(date: Date) {
    function addZero(value: number) {
        return `0${value}`.slice(-2);
    }

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export default getDate;
