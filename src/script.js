"use strict";

//defining an array for the quotes
let quotes;

//defining the function component.
const App = () => {
  //initializing the initial state
  const [quote, setQuote] = React.useState("");

  //asynchronous function that fetches JSON content, populates the quotes array and updates state with a quote (following the fetch being complete)
  React.useEffect(async () => {
    const responseJSON = await fetch(
      "https://cdn.jsdelivr.net/gh/morsewall/jsondb@master/db.json"
    );
    const responseObject = await responseJSON.json();
    quotes = responseObject.quotes;
    let initialQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(initialQuote);
  }, []);

  const random = array => {
    return Math.floor(Math.random() * array.length);
  };

  const randomQuoteFunction = array => {
    return array[random(array)];
  };

  //defining a function to update the state with a new quote
  const chosenRandomQuoteToState = () => {
    let chosenQuote = randomQuoteFunction(quotes);
    setQuote(chosenQuote);
  };

  let twitterLink;

  //making the machine tweet
  let quoteTextElem = quote.quoteText;
  let quoteAuthorElem = " - " + quote.quoteAuthor;
  let contentQuote = quoteTextElem + quoteAuthorElem;
  if (contentQuote.length > 280) {
    let charCountAuthor = quoteAuthorElem.length;
    const extraStylingChar = "..." + '"';
    let extraCharCount = extraStylingChar.length;
    let subString =
      quoteTextElem.substring(0, 280 - extraCharCount - charCountAuthor) +
      extraStylingChar +
      quoteAuthorElem;
    //generate url available for Twitter intent and inject url on HTML
    twitterLink = "https://twitter.com/intent/tweet?text=" + subString;
  } else {
    //generate url available for Twitter intent and inject url on HTML
    twitterLink = "https://twitter.com/intent/tweet?text=" + contentQuote;
  }

  //the component returns JSX, and as per code snippet below, JSX clearly represents HTML, composing the UI.
  return (
    //as a React component can only return one single element, I’m using <React.Fragment> to add a parent tag to my JSX elements without adding an extra node to the DOM.
    <React.Fragment>
      <div className="container">
        <div id="quote-box">
          <div className="quotable-square">
            <div className="content">
              <div id="text">{quote.quoteText}</div>
              <div id="author" className="author">
                {quote.quoteAuthor}
              </div>
            </div>
          </div>
          <div className="actions">
            <button
              id="new-quote"
              className="new-quote"
              onClick={chosenRandomQuoteToState}
            >
              Get New Quote
            </button>
            <button className="tweet-quote">
              <a id="tweet-quote" href={twitterLink} target="_blank">
                <i className="fab fa-twitter"></i>Tweet Quote
              </a>
            </button>
          </div>
        </div>
      </div>
      <footer>
        <ul className="footer-options">
          <li className="footer-link">
            <a href="#" className="footer-linktext">
              Legal
            </a>
          </li>
          <li className="footer-link">
            <a href="#" className="footer-linktext">
              Contact Us
            </a>
          </li>
        </ul>
        <span>© 2019 Developed by Pat. All Rights Reserved.</span>
      </footer>
    </React.Fragment>
  );
};

//placing JSX into React’s own DOM
ReactDOM.render(<App />, document.getElementById("app"));
