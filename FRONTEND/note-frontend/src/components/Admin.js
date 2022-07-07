import React, { useEffect, useState } from "react"; //hooks
import UserForm from "./UserForm";

import UserModal from "./UserModal";
import GetUser from "./GetUser";
import axios from "axios";
import { useNavigate } from "react-router";


function Admin() {
  const [password, setPassword] = useState("")
 const [email, setEmail] = useState("")
 const [user, setUser] = useState([])
 const [viewUser ,setviewUser] = useState("")
 
const navigate = useNavigate();

 useEffect(() => {
    fetchData();
    if(!("userData" in localStorage)){
        navigate("/Login"); 
    }else if(JSON.parse(localStorage.getItem("userData")).accountType!=="admin"){
        navigate("/"); 
    }
  }, []);

  async function fetchData() {
    await axios
      .get(`http://localhost:8070/user/display`)
      .then((result) => {
        setUser(result.data);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <UserForm
        password={password}
        email={email}
        setEmail={setEmail}
        setPassword={setPassword}

        fetchData={fetchData}
        
      /> 
      <div className="container">
        <div className="row justify-content center">
          <div className="col-md-10">
            <h1 className="mb-3">Users</h1>
            {user.length>0 ? user.map((user)=>(<GetUser
             key={user._id} user={user}
             setviewUser={setviewUser}
            
             />)):<p>No Users To Display</p>}
            
          </div>
        </div>
      </div>
      <UserModal 
        viewUser={viewUser}
        
      />
    </>
  );
}

export default Admin;
