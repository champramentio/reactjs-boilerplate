import dayjs from "dayjs";
dayjs().format();

export function removeDuplicateBasedOnValueInArray(arr, key) {
	if (!key) return { error: "Please specify key name of this object" };

	return arr.reduce((acc, current) => {
		const x = acc.find(item => item[key] === current[key]);
		if (!x) {
			return acc.concat([current]);
		} else {
			return acc;
		}
	}, []);
}

export function firstLetterUppercase(name) {
	return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "";
}

export function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function getRandomString(length = 20) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function titleCase(str) {
	return str.split(" ").map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" ");
}

export function createArrayOfNumbers(n) {
	return [...Array(n)].map((_, i) => i + 1); //contoh n = 10 maka hasilnya [1,2,3,4,...,10]
}

export function checkObjectLength(obj) {
	//{} => return 0
	//{test:'a', demo: 'b'} => return 2
	return Object.entries(obj).length;
}

export function formatAmount(amount, currency = true) {
	if (currency) {
		const formatter = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR"
		});
		if (amount === null) return "-";
		return formatter.format(amount).replace(/.00$/, "").replace(/,/g, ".");
	} else {
		return amount ? amount.toLocaleString("id-ID") : amount;
	}
}

export function formatDatetime(datetime) {
	return datetime ? dayjs(datetime).format("YYYY-MM-DD HH:mm:ss") : "-";
}

export function formatDate(datetime) {
	return datetime ? dayjs(datetime).format("YYYY-MM-DD") : "-";
}

export function currentDate(days) {
	return days ? dayjs().add(days, "day").format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
}

export function addAndFormatDate(arg1, arg2) {
	return dayjs().add(arg1, arg2).format("YYYY-MM-DD");
}

export function addAndFormatDatetime(arg1, arg2) {
	return dayjs().add(arg1, arg2).format("YYYY-MM-DD HH:mm:ss");
}

export function displayStatus(status_name) {
	if (["rejected", "canceled", "void", "unverified", "inactive", "expired", "failed"].includes(status_name)) return `<span class="tag is-danger">${status_name}</span>`;
	else if (["approved", "completed", "active", "verified", "valid", "issued"].includes(status_name)) return `<span class="tag is-success">${status_name}</span>`;
	else if (["needaction"].includes(status_name)) return `<span class="tag" style="color:white;background-color:orange;padding:6px">${status_name}</span>`;
	else return `<span class="tag">${status_name}</span>`;
}

export function tableNumbering(index, current_page) {
	return (current_page - 1) * 15 + parseInt(index) + 1;
}
