const fetchButton = document.getElementById('fetch-news');
const newsList = document.getElementById('news-list');

// Your Newsdata.io API Key
const apiKey = 'pub_737540931e98c979c38df2886713302d44c3e';
const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_737540931e98c979c38df2886713302d44c3e&q=Hot%20Topics`

const fetchNews = async () => {
    try {
        const response = await axios.get(apiUrl);
        const articles = response.data.results; // Adjusted for Newsdata.io

        displayNews(articles);
    } catch (error) {
        console.error("Error fetching the news:", error);
        alert("Failed to fetch news. Please try again later.");
    }
};

const displayNews = (articles) => {
    newsList.innerHTML = ''; // Clear previous news items

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'hover:shadow-lg');

        const newsTitle = document.createElement('h2');
        newsTitle.classList.add('font-bold', 'text-xl', 'mb-2');
        newsTitle.textContent = article.title;

        const newsDescription = document.createElement('p');
        newsDescription.classList.add('text-gray-700', 'mb-2');
        newsDescription.textContent = article.description || 'No description available';

        const newsImage = document.createElement('img');
        newsImage.classList.add('w-full', 'h-48', 'object-cover', 'rounded');
        newsImage.src = article.image_url || 'https://via.placeholder.com/400x200';

        newsCard.append(newsImage, newsTitle, newsDescription);
        newsList.appendChild(newsCard);
    });
};

// Add event listener to fetch news when button is clicked
fetchButton.addEventListener('click', fetchNews);
