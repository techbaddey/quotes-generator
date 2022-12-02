import "./App.css";
import { useState } from "react";
import { FaVolumeUp, FaCopy, FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";


const quotes = [
  {
    quote:
      "One of my most productive days was throwing away 1,000 lines of code.",
    cite: "Ken Thompson",
  },
  {
    quote:
      "I have always wished for my computer to be as easy to use as my telephone; my wish has come true because I can no longer figure out how to use my telephone.",
    cite: "Bjarne Stroustrup",
  },
  {
    quote: "When in doubt, use brute force.",
    cite: "Ken Thompson",
  },
  {
    quote: "Talk is cheap. Show me the code.",
    cite: "Linus Torvalds",
  },
  {
    quote:
      "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
    cite: "Martin Golding",
  },
  {
    quote:
      "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.",
    cite: "Linus Torvalds",
  },
  {
    quote:
      "Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves.",
    cite: "Alan Kay",
  },
  {
    quote:
      "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris",
    cite: "Larry Wall",
  },
  {
    quote:
      "First learn computer science and all the theory. Next develop a programming style. Then forget all that and just hack.",
    cite: "George Carrette",
  },
];

export default function App() {
  const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

  const [index, setIndex] = useState();
  const generate = () => {
    const index = Math.floor(Math.random() * quotes.length);
    setIndex(index);
  };

  return (
    <>
      <div className="body">
        <div className="wrapper">
          <header>Quotes for Programmers</header>
          <div className="content">
            <div className="quote-area">
              <div className="i">
                <FaQuoteLeft />
              </div>
              <p className="quote">{quotes[index] && quotes[index].quote}</p>
              <div className="i">
                <FaQuoteRight />
              </div>
            </div>
            <div className="author">
              <span>__</span>
              <span class="name">{quotes[index] && quotes[index].cite}</span>
            </div>
          </div>
          <div className="buttons">
            <div className="features">
              <ul>
                <li
                  onClick={() => {
                    if (!quoteBtn.classList.contains("loading")) {
                      let utterance = new SpeechSynthesisUtterance(
                        `${quoteText.innerText} by ${authorName.innerText}`
                      );
                      synth.speak(utterance);
                      setInterval(() => {
                        !synth.speaking
                          ? speechBtn.classList.remove("active")
                          : speechBtn.classList.add("active");
                      }, 10);
                    }
                  }}
                  className="speech"
                >
                  <FaVolumeUp />
                </li>
                <li
                  onClick={() => {
                    navigator.clipboard.writeText(quoteText.innerText);
                  }}
                  className="copy"
                >
                  {" "}
                  <FaCopy />{" "}
                </li>
                <li
                  onClick={() => {
                    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
                    window.open(tweetUrl, "_blank");
                  }}
                  className="twitter"
                >
                  {" "}
                  <FaTwitter />{" "}
                </li>
              </ul>
              <button onClick={generate}>New Quote</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}