import getDate from "@/utils/getDate";

function getMinDate(days: number) {
    const today = new Date();

    today.setDate(today.getDate() + days);

    return {
        date: getDate(today),
        dateString: today,
    };
}

export default getMinDate;
