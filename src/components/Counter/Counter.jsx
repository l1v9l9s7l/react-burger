import React, { useState } from "react";


export function Counter() {

  const [value, setValue] = useState('Текст')

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <h1>{value}</h1>
    </>
  )
}