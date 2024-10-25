import React from 'react'

const Btn = ({
  funCtion,buttonName
})=>{
  return(
    <button type="submit" className={`w-20 flex border-4  bg-cyan-800 text-white rounded-full justify-center cursor-pointer 
                      items-center mx-1 mt-3  text-2xl`} onClick={funCtion}>
      {buttonName}
    </button>
  );
}



export default Btn;