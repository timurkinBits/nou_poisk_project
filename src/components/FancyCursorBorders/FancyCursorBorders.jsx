import { useRef, useEffect } from "react";
import"./FancyCursorBorders.css"

export const FancyCursorBorders = ({ children, className }) => {
  const el = useRef(null)

  useEffect(() => {
    if (!el.current) return;

    let mouseX = 0
    let mouseY = 0

    const elem = el.current;

    // mousedown, mouseup, mousemove, dblclick, click, contextmenu, keydown, keyup..
    window.addEventListener("mousemove", e => {
      mouseX = e.pageX
      mouseY = e.pageY
      elem?.childNodes?.forEach(child => {
        child.style.setProperty("--mouse-x", `${mouseX - child.offsetLeft}px`)
        child.style.setProperty("--mouse-y", `${mouseY - child.offsetTop}px`)
      })
    })

    window.addEventListener("scroll", () => {
      elem?.childNodes?.forEach(child => {
        child.style.setProperty("--mouse-x", `${mouseX - child.offsetLeft}px`)
        child.style.setProperty("--mouse-y", `${mouseY - child.offsetTop}px`)
      })
    })
  }, [el])

  return (
    <div
      ref={el}
      className={`background ${className}`}
    >
        {children}
    </div>
  );
};
