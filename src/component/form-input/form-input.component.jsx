
const FormInput = ({label, ...otherProps }) => {
    return(
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">{label}</label>
            <input className="w-full shadow apperance-none border rounded py-1 px-2 focus:outline-none"
                {...otherProps}
            />
        </div>

    )
}

export default FormInput;