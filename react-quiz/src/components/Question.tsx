import Option from './Option';
import {Ques} from './App';


function Question({question,dispatch,answer}:{question:Ques,dispatch:any,answer:number|null}){
    return(
        <div>
            <h4>{question.question}</h4>

            <Option question={question} dispatch={dispatch} answer={answer}></Option>
           
        </div>
    )
}

export default Question;