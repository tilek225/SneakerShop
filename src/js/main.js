let swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 1000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
    },
});

document.addEventListener('DOMContentLoaded', function (e) {
    let row = document.querySelector('.main__row');
    let formSearch = document.querySelector('.form__search')

    const getAll = (title = '') => {
        fetch(`http://localhost:8080/sneakers?title_like=${title}`)
            .then(res => res.json())
            .then(data => data.forEach(item => {
                row.innerHTML += `
                <div class="main__card">
                    <button type="button" class="main__card-favorites" data-id="${item.id}" data-title="${item.title}" data-url="${item.imageUrl}" data-price="${item.price}">
                    ❤	
                    </button>
                    <img class="main__card-img" src="${item.imageUrl}" alt="${item.title}">
                    <h3 class="main__card-title">${item.title}</h3>
                    <div class="main__card-pay">
                        <div class="main__card-money">
                            <p class="main__card-money-title">Цена:</p>
                            <span class="main__card-price">${item.price}   руб.</span>
                        </div>
                        <button class="main__card-btn">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6653 5.13122H7.20214V1.66821C7.20214 0.332846 5.13114 0.332846 5.13114 1.66821V5.13122H1.668C0.332935 5.13122 0.332935 7.20215 1.668 7.20215H5.13114V10.6652C5.13114 12.0005 7.20214 12.0005 7.20214 10.6652V7.20215H10.6653C12.0005 7.20215 12.0005 5.13122 10.6653 5.13122Z" fill="#A5D364"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `
                let btns = document.querySelectorAll('.main__card-favorites');
                btns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (btn.className.includes('acitve')) {
                            fetch(`http://localhost:8080/favorites/${btn.dataset.id}`, {
                                method: 'DELETE'
                            }).then(() => console.log('Успешно удален'))
                        } else {
                            fetch(`http://localhost:8080/favorites`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: btn.dataset.id,
                                    title: btn.dataset.title,
                                    price: btn.dataset.price,
                                    imageUrl: btn.dataset.url
                                })
                            }).then(() => console.log('Успешно добавлен'))
                        }
                        btn.classList.toggle('active')
                    })
                })
            }))
    }

    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        row.innerHTML = '';
        getAll(e.target[0].value)
    })

    getAll();


})