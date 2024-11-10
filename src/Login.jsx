
import { useState } from "react";

import "./Login.css";

import supabase from "./supabase";
function Login({gN}){

    
    let [isFocused,setIsFocused]=useState(false)
    let [name,setName]=useState("");

    let reg=/[a-z,A-Z,","]/;
    
    function handleName(e){
        setName(e.target.value)
        // setName("")
    }

   async function insert(name){
      
        const { data, error } = await supabase
        .from('loginUser')
        .insert({ name:name })
        .select()

        console.log(data,error);
        
    }
    
    function handleSubmit(e){
        // console.log(e);
        if(reg.test(name)){
            // console.log(name);
            gN(name)
            insert(name)
        }   

    }
    

    function handleSubmit2(e){
       let {key}=e;
       if(key==="Enter" && reg.test(name)){
        // console.log(name);
        gN(name)
        insert(name)
       }
    }


    return (
      <>
        <div className="form-container">
          <input onKeyUp={handleSubmit2} onChange={handleName} onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                     type="text" placeholder="Enter Your Name..." />
          {isFocused && <button   onClick={handleSubmit} type="button">Submit</button>}
        </div>
      </>
    )
  }

  export default Login;
