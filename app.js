const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
	localStorage.setItem("taxRate", taxRate);
	localStorage.setItem("shippingPrice", shippingPrice);
	localStorage.setItem("shippingFreePrice", shippingFreePrice);

	sessionStorage.setItem("taxRate", taxRate);
	sessionStorage.setItem("shippingPrice", shippingPrice);
	sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (event) => {
	if (event.target.className == "fa-solid fa-minus") {
		if (event.target.nextElementSibling.innerText > 1) {
			event.target.nextElementSibling.innerText--;
			calculateProductPrice(event.target);
			calculateCartPrice();
		} else {
			if (confirm("Product will be removed?")) {
				event.target.parentElement.parentElement.parentElement.remove();
				calculateCartPrice();
			}
		}
	} else if (event.target.classList.contains("fa-plus")) {
		event.target.previousElementSibling.innerText++;
		calculateProductPrice(event.target);
		calculateCartPrice();
	} else if (event.target.className == "remove-product") {
		event.target.parentElement.parentElement.parentElement.remove();
		calculateCartPrice();
	} else {
	}
});

const calculateProductPrice = (clickedBtn) => {
	const productInfoDiv = clickedBtn.parentElement.parentElement;
	const price = productInfoDiv.querySelector(
		".product-price strong"
	).innerText;
	const quantity = productInfoDiv.querySelector(".quantity").innerText;
	const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
	productTotalDiv.innerText = (price * quantity).toFixed(2) + "€";
};

const calculateCartPrice = () => {
	const productsTotalPricesDivs = document.querySelectorAll(
		".product-line-price"
	);
	let subtotal = 0;
	productsTotalPricesDivs.forEach((div) => {
		subtotal += parseFloat(div.innerText);
	});
	const taxPrice = subtotal * localStorage.getItem("taxRate");
	const shippingPrice = parseFloat(
		subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
			? localStorage.getItem("shippingPrice")
			: 0
	);

	document.querySelector("#cart-subtotal").lastElementChild.innerText =
		subtotal.toFixed(2) + "€";
	document.querySelector("#cart-tax p:nth-child(2)").innerText =
		taxPrice.toFixed(2) + "€";
	document.querySelector("#cart-shipping").children[1].innerText =
		shippingPrice.toFixed(2) + "€";
	document.querySelector("#cart-total ").lastElementChild.innerText =
		(subtotal + taxPrice + shippingPrice).toFixed(2) + "€";
};
