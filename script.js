document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#items-grid');
    const loader = document.querySelector('#loader');
    const burgerBtn = document.querySelector('#burger-btn');
    const nav = document.querySelector('#mobile-menu');


    burgerBtn.addEventListener('click', () => {
        nav.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll');

        burgerBtn.classList.toggle('active');
    });


    nav.addEventListener('click', (e) => {
        if(e.target.classList.contains('nav-link')) {
            nav.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }
    });


    async function fetchData() {
        try {
            loader.style.display = 'block';
            const response = await fetch('data.json');

            if (!response.ok) throw new Error('Помилка завантаження');

            const data = await response.json();
            renderCards(data);
        } catch (error) {
            grid.innerHTML = `<p class="error">Вибачте, дані тимчасово недоступні. ${error.message}</p>`;
        } finally {
            loader.style.display = 'none';
        }
    }

    function renderCards(items) {
        grid.innerHTML = '';
        items.forEach(item => {
            const cardHTML = `
                <article class="card" data-category="${item.category}">
                    <button class="like-btn" aria-label="Додати в обране">❤</button>
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <h3>${item.title}</h3>
                    <p class="price">${item.price} грн</p>
                    <button class="btn-primary" ${!item.inStock ? 'disabled' : ''}>
                        ${item.inStock ? 'Купити' : 'Немає в наявності'}
                    </button>
                </article>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }


    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-btn')) {
            e.target.classList.toggle('is-active');
            e.target.style.transform = 'scale(1.2)';
            setTimeout(() => e.target.style.transform = 'scale(1)', 200);
        }
    });


    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;


            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');


            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    fetchData();
});


const addToCartBtn = document.querySelector('.btn-black');

addToCartBtn.addEventListener('click', () => {

    const selectedSize = document.querySelector('.size-btn.active');

    if (!selectedSize) {
        alert('Будь ласка, виберіть розмір!');
        return;
    }


    const orderItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize.innerText
    };


    localStorage.setItem('cartItem', JSON.stringify(orderItem));


    window.location.href = 'cart.html';
});