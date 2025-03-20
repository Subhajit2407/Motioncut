// Initialize Lucide icons
lucide.createIcons();

// Sample data for recommended articles
const recommendedArticles = [
    {
        title: "US-Approved Spot Bitcoin ETFs Could Surpass $50 Billion Market",
        time: "4 hours ago",
        image: "./image/bitcoin.png/"
    },
    {
        title: "Over 65% of Crypto-Related Tweets and 84% of Conversations on Reddit Were Positive in 2023",
        time: "4 hours ago",
        image: "./image/Solana.png/"
    },
    {
        title: "STX Price Prediction: After 126% Price Jump in December, What's in Store for 2024?",
        time: "4 hours ago",
        image: "./image/dollar.png/"
    }
];

// Populate recommended articles
const recommendedContainer = document.getElementById('recommendedArticles');

recommendedArticles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'article-card';
    articleElement.innerHTML = `
        <img src="${article.image}" alt="Article thumbnail">
        <div class="article-card-content">
            <h3>${article.title}</h3>
            <p>${article.time}</p>
        </div>
    `;
    recommendedContainer.appendChild(articleElement);
});

// Add hover effects for navigation items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.color = '#2563EB';
    });
    item.addEventListener('mouseleave', () => {
        item.style.color = '';
    });
});