let tempProduct = {};
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice, productImg) {
    tempProduct = {
        name: productName,
        price: productPrice,
        image: productImg
    };

    document.querySelector('#box').classList.add('d-block');
    document.querySelector('#box').classList.remove('d-none');
}

function add() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.name === tempProduct.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        let product = {
            id: Date.now(),
            name: tempProduct.name,
            price: tempProduct.price,
            image: tempProduct.image,
            quantity: 1
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateNotification(cart);

    document.querySelector('#box').classList.add('d-none');
    document.querySelector('#box').classList.remove('d-block');
}

function cancel() {
    document.querySelector('#box').classList.add('d-none');
    document.querySelector('#box').classList.remove('d-block');
}

function clearAll() {
    localStorage.clear();
    loadData();
    document.querySelector('#total').textContent = 0;
    document.querySelector('#noti').textContent = 0;
}

function loadData() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItem = document.querySelector('.carts');
    let total = 0;

    cartItem.innerHTML = '';

    if (cart.length === 0) {
        cartItem.innerHTML = `<h4 class="text-center my-4">Your Shopping cart is empty</h4>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            cartItem.innerHTML += `
                <div class="d-flex justify-content-between mb-5">
                    <img src="img/${item.image}" alt="${item.name}" style="width: 100px; height:100px;">
                    <div class="info text-end" style="color:black;">
                        <h4 class="m-0">${item.name}</h4>
                        <p class="m-0 fs-4">Price: $${item.price}</p>
                        <div class="btns">
                            <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelector('#total').textContent = total.toFixed(2);
    }

    updateNotification(cart);
}

function changeQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index]) {
        if (action === 'increase') {
            cart[index].quantity += 1;
        } else if (action === 'decrease') {
            cart[index].quantity -= 1;
        }

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadData();
    }
}


function changePhotoOnce(xx,yy) {
      const image = document.getElementById(yy);
      image.src = xx;
}
  


function updateNotification(cart) {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('#noti').textContent = totalQuantity;
}

document.addEventListener("DOMContentLoaded", loadData);

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btnnn');
    const cards = document.querySelectorAll('.card');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.id;

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (category === 'all') {
                cards.forEach(card => card.style.display = 'block');
            } else {
                cards.forEach(card => {
                    if (card.classList.contains(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
});


