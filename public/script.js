async function getRandomQuote() {
    var quoteElement = document.getElementById('quote');
    quoteElement.textContent = 'Loading...';
  
    try {
      var response = await fetch('https://api.quotable.io/random');
      var data = await response.json();
      quoteElement.textContent = data.content;
    } catch (error) {
      quoteElement.textContent = 'Failed to fetch quote.';
    }
  }
  