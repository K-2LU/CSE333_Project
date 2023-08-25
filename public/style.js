const doctors = [
    { name: 'Hippocrates', quotes: ['Let food be thy medicine and medicine be thy food.', 'Wherever the art of medicine is loved, there is also a love of humanity.'] },
    { name: 'William Osler', quotes: ['The good physician treats the disease; the great physician treats the patient who has the disease.', 'The best preparation for tomorrow is to do today’s work superbly well.'] },
    { name: 'John Harington', quotes:['From your confessor, lawyer and physician, hide not your case on no condition.']},
    { name: 'Martin H. Fischer', quotes:['Observation, Reason, Human Understanding, Courage; these make the physician.']},
// Add more doctors and their quotes here
];

function getRandomDoctorQuote() {
    var quoteElement = document.getElementById('quote');
    var authorElement = document.getElementById('author');

    var randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    var randomQuote = randomDoctor.quotes[Math.floor(Math.random() * randomDoctor.quotes.length)];

    quoteElement.textContent = randomQuote;
    authorElement.textContent = '- ' + randomDoctor.name;
}

document.getElementById("scrollToBottom").addEventListener("click", function(event) {
    event.preventDefault();
    scrollToBottom();
  });
  
  function scrollToBottom() {
    // Scroll smoothly to the bottom of the page
    document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }