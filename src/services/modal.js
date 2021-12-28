import Swal from "sweetalert2";
import { titleCase } from "./utils";

export function toast(type, title) {
	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 3000
	});

	Toast.fire({
		icon: type,
		title: title
	});
}

export function modal(type, title, message) {
	Swal.fire({
		icon: type,
		title: titleCase(title),
		text: message,
		confirmButtonText: "Ok"
	});
}

export async function dialogue(type, title, message) {
	return await Swal.fire({
		title: title,
		html: message,
		icon: type,
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Proses"
	});
}

export async function dialogueWithCheckbox(title, message, placeholder) {
	return await Swal.fire({
		title: title,
		html: message,
		input: "checkbox",
		inputValue: 0,
		inputPlaceholder: placeholder,
		inputValidator: result => {
			return !result && "Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan";
		},
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Proses"
	});
}

export async function dialogueCloseOnly(type, title, message) {
	return await Swal.fire({
		title: title,
		html: message,
		icon: type,
		showCancelButton: false,
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Close"
	});
}

export async function swalInput(type, title, input) {
	return await Swal.fire({
		title: title,
		input: "textarea",
		icon: type,
		inputPlaceholder: "Type your message here...",
		inputAttributes: {
			autocapitalize: "off",
			"aria-label": "Type your message here"
		},
		showCancelButton: true,
		showCloseButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Proses"
	});
}
