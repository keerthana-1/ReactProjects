import { ReactElement, ReactNode } from "react";
import { JsxElement } from "typescript";

function Main({children}:{children:ReactNode}) {
    
    return (
        <main className="main">
           {children}
        </main>
    );
    
}


export default Main;