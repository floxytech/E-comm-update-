document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = window.cart.getProductById(productId);

    if (product) {
        document.querySelector('.product-image img').src = product.image;
        document.querySelector('.product-name').textContent = product.name;
        document.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('.product-description').textContent = product.description;

        const addToCartButton = document.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            window.cart.add(productId);
            updateCartCount();
        });
    }

    const suggestedProductsGrid = document.querySelector('.suggested-products .grid');
    const suggestedProducts = products.filter(p => p.id !== productId);

    suggestedProducts.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <a href="product-details.html?id=${p.id}">
                <img src="${p.image}" alt="${p.name}" />
            </a>
            <div class="title">${p.name}</div>
            <div class="price">$${p.price.toFixed(2)}</div>
            <div class="meta">
                <a href="product-details.html?id=${p.id}" class="btn ghost">Quick View</a>
                <button class="btn primary add-to-cart-suggested" data-id="${p.id}">Add to Cart</button>
            </div>
        `;
        suggestedProductsGrid.appendChild(card);
    });

    const addToCartSuggestedButtons = document.querySelectorAll('.add-to-cart-suggested');
    addToCartSuggestedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            window.cart.add(productId);
            updateCartCount();
        });
    });

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = window.cart.items.length;
    }

    const reviewList = document.querySelector('.review-list');
    const averageRating = document.querySelector('.average-rating');
    const totalReviews = document.querySelector('.total-reviews');
    const reviewForm = document.getElementById('review-form');

    function renderReviews() {
        const productReviews = window.reviews.getReviewsByProductId(productId);
        reviewList.innerHTML = '';
        productReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <div class="review-rating">${review.rating} Stars</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${review.date.toLocaleDateString()}</div>
            `;
            reviewList.appendChild(reviewElement);
        });

        const avgRating = window.reviews.getAverageRating(productId);
        averageRating.textContent = `Average Rating: ${avgRating.toFixed(1)} Stars`;
        totalReviews.textContent = `${productReviews.length} Reviews`;
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = parseInt(document.getElementById('rating').value);
        const reviewText = document.getElementById('review-text').value;
        window.reviews.add(productId, rating, reviewText);
        renderReviews();
        reviewForm.reset();
    });

    renderReviews();
    updateCartCount();
});
