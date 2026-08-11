"use client"

import { useState } from "react"

export default function() {
    const [counter, setCounter] = useState(0)
    return <div>
        <p>Hello {counter}!</p>
        <button onClick={() => setCounter(counter+1)}>
            More
        </button>
    </div>
}