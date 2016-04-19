document.querySelector("#save").onclick = function() {
	var nodes = document.querySelector("#params").children;
	var datas = {};
	for(var i=0; i<nodes.length; i++) {
		datas[nodes[i].getElementsByTagName("label")[0].innerHTML] = nodes[i].getElementsByTagName("input")[0].value;
	}
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/setguage/" + document.querySelector("#h").innerHTML, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	xhr.send(JSON.stringify(datas));

	xhr.onloadend = function () {
		document.querySelector("#save").innerHTML = "Saved!";
	};
};
