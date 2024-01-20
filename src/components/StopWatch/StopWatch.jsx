import './StopWatch.css'


const StopWatch = ({ time }) => {

    if (!time) return null

    // console.log("time",time)

    const displayTime = (seconds) => {
        console.log("seconds",seconds)
        const mins = Math.floor(seconds/60);
        const secs = seconds - (mins * 60);
        return `${mins}:${secs}`
    }

    // console.log("{displayTime(time)}",displayTime(time))

    return (
        <div className="stopWatch-container">
            {displayTime(time)}
        </div>
    )

}

export default StopWatch