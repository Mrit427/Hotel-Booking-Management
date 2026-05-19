import React from 'react'

const Tittle = ({tittle,subTittle,align,font}) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align === "left" && "md:items-start md:text-left"}`}>
      <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>{tittle}</h1>
    <p>
{subTittle}
    </p>
    </div>
  )
}

export default Tittle
