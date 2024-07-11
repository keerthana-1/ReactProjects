import { ReactNode } from "react";
import { JsxElement } from "typescript";

export default function Footer({children}:{children:ReactNode}){
    return(
        <footer>
            {children}
        </footer>
    )
}