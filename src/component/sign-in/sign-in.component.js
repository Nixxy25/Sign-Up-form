import { 
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
    createUserDocumentFromAuth, 
} from "../../utils/firebase/firebase.component"
import { useState } from "react";
import FormInput from "../../component/form-input/form-input.component";

const defaultForm = {
    email:"",
    password:"",
}
const SignIn = () => {
    const [form, setForm] = useState(defaultForm)
    const {email, password} = form;

    console.log(form);

    const resetForm = () =>{
        setForm(defaultForm);
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    };

    const signInWithGoogle = async () =>{
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };
    
    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            const response = await signInUserWithEmailAndPassword(email, password)
            console.log(response);
            resetForm();
        }catch(error){

        }



    }
    
    return(
        <div>
            <h1>SIGN IN</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
          
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <button type="submit">SignIn</button>
                <button onClick={signInWithGoogle}>Google Sign In</button> 
            </form>
        </div>
    )
}

export default SignIn;