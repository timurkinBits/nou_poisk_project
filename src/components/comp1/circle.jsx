import { useEffect, useState } from "react"
import "./Circle.css"

export const Circle = ({})  => {
    const [pos, setpos] = useState([0, 0])
    const searchpos = (e) => {setpos([e.clientX, e.clientY])}
    useEffect(() => {window.onmousemove=searchpos})
    return (
    <div className="cursor-follower" style={{top:`${pos[1]}px`, left:`${pos[0]}px`}}>
    </div>
    )
}

