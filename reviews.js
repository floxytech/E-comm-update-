document.addEventListener('DOMContentLoaded', () => {
    const reviews = {
        reviews: [],
        add(productId, rating, text) {
            const newReview = { productId, rating, text, date: new Date() };
            this.reviews.push(newReview);
            this.save();
        },
        getReviewsByProductId(productId) {
            return this.reviews.filter(r => r.productId === productId);
        },
        getAverageRating(productId) {
            const productReviews = this.getReviewsByProductId(productId);
            if (productReviews.length === 0) {
                return 0;
            }
            const totalRating = productReviews.reduce((total, review) => total + review.rating, 0);
            return totalRating / productReviews.length;
        },
        save() {
            localStorage.setItem('reviews', JSON.stringify(this.reviews));
        },
        load() {
            const reviews = localStorage.getItem('reviews');
            if (reviews) {
                this.reviews = JSON.parse(reviews).map(r => ({...r, date: new Date(r.date)}));
            }
        }
    };

    reviews.load();

    window.reviews = reviews;
});
