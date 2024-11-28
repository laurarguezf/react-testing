import { useState } from "react"

export const Contador = () => {
    const [ contador, setContador ] = useState(0);

    return (
        <div>
            <p>Contador: {contador}</p>
            <button onClick={() => setContador(contador + 1)}>Incrementar</button>
        </div>
    )
}