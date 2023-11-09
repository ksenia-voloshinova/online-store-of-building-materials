class DateService {
	today = new Date();
	day = this.today.getDate();
	month = this.today.getMonth() + 1;
	year = this.today.getFullYear();

	addZero(number) {
	    return `0${number}`.slice(-2);
	}

	getDateString() {
	    return `${this.addZero(this.day)}.${this.addZero(this.month)}.${this.year}`;
	}
}

export default new DateService();
