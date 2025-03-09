const fetchButton = document.getElementById('fetch-news');
const newsList = document.getElementById('news-list');

// Your API Key
const apiKey = 'pub_737540931e98c979c38df2886713302d44c3e';
const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Hot%20Topics`;

const fetchNews = async () => {
    try {
        const response = await axios.get(apiUrl);

        // Check if `response.data.results` exists and is an array
        if (!response.data.results || response.data.results.length === 0) {
            throw new Error("No news articles found.");
        }

        displayNews(response.data.results);
    } catch (error) {
        console.error("Error fetching the news:", error);
        alert("Failed to fetch news. Please try again later.");
    }
};

const displayNews = (articles) => {
    newsList.innerHTML = ''; // Clear previous news

    // Check if articles are available
    if (articles && Array.isArray(articles)) {
        articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'mb-4', 'w-full', 'lg:w-1/3', 'sm:w-1/2');

            const newsTitle = document.createElement('h2');
            newsTitle.classList.add('font-bold', 'text-xl', 'mb-2');
            newsTitle.textContent = article.title || "No Title Available";

            const newsDescription = document.createElement('p');
            newsDescription.classList.add('text-gray-700', 'mb-2');
            newsDescription.textContent = article.description || "No description available.";

            const newsImage = document.createElement('img');
            newsImage.classList.add('w-full', 'h-48', 'object-cover', 'rounded', 'mb-4');
            newsImage.src = article.image_url || 'https://via.placeholder.com/400x200';

            const readMoreButton = document.createElement('button');
            readMoreButton.classList.add('mt-2', 'text-blue-500', 'hover:underline');
            readMoreButton.textContent = "Read More";
            
            // Toggle full article visibility
            const articleDetails = document.createElement('div');
            articleDetails.classList.add('hidden', 'mt-2');
            articleDetails.innerHTML = `
                <p>${article.content || "No full content available."}</p>
                <a href="${article.link}" target="_blank" class="text-blue-500 hover:underline">Read full article</a>
            `;
            
            readMoreButton.addEventListener('click', () => {
                articleDetails.classList.toggle('hidden');
                readMoreButton.textContent = articleDetails.classList.contains('hidden') ? "Read More" : "Read Less";
            });

            newsCard.append(newsImage, newsTitle, newsDescription, readMoreButton, articleDetails);
            newsList.appendChild(newsCard);
        });
    } else {
        console.log("No articles available.");
    }
};

// Attach event listener
fetchButton.addEventListener('click', fetchNews);
