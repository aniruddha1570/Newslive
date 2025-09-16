document.addEventListener('DOMContentLoaded', () => {
    fetch('data/ai_news.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(articles => {
            const newsContainer = document.getElementById('news-container');
            if (articles && articles.length > 0) {
                articles.forEach(article => {
                    const card = document.createElement('article');
                    card.classList.add('news-card');

                    const imageUrl = article.image_url || 'https://via.placeholder.com/600x400.png?text=Image+Not+Available';
                    
                    card.innerHTML = `
                        <img src="${imageUrl}" alt="Image for ${article.title}">
                        <div class="news-content">
                            <h2>${article.title}</h2>
                            <p>${article.description || 'No description available.'}</p>
                            <div class="news-footer">
                                <span>Source: ${article.source}</span>
                                <time datetime="${article.publishedAt}">
                                    ${new Date(article.publishedAt).toLocaleDateString()}
                                </time>
                            </div>
                            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="read-more">Read More &raquo;</a>
                        </div>
                    `;
                    newsContainer.appendChild(card);
                });
            } else {
                newsContainer.innerHTML = '<p>No news articles found. Please try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing news:', error);
            document.getElementById('news-container').innerHTML = '<p>Failed to load news. Please check your connection or try again later.</p>';
        });
});