import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./news.css";
import Login from "./Login";


import like1  from  "./likebuttons/like1.png" 
import like2  from  "./likebuttons/like2.png" 
import dislike1 from "./dislikebuttons/dislike1.png"
import dislike2 from "./dislikebuttons/dislike2.png"


import menu from "./hamBurgerButtons/menu.png"
import cross from "./hamBurgerButtons/cross.png"


const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "astronomy", color: "#8b5cf6" },
  { name: "society", color: "#eab308" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "culture", color: "#8b5cf6" },
  { name: "entertainment", color: "#db2777" },
  // { name: "others", color: "black" },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];
/********************************heder***************************/


function App() {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  const [allfacts, setallfacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);  

  const [userName,setuserName]=useState("")


  const updateScreenSize = () => {
    setIsDesktop(window.innerWidth >= 900);
  };

  useEffect(() => {
    // Event listener to update screen size on resize
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const toggleMenu = () => {  
      setIsOpen(!isOpen);  
  };  

  useEffect(function () {
    async function getfacts() {
      const { data: community, error } = await supabase
        .from("info")
        .select("*")
        // .eq("category", cate);
     try{
      console.log(community);
     } catch(e){

       console.log(error);
     }
      setallfacts(community);
      // console.log(error);
    }
    getfacts();
  }, []);

    function getName(name){
      console.log(name);
      setuserName(name);
    }

  const filteredFacts = selectedCategory
    ? allfacts.filter((fact) => fact.category === selectedCategory)
    : allfacts;

  return (
    <>
      {
      (!userName && <Login gN={getName} />) 
      || //use AND TO REMOVE LOGIN  PAGE
      ( <>
      <header>
        <div className="logo">
          
          <p className="h2"> 
          <a href="https://balajiscluster.netlify.app" target="_self">
          <img  style={{cursor:"pointer"}} className="logopng" alt="clusterPng" src="./logo.png" height="40" width="40" />
          </a> 
          
          CLUSTER
           </p>
        </div>
           
        <button
          className="btn-large btn-open"
          id="open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "close" : "POST"}
        </button>
        <span onClick={toggleMenu} className="ham">
        {
         ( !isOpen && <img src={menu} alt="menu" width={40} height={40}/>) || 
          <img src={cross} width={30} alt="cross" height={30}/>
        } 
        </span>

      </header>
      {showForm ? (
        <Factform userName={userName} setShowForm={setShowForm} setallfacts={setallfacts} />
      ) : null}
      <div className="partition">
       {
        isOpen && ( <Category setSelectedCategory={setSelectedCategory} />)
       }
        {/* //allfacts is array of objecs */}
        {isDesktop  && <Category setSelectedCategory={setSelectedCategory} />}
        <Fact userName={userName} allfacts={filteredFacts} />
      </div>
    </>
      )
      
      }

    </>
   
  );
}
export default App;

/********************************forms***************************/

function Factform({ setallfacts, setShowForm, userName }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [cate, setCate] = useState("");
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (text && isValidHttpUrl(source) && cate && textLength <= 200) {
      console.log("done clicked....");
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
        .from("info")
        .insert([{text,source, category:cate, userName:userName}])
        .select("*");
        console.log(error);
        // console.log(userName);
      if (newFact && newFact.length > 0) {
        setallfacts((facts) => [{ id: newFact[0].id, ...newFact[0] },...facts]);
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
      {/* <input name="1"
        placeholder="Share a fact with words..."
        value={text}
        onChange={(e) =>{setText(e.target.value)}}
      /> */}

      <textarea
      placeholder="Share a fact with words..."
        value={text}
        onChange={(e) =>{setText(e.target.value)}}
      >

      </textarea>
      <span>Char Limit :{200 - textLength}</span>
      <input name="2"
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
      <button className="btn btn-large btn-done">DONE</button>
    </form>
  );
}

/********************************facts***************************/
function Fact({ allfacts ,userName}) {
  // setName(nm);

  return (
    <section>
     <center> 
      {/* <span>{userName &&  <h1>Hello, {userName}!</h1>} </span> */}
      <p className="count"> Hey,{userName}!  There are {allfacts.length} facts here,add your own</p> 
    </center>
      <br></br>
      <ul key={allfacts.id} className="factslist">
        {allfacts.map((allfact) => (
          <Factlist userName={userName} key={allfact.id} allfact={allfact}/>
        ))}
      </ul>
      
    </section>
  );
}

function Factlist({ allfact ,userName}) {
  // Get :initial like and dislike statuses from localStorage (if available)

  
  const [hasLiked, setHasLiked] = useState(() => {
    const storedLike = localStorage.getItem(`liked-${allfact.id}`);
    return storedLike === 'true'; // Return true or false based on localStorage value
  });

  const [hasDisliked, setHasDisliked] = useState(() => {
    const storedDislike = localStorage.getItem(`disliked-${allfact.id}`);
    return storedDislike === 'true'; // Return true or false based on localStorage value
  });

  // State for tracking current like/dislike counts
  const [like, setLike] = useState(allfact.votesInteresting);
  const [dislike, setDislike] = useState(allfact.votesFalse);

  // Handle the like button click
  const handleLike = async () => {
    const newLikeCount = hasLiked ? like - 1 : like + 1;
    const newDislikeCount = hasDisliked ? dislike - 1 : dislike;

    // Update local state
    setLike(newLikeCount);
    setDislike(newDislikeCount);

    // Update Supabase with the new like and dislike counts
    const { data, error } = await supabase
      .from('info')
      .update({ votesInteresting: newLikeCount, votesFalse: newDislikeCount })
      .eq('id', allfact.id)
      .select();

    if (error) {
      console.error('Error updating votes:', error);
    } else {
      console.log('Updated data:', data);
    }

    // Toggle like status
    const newLikeStatus = !hasLiked;
    setHasLiked(newLikeStatus);
    // Store in localStorage
    localStorage.setItem(`liked-${allfact.id}`, newLikeStatus.toString());

    // If disliked, remove dislike
    if (hasDisliked) {
      setHasDisliked(false);
      localStorage.setItem(`disliked-${allfact.id}`, 'false');
    }
  };

  // Handle the dislike button click
  const handleDislike = async () => {
    const newDislikeCount = hasDisliked ? dislike - 1 : dislike + 1;
    const newLikeCount = hasLiked ? like - 1 : like;

    // Update local state
    setLike(newLikeCount);
    setDislike(newDislikeCount);

    // Update Supabase with the new like and dislike counts
    const { data, error } = await supabase
      .from('info')
      .update({ votesInteresting: newLikeCount, votesFalse: newDislikeCount })
      .eq('id', allfact.id)
      .select();

    if (error) {
      console.error('Error updating votes:', error);
    } else {
      console.log('Updated data:', data);
    }

    // Toggle dislike status
    const newDislikeStatus = !hasDisliked;
    setHasDisliked(newDislikeStatus);
    // Store in localStorage
    localStorage.setItem(`disliked-${allfact.id}`, newDislikeStatus.toString());

    // If liked, remove like
    if (hasLiked) {
      setHasLiked(false);
      localStorage.setItem(`liked-${allfact.id}`, 'false');
    }
  };
  return (
    <ul>
    

     <li key={allfact.id} className="fact">
        <p>
          {allfact.text}
          <a className="link" href={allfact.source} rel="noreferrer" target="_blank">
            (source)
          </a>
        </p>
        <span
          style={{
            backgroundColor: CATEGORIES.find((cat) => cat.name === allfact.category).color,
          }}
        >
          {allfact.category}
        </span>
        <div className="vote">
          <button className="vote-button" onClick={handleLike}>
          
            {
             hasLiked ?
             <img src={like2} alt="like" height={30} width={30}/>
              :
             <img src={like1} alt="like" height={30} width={30}/> 
             } 

             {userName==="aj"?like:""}
          </button>
          <button className="vote-button" onClick={handleDislike}>
          {
            hasDisliked ?
             <img src={dislike2} alt="like" height={25} width={25}/>
              :
             <img src={dislike1} alt="like" height={25} width={25}/> 
             }             
            
            {userName==="aj"?dislike:""}
          </button>
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
  // console.log(url.protocol);

  return url.protocol === "http:" || url.protocol === "https:";
}
/********************************sidebuttons***************************/


function Category({ setSelectedCategory }) {
 
  return (
    <aside className="side-buttons">
      <ul className="side-buttons">
        <li>
          <button className="btn btn-all" onClick={() => setSelectedCategory("")}>all</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <button
              className="btn btn-seperate"
              style={{ backgroundColor: cat.color }}
              onClick={() => setSelectedCategory(cat.name)
              }
               >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
