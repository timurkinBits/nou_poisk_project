import { useRef, useEffect } from "react";
import"./FancyCursorBorders.css"

export const FancyCursorBorders = ({ people }) => {
  const el = useRef(null)

  useEffect(() => {
    if (!el.current) return;

    let mouseX = 0
    let mouseY = 0

    const elem = el.current;

    // mousedown, mouseup, mousemove, dblclick, click, contextmenu, keydown, keyup..
    elem.addEventListener("mousemove", e => {
      mouseX = e.pageX
      mouseY = e.pageY
      elem?.personNodes?.forEach(person => {
        person.style.setProperty("--mouse-x", `${mouseX - person.offsetLeft}px`)
        person.style.setProperty("--mouse-y", `${mouseY - person.offsetTop}px`)
      })
    })

    window.addEventListener("scroll", () => {
      elem?.personNodes?.forEach(person => {
        person.style.setProperty("--mouse-x", `${mouseX - person.offsetLeft}px`)
        person.style.setProperty("--mouse-y", `${mouseY - person.offsetTop}px`)
      })
    })
  }, [el])

  return (
    <div
      ref={el}
      className={`background`}
    >
        {people}
    </div>
  );
};
