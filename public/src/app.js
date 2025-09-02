import React, { useState, useEffect } from 'react';

const topics = ['javascript', 'python', 'react', 'java', 'science', 'fiction', 'history'];

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentTopic, setCurrentTopic] = useState(topics[0]);
  const pageSize = 10;

  const fetchBooks = async (query, offset) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${pageSize}&offset=${offset}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const validBooks = data.docs.filter(book => book.author_name && book.cover_i);
      
      if (validBooks.length === 0 && offset === 0) {
        setError("No books found for this topic.");
      }

      setBooks(validBooks);
      setTotalPages(Math.ceil(data.numFound / pageSize));
    } catch (e) {
      console.error("Failed to fetch books:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    fetchBooks(currentTopic, offset);
  }, [currentPage, currentTopic]);

  const handleTopicChange = (topic) => {
    setCurrentTopic(topic);
    setCurrentPage(1); // Reset to the first page when the topic changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const truncateContent = (content) => {
    const maxLength = 150;
    if (content && content.length > maxLength) {
      return `${content.slice(0, maxLength)}...`;
    }
    return content;
  };

  const getCoverImageUrl = (coverId) => {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  };
  
  const formatAuthor = (authors) => {
    return authors ? authors.join(', ') : 'N/A';
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">News Aggregator</h1>
      
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {topics.map((topic) => (
          <a 
            key={topic} 
            href={`?topic=${topic}&page=${currentPage}`}
            onClick={(e) => {
              e.preventDefault();
              handleTopicChange(topic);
            }}
            className={`badge badge-pill badge-${currentTopic === topic ? 'primary' : 'secondary'} mx-2 mb-2 p-2`}
            style={{ cursor: 'pointer' }}
          >
            {topic}
          </a>
        ))}
      </div>

      <div className="row">
        {books.map((book) => (
          <div className="col-md-6 mb-4" key={book.key}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <img
                  src={getCoverImageUrl(book.cover_i)}
                  alt={`Cover of ${book.title}`}
                  className="card-img-top mb-3"
                  style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }}
                />
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  {truncateContent(book.content) || `A book by ${formatAuthor(book.author_name)}.`}
                </p>
                <p className="card-text">
                  <small className="text-muted">Author: {formatAuthor(book.author_name)}</small>
                </p>
                <a
                  href={`https://openlibrary.org${book.key}`}
                  className="btn btn-primary mt-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a 
              className="page-link" 
              href={`?topic=${currentTopic}&page=${currentPage - 1}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            >
              Previous
            </a>
          </li>
          <li className="page-item disabled">
            <span className="page-link">Page {currentPage} of {totalPages}</span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a 
              className="page-link" 
              href={`?topic=${currentTopic}&page=${currentPage + 1}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
