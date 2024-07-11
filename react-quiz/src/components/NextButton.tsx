export default function NextButton({dispatch,answer,index,numOfQuestions}:{dispatch:any,answer:number|null,index:number,numOfQuestions:number}){

    if (answer===null) return null 

    
    const handleClick = () => {
        if (index < numOfQuestions - 1) {
          dispatch({ type: 'nextQuestion' });
        } else {
          dispatch({ type: 'finish' });
        }
      };
    
      return (
        <button className="btn btn-ui" onClick={handleClick}>
          {index < numOfQuestions - 1 ? 'Next' : 'Finish'}
        </button>
      );
}
    
