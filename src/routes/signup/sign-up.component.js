import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.component"
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../component/form-input/form-input.component";

const defaultForm = {
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
        <div className="p-6 flex items-center flex-col w-full">
            <h1 className="text-blue-700 text-lg font-bold mb-4">SIGN UP FORM</h1>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    type="text" required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput label="Mobile Number" type="number" required onChange={handleChange} name="phoneNumber" value={phoneNumber}/>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
          
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <button className="bg-blue-500 mr-2 px-4 py-2 rounded focus:outline-none text-white hover:bg-blue-700" type="submit">Submit</button>

                <p className="inline text-gray-700">Click here to 
                <Link className="font-bold text-blue-700 text-sm" to='/sign-in'> SIGN IN</Link></p>
            </form>
        </div>
    )
}

export default LoginForm;