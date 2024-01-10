"use client"

/* import { useEffect } from "react"; */

interface ErrorProps {
    error: Error;
    reset: () =>void
}

export default function Error({error, reset}: ErrorProps){

    /* useEffect(() => {
        //Se recomienda utilizar un software de observabilidad para mandar los errores
        console.log(error)
    }, []) */

    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}>
            <h1> :( </h1>
            <p>Ha ocurrido un error</p>
            <button onClick={reset}>Intentar de nuevo</button>
        </div>        
    )
}