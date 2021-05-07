var currentShopId;

function fetchShops() {
    let content = document.getElementById("content");

    let body = document.getElementsByTagName("body")[0];
    let p = document.createElement("p");
    p.innerText = "Pagina se încarcă...";
    p.setAttribute("id", "loading");
    body.appendChild(p);

    fetch('http://localhost:3001/shops', {
    method: 'get'
    }).then(function(response) {
        response.json().then((data) => {
            if(data.length) {
                body.removeChild(p);
            }

            for(let i = 0; i < data.length; i++){
                let image = document.createElement("img");
                image.setAttribute("src", data[i].img);
                image.width = 90;
                content.appendChild(image);

                let h2 = document.createElement("h2");
                h2.innerText = data[i].name;
                content.appendChild(h2);

                let editButton = document.createElement("button");
                let editText = document.createTextNode("Editează");
                editButton.appendChild(editText);
                editButton.onclick = function() {
                    document.getElementById("name").value = data[i].name;
                    document.getElementById("image").value = data[i].img;
                    currentShopId = data[i].id;
                }
                content.appendChild(editButton);

                let deleteButton = document.createElement("button");
                let deleteText = document.createTextNode("Șterge");
                deleteButton.appendChild(deleteText);
                deleteButton.onclick = function() {
                    deleteShop(data[i].id);
                }
                content.appendChild(deleteButton);

                let hr = document.createElement("hr");
                content.appendChild(hr);
            }
        })
    })
}

fetchShops()

function addShop() {
    var name = document.getElementById("name").value;
    var img = document.getElementById("image").value;
    var newShop = {
        name: name,
        img: img
    }
    fetch('http://localhost:3001/shops', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newShop)
    }).then(function(response) {
        console.log(response);
    })
}

function editShop() {
    var name = document.getElementById("name").value;
    var img = document.getElementById("image").value;

    var newShop = {
        name: name,
        img: img
    }

    fetch('http://localhost:3001/shops/' + currentShopId, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newShop)
    }).then(function(response) {
    })
}

function deleteShop(id) {
    fetch('http://localhost:3001/shops/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        window.location.reload();
    })
}

function filterByCategory() {
    let content = document.getElementById("content");
    let category = document.getElementById("filter").value;
    fetch('http://localhost:3001/shops/filter/property?category=' + category, {
    method: 'get'
    }).then(function(response) {
        while(content.hasChildNodes()) {
            content.removeChild(content.lastChild);
        }

        response.json().then((data) => {
            for(let i = 0; i < data.length; i++){
                let image = document.createElement("img");
                image.setAttribute("src", data[i].img);
                image.width = 100;
                content.appendChild(image);

                let h2 = document.createElement("h2");
                h2.innerText = data[i].name;
                content.appendChild(h2);

                let editButton = document.createElement("button");
                let editText = document.createTextNode("Editează");
                editButton.appendChild(editText);
                editButton.onclick = function() {
                    document.getElementById("name").value = data[i].name;
                    document.getElementById("image").value = data[i].img;
                    currentShopId = data[i].id;
                }
                content.appendChild(editButton);

                let deleteButton = document.createElement("button");
                let deleteText = document.createTextNode("Șterge");
                deleteButton.appendChild(deleteText);
                deleteButton.onclick = function() {
                    deleteShop(data[i].id);
                }
                content.appendChild(deleteButton);

                let hr = document.createElement("hr");
                content.appendChild(hr);
            }
        })
    })
}