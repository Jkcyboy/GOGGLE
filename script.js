// Access Key
const accessKey = "2eiVPxaxYBACkqDNY0tYOFtd-cY6ewYvBezh7NN1H_w";

// Variable Bank
const searchForm = document.getElementById("search-form");  // Fixed ID here
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// Function to fetch images from Unsplash
async function searchImages() {
    keyword = searchBox.value.trim();  // Trim spaces from the keyword
    if (!keyword) {
        alert("Please enter a search term.");
        return; // Exit if no keyword is entered
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    console.log("Fetching data from Unsplash with URL:", url);  // Log the request URL

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);  // Log the API response

        // Check if there are results
        const results = data.results;

        if (results.length === 0) {
            searchResult.innerHTML = "No results found.";
            console.log("No results found.");
            return;
        }

        // Clear previous results before adding new ones
        if (page === 1) {
            searchResult.innerHTML = "";  // Clear previous search results
        }

        // Display images
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image"; // Alt text for accessibility

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Show the "Show More" button if there are more pages of results
        if (data.total_pages > page) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        searchResult.innerHTML = "Something went wrong. Please try again later.";
    }
}

// Submit function to load images searched for when clicking the button
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset page to 1 when a new search is made
    searchImages();
});

// Show more functionality (loads more images on button click)
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
