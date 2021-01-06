import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import "./app.scss";

function App() {
  const boxRef = useRef(null);
  const circleRef = useRef(null);
  const [isOverlap, setIsOverlap] = useState(false);

  const onDrag = () => {
    setIsOverlap(checkOverlap());
  };

  const checkOverlap = () => {
    const box = boxRef.current.getBoundingClientRect();
    const circle = circleRef.current.getBoundingClientRect();

    const halfWidthBox = box.width / 2;
    const halfHeightBox = box.height / 2;
    const radius = circle.width / 2;

    const distX = Math.abs(circle.x + radius - box.x - halfWidthBox);
    const distY = Math.abs(circle.y + radius - box.y - halfHeightBox);

    if (distX > halfWidthBox + radius) {
      return false;
    }
    if (distY > halfHeightBox + radius) {
      return false;
    }

    if (distX <= halfWidthBox) {
      return true;
    }
    if (distY <= halfHeightBox) {
      return true;
    }

    const dx = distX - halfWidthBox;
    const dy = distY - halfHeightBox;

    return dx * dx + dy * dy <= radius * radius;
  };

  return (
    <div className="app">
      <Draggable onStart={() => false}>
        <div className="box" ref={boxRef}>
          1
        </div>
      </Draggable>

      <Draggable onDrag={onDrag}>
        <div className={`circle ${isOverlap && "circle-overlap"}`} ref={circleRef}>
          2
        </div>
      </Draggable>
    </div>
  );
}

export default App;
