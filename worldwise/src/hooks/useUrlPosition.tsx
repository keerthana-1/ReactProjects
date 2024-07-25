import { useSearchParams } from "react-router-dom";

function useUrlPosition(){
    const [searchParams]=useSearchParams();
    const maplat=Number(searchParams.get("lat"));
    const maplng=Number(searchParams.get("lng"));
    return [maplat,maplng];
}

export default useUrlPosition;