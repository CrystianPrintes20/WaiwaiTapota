import { useState } from "react";

export function useWordTable() {
    const [word,setWord] = useState("");
    return [word,setWord]
}
