import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import settingUrl from "./settings";

export function UserSettings(){
const temp = {oldPassword:"",password1:"",password2:""};
const[passwords, setPasswords] = useState(temp);   
const[error,setError] = useState();
 
function handleChangePw(event) {
    let field = event.target.id;
    setPasswords({...passwords,[field]:event.target.value});
}

function submitPassword(){
let user = { password: passwords.oldPassword, newPassword: passwords.password1 }
    const URL = settingUrl.changePassword();
    let options = {
        method: "PUT",
        headers: {
             "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(),
          };
          fetch(URL, options)
            .then((res) => res.json())
            .then((data) => {
              console.log("DATA:");
              console.log(data);
              if (data.error) {
                setError(data.error);
              } else {
                setError();
                
              }
            });
            
         
        
        
    


}

function handleSubmit(event){
event.preventDefault();
let p1 = passwords.password1;
let p2 = passwords.password2;

p1!==p2 ? setError("Passwords do not match") : submitPassword();
  
  
    setPasswords(temp)
    


}



const [userList, setUserList] = useState([]);
const [editingUser, setEditingUser] = useState({});


const URL = "/api/joke/ownjokes";


useEffect(() => {
  !editingUser.id && fetchUsers();
}, [editingUser]);


function fetchUsers() {
  facade.fetchUserData(URL, setUserList);
}

const editUser = (id) => {
  let user = userList.filter((user) => user.id === id)[0];
  setEditingUser(user);
 
};

    return(
     <div>
         {console.log(passwords)}
        <h1>Hello UserSettings</h1>
        <br/><hr/>
        <h3>Change Password</h3>

        <input id="oldPassword" placeholder="Enter Current Password" value={passwords.oldPassword} type="password"  onChange = {handleChangePw} />
        <br/><br/>
        <input id="password1" placeholder="Enter new password" value={passwords.password1} type="password"  onChange = {handleChangePw} /> 
        <br/><br/>
        <input id="password2" placeholder="Verify new password" value={passwords.password2} type="password"  onChange = {handleChangePw} /> 
        <br/><br/>
        {error &&(
            <>
            <p>{error}</p>
            <br/><br/>
            </>
        )}

        <button onClick={handleSubmit}>Submit Changes</button>
    
    
     </div>
 )
}