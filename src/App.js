import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./news.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];
/********************************heder***************************/

function App() {
  const [showForm, setShowForm] = useState(false);
  const [allfacts, setallfacts] = useState([]);

  useEffect(function () {
    async function getfacts() {
      const { data: todayilearned, error } = await supabase
        .from("todayilearned")
        .select("*");
      // .eq("CATEGORIES", "technology");
      setallfacts(todayilearned);
    }
    getfacts();
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <img src="./logo.png" height="65" width="65" />
          <h1>Today I learned</h1>
        </div>
        <button
          className="btn btn-large btn-open"
          id="open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "close" : "share a fact"}
        </button>
      </header>
      {showForm ? (
        <Factform setShowForm={setShowForm} setallfacts={setallfacts} />
      ) : null}
      <div className="partition">
        <Category />
        <Fact allfacts={initialFacts} />
      </div>
    </>
  );
}
export default App;

/********************************forms***************************/

function Factform({ setallfacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [cate, setCate] = useState("");
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (text && isValidHttpUrl(source) && cate && textLength <= 200) {
      // const newFacts = {
      //   id: Math.round(Math.random() * 1000),
      //   text,
      //   source,
      //   category: cate,
      //   votesInteresting: 0,
      //   voteMindBlowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear,
      // };

      const { data: newFact, error } = await supabase
        .from("todayilearned")
        .insert([{ text, source, cate }])
        .select();
      if (newFact && newFact.length > 0) {
        setallfacts((facts) => [
          { id: newFact[0].id, ...newFact[0] },
          ...facts,
        ]);
      }
      console.log(newFact);
      setText(" ");
      setSource(" ");
      setCate(" ");

      setShowForm(false);
    }
  }

  return (
    <form className="form " onSubmit={handleSubmit}>
      <input
        placeholder="Share a fact with words..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        placeholder="Trust worthy source...."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        className="options"
        value={cate}
        onChange={(e) => setCate(e.target.value)}
      >
        <option className="all" value={""}>
          choose category:
        </option>
        {CATEGORIES.map((cat) => (
          <option>{cat.name}</option>
        ))}
      </select>
      <button className="btn btn-large">post</button>
    </form>
  );
}

/********************************facts***************************/

function Fact({ allfacts }) {
  return (
    <section>
      <ul key={allfacts.id} className="factslist">
        {allfacts.map((allfact) => (
          <Factlist key={allfact.id} allfact={allfact} />
        ))}
      </ul>
      <p>There are {allfacts.length} facts here,add your own</p>
    </section>
  );
}

function Factlist({ allfact }) {
  return (
    <ul key={allfact.id}>
      <li className="fact">
        <p>
          {allfact.text}
          <a className="link" href={allfact.source} target="_blank">
            (source)
          </a>
        </p>
        <span
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === allfact.category
            ).color,
          }}
        >
          {allfact.category}
        </span>
        <div className="vote">
          <button className="vote-button">👍 {allfact.votesIntresting}</button>
          <button className="vote-button">🤯{allfact.voteMindBlowing}</button>
          <button className="vote-button">⛔️{allfact.votesFalse}</button>
        </div>
      </li>
    </ul>
  );
}

/********************************to check the link***************************/
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

/********************************sidebuttons***************************/
function Category() {
  return (
    <aside className="side-buttons">
      <ul className="side-buttons">
        <li>
          <button className="btn btn-all">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <button
              className="btn btn-seperate"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
