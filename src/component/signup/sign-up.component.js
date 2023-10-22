import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.component"
import { useState } from "react";

const defaultForm ={
    displayName:"",
    phoneNumber:"",
    email:"",
    password:"",
}
const LoginForm = () => {
    const [form, setForm] = useState(defaultForm)
    const {displayName, phoneNumber, email, password} = form;

    console.log(form);

    const resetForm = () =>{
        setForm(defaultForm);
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName,phoneNumber});
            resetForm();
    
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("email already in use");  
            }else{
                console.log('error', error)
            }    
        }

    }
    
    return(
        <div>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <label>Mobile Number</label>
                <input type="number" required onChange={handleChange} name="phoneNumber" value={phoneNumber}/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}/>
                
                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;