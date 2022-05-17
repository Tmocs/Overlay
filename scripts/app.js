const http = {
	get: function (url, callback, error) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onload = function (e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					callback(JSON.parse(xhr.responseText));
				} else {
					error(xhr.statusText);
				}
			}
		};
		xhr.onerror = function (e) {
			error(xhr.statusText);
		};
		xhr.send(null);

	}
}


function generateTable(data) {
	document.getElementById('weed_table').innerHTML = '';

	let typeProductParent = document.createElement('div');

	for (let i in data) {
		let typeProduct = data[i];

		let typeProductLabel = document.createElement('div');
		typeProductLabel.style.fontWeight = '600';
		let typeProductItems = document.createElement('div');
		typeProductLabel.innerHTML = i;


		typeProductParent.appendChild(typeProductLabel);


		let ran = false;


		for (let e = 0; e < typeProduct.length; e++) {
			let item = typeProduct[e];

			let itemDiv = document.createElement('div');
			itemDiv.style.display = 'flex';


			let typeProductHeader = document.createElement('div');
			typeProductHeader.style.display = 'flex';

			if(!ran) {
				for (let l in item) {
					let itemLabel = document.createElement('div');
					itemLabel.style.width = '300px';

					itemLabel.innerHTML = l;


					typeProductHeader.appendChild(itemLabel)

					if(l === 'price'){
						let itemLabel = document.createElement('div');
						itemLabel.style.width = '300px';
						itemLabel.innerHTML = 'profit';
						typeProductHeader.appendChild(itemLabel);
					}

					ran = true;

				}
			}

			for (let k in item) {
				let itemProperty = document.createElement('div');
				itemProperty.style.width = '300px';
				itemProperty.innerHTML = item[k]
				itemDiv.appendChild(itemProperty)
				if(k === 'price'){
					let profitProperty = document.createElement('div');
					profitProperty.innerHTML = item[k] * item['quantity'];
					profitProperty.style.width = '300px';
					itemDiv.appendChild(profitProperty);
				}



			}

			typeProductItems.appendChild(typeProductHeader);
			typeProductItems.appendChild(itemDiv);

		}

		typeProductParent.appendChild(typeProductItems)

	}

	document.getElementById('weed_table').appendChild(typeProductParent);
}


function getData() {
	http.get('api/json', function (res) {
		generateTable(res);
	}, function (err) {
		console.log(err);
	})
}

getData();

let timeleft = 10;
setInterval(function () {
	if (timeleft <= 0) {
		console.log("update");
		timeleft = 10;
		getData()
	}
	timeleft -= 1;
	document.getElementById("timer").innerHTML = timeleft;

}, 1000);
