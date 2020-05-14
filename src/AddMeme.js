import React, { useState } from "react";
import settingUrl from "./settings";

export function AddMeme() {
  const URL = settingUrl.backendURL();
  const [memeTitle, setMemeTitle] = useState("");
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [template_id, setTemplate_id] = useState("");
  const [nsfw, setNsfw] = useState(false);

  const memeTemplates = [
      {name:"-----Select an option-----", id:""},
      {name:"Chris Pratt - Afraid", id:"afraid"},
      {name:"Buzz lightyear - Everywhere", id:"buzz"},
      {name:"Burning building - Disastergirl", id:"disastergirl"},
      {name:"Aliens everywhere", id:"aag"},
      {name:"I'm the captain", id:"captain"},
      {name:"Joker stare", id:"joker"},
      {name:"Shouldn't have done that - Hagrid", id:"hagrid"},
      {name:"Not sure if- Fry", id:"fry"},
      {name:"I should buy a boat - Cat", id:"boat"},
      {name:"What year is this", id:"whatyear"},
      {name:"One does not simply", id:"mordor"},
  ]

  function PostMeme(memeInput) {
    let input = { picturePath: memeInput, nsfw: nsfw, title: memeTitle };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(input),
    };
    fetch(URL + "/api/meme", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNsfw(false);
      });
  }

  function List(){
    return (
        <ul>
        {
        memeTemplates.map(meme => meme.name).forEach(meme =>{return(<li>{meme}</li>)})
        }
        </ul>
        )
    }

  function submitHandler(event) {
    event.preventDefault();
    let tempTop = modifyString(top);
    let tempBottom = modifyString(bottom);
    PostMeme("https://memegen.link/" + modifyString(template_id) + "/"+ tempTop + "/" + tempBottom +".jpg");
    setMemeTitle("");
    setTop("");
    setBottom("");
    setTemplate_id("");
  }
  function changeHandlerMemeTitle(event) {
    console.log(event.target.value);
    setMemeTitle(event.target.value);
  }

  function changeHandlerTop(event) {
    let str = event.target.value;
    setTop(str);
  }

  function changeHandlerBottom(event) {
    let str = event.target.value;
    setBottom(str);
  }
  function changeHandlerTemplate(event) {
    console.log(event.target.value);
    setTemplate_id(event.target.value);
  }

  function changeHandlerNSFW(event) {
    console.log(event.target.checked);
    setNsfw(event.target.checked);
  }

  function modifyString(str) {
      let result;
      result = str.length > 0 ? 
        str.replace(/ /g,"_")
        .replace(/\?/g, "~q")
        .replace(/%/g, "~p")
        .replace(/#/g, "~h")
        .replace(/\//g, "~s")
        .replace(/"/g, "''")
        .replace(/-/g, "--")
         : "_"
    return result;
  }



  return (
    <div>
      <h1>Create your own meme</h1>
      <hr/>
      <form onSubmit={submitHandler}>
        <div style={{float: "left", paddingLeft: "100px", paddingTop: "10px"}}>
        <input type="text" value={memeTitle} onChange={changeHandlerMemeTitle} placeholder="Title of Meme"  style={{ width: "200px"}}/><br/>    
        <input type="text" value={top} onChange={changeHandlerTop} placeholder="Top Text"  style={{ width: "200px"}}/><br/>
        <input type="text" value={bottom} onChange={changeHandlerBottom} placeholder="Bottom Text"  style={{ width: "200px"}}/><br/>
        <select onChange={changeHandlerTemplate} style={{ width: "200px"}}>
        {memeTemplates.map(meme =>{return(<option value={meme.id}>{meme.name}</option>)})}
        </select>
        <br />
        <input
          type="checkbox"
          id="nsfwCheck"
          style={{ width: "15px", height: "15px" }}
          onChange={changeHandlerNSFW}
          checked={nsfw}
        />
        <label htmlFor="nsfwCheck">NSFW?</label><br/>
        <input type="submit" value="Submit Meme" id="btn"/>
        </div>
        <div style={{float: "left", paddingLeft: "200px"}}>
            <img src={"https://memegen.link/" + modifyString(template_id) + "/Top_Text/Bottom_Text.jpg"} width="50%"/>
        </div>
      </form>
    </div>
  );

}
