import React, { useState } from 'react'
import axios from 'axios'
import{ToastContainer , toast} from "react-toastify"

const Register = () => {

// const[firstname , setFirstname] = useState("");
const[name , setName] = useState("");
// const[lastname , setLastname] = useState("");
const[email , setEmail] = useState("");
const[ password , setPassword ] = useState("");
// const[address , setAddres] = useState("");
// const[zipcode,setZipcode] = useState("");
// const[mobile , setMobile] = useState("");
// const[cpassword,setCpassword] = useState("");
const[message , setMessage] = useState("");



const handelSubmit = async(e) =>{
    e.preventDefault();
    let formdata = new FormData();


    formdata.append("name" ,name);
    // formdata.append("user_lastname" , lastname);
    formdata.append("email",email)
    formdata.append("password" , password)
    // formdata.append("user_confirm_password",cpassword);
    // formdata.append("mobile_no",mobile);
    // formdata.append("address",address);
    // formdata.append("pincode",zipcode)
    console.log([...formdata]);


try{
    const response = await axios.post('http://localhost:2222/api/user/signup',formdata,{
        Headers:{
            "Content-Type":"multipart/form-data",
        },
    })
    console.log('form data succsessfully',response);
    if(response.status == 200) {
        setEmail("");
        setName("");
        // setFirstname("");
        // setLastname("");
        // setCpassword("");
        // setMobile("");
        setPassword("");
        // setZipcode("");
        const message= JSON.parse(JSON.stringify(response.data.message))
        toast.success(message,{
            position:"top-center",
            autoClose:3000
        })
    }
    console.log(response); 
}
catch(err){
    console.log(err);
    const message= JSON.parse(JSON.stringify(err.response.data.message))
    toast.error(message,{
        position:'top-center',
        autoClose:3000
    })
}
}

  return (
    <>
    <div>
            <h1> Register Page</h1>
            <form onSubmit={handelSubmit} id='form'>
                <ToastContainer/>
                <div>
                    <div>
                        <label htmlFor=""> FristName</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} name='firstname' />
                    </div>
                    {/* <div>
                        <label htmlFor="">LastName</label>
                        <input type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} name='lastname'  />
                    </div> */}
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} name='email'  />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} name='password' />
                    </div>
                    {/* <div>
                        <label htmlFor="">ConfirmePassword</label>
                        <input type="text" onChange={(e) => setCpassword(e.target.value)} value={cpassword} name='cpassword' />
                    </div> */}
                    {/* <div>
                        <label htmlFor="">Mobile</label>
                        <input type="text" onChange={(e) => setMobile(e.target.value)} value={mobile}  name='mobile' />
                    </div>
                    <div>
                        <label htmlFor="">ZipCode</label>
                        <input type="text" onChange={(e) => setZipcode(e.target.value)} value={zipcode} name='zipcode' />
                    </div>
                    <div>
                        <label htmlFor="" >Address</label>
                        <input type="text" onChange={(e) => setAddres(e.target.value)} value={address} name='address' />
                    </div> */}
                </div>
                <button type='submit'>Submit</button>
                <div className='message'>{message ? <p> message </p>: null}</div>
            </form>
    </div>
    </>
  )
}

export default Register
