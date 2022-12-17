import { useState } from "react";

export function useModalDicionario() {
    const [modal, setModal] = useState(false);
    return [modal, setModal]
}
