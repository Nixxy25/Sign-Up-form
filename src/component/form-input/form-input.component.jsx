
const FormInput = ({label, ...otherProps }) => {
    return(
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input 
                {...otherProps}
            />
        </div>

    )
}

export default FormInput;