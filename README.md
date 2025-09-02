# Full-Stack News Aggregator

This is a full-stack news aggregator application built with **React** and **JavaScript**. It leverages the **Open Library Search API** to fetch and display a paginated, filterable list of books, serving as a dynamic library catalog. The application uses **Bootstrap 4** for styling the user interface, providing a clean and responsive design.

-----

### Key Features

  * **Dynamic Content**: Fetches real book data, including titles, authors, and cover images, from the Open Library Search API.
  * **Topic Filtering**: Users can filter the displayed books by various topics using interactive badges. Selecting a new topic instantly updates the displayed content.
  * **Pagination**: Efficiently handles large datasets by displaying a limited number of results per page with navigation controls. This is managed by passing `limit` and `offset` parameters to the API.
  * **Responsive UI**: Styled with **Bootstrap 4** to ensure the application looks great on all devices.
  * **Error Handling**: Includes robust error handling for API requests, providing user-friendly messages for forbidden access or network issues.

-----

### Technologies Used

  * **Frontend**: React (with Hooks for state management), JavaScript
  * **Styling**: Bootstrap 4 (via CDN)
  * **API**: Open Library Search API

-----

### Setup and Installation

1.  **Clone the Repository**:

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Run the Application**:

    ```bash
    npm start
    ```

    The application will open in your default browser at `http://localhost:3000`.

### Project Structure

```
├── public/
│   ├── index.html          # Main HTML file with Bootstrap CDN
│   └── ...
├── src/
│   ├── App.js              # Main React component with all the logic
│   └── ...
├── package.json
├── .gitignore
├── README.md
└── ...
```# Book-Library
