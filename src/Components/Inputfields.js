

const InputField =({ type,placeholder,value,onChange,fieldName})=>{

    return(
        <label>
            {fieldName}
            <input className={"mt-2 flex border-2 border-x-gray-400 rounded-2xl items-center p-2 h-10 w-60 "} 
                type={type} placeholder={placeholder} value={value} onChange={onChange}  />
            </label>
    )
}
export default InputField;