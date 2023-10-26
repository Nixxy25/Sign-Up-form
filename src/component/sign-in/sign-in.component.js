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
        <div className="p-6 flex items-center flex-col">
            <h1 className="text-blue-700 text-lg font-bold mb-4">SIGN IN</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
          
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <button className="bg-blue-500 mr-6 px-4 py-2 rounded focus:outline-none text-white hover:bg-blue-700" type="submit">SignIn</button>
                <button className="bg-green-500 px-4 py-2 rounded focus:outline-none text-white hover:bg-green-700" onClick={signInWithGoogle}>Google Sign In</button> 
            </form>
        </div>
    )
}

export default SignIn;