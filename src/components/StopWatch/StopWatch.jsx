import { useEffect, useRef } from "react"


const StopWatch = () => {

    const timeRef = useRef(null);


    // inizialize the time ref
    useEffect(()=>{
        if (!timeRef){
            timeRef.current = 0;
        } else {
            setInterval(()=>{
                timeRef.current += 1;
            },1000)
        }

        return timeRef.current = null;
    },[])

    return (
        <div>

            {
                typeof(timeRef.current) === "number" && 
                <div className="stopWatch-container">
                    {timeRef.current}
                </div>
            }

        </div>
    )

}

export default StopWatch