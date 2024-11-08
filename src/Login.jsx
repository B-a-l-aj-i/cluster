
import { useState } from "react";

import "./Login.css";
function Login({gN}){

    
    let [isFocused,setIsFocused]=useState(false)
    let [name,setName]=useState("");
    
    function handleName(e){
        setName(e.target.value)
        // setName("")
    }
    
    function handleSubmit(e){
        // console.log(e);
        if(name!==""){
            // console.log(name);
            gN(name)
        }   

    }
    

    function handleSubmit2(e){
       let {key}=e;
       if(key==="Enter" && name!==""){
        // console.log(name);
        gN(name)
       }
    }


    return (
      <>
        <div className="form-container">
          <input onKeyUp={handleSubmit2} onChange={handleName}  onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                     type="text" placeholder="Enter Your Name..." />
          {isFocused && <button   onClick={handleSubmit} type="button">Submit</button>}
        </div>
      </>
    )
  }

  export default Login;
