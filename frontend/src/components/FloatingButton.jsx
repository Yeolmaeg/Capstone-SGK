import React, { useState, useEffect, useRef } from "react";

const FloatingButton = ({ onClick }) => {
  const [position, setPosition] = useState({
    x: window.innerWidth - 100,
    y: window.innerHeight - 100,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false); // 클릭 vs 드래그 구분용

  // 마우스 드래그 시작
  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isDraggingRef.current = false;
    setDragging(true);
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 터치 드래그 시작
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isDraggingRef.current = false;
    setDragging(true);
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const updatePosition = (clientX, clientY) => {
    isDraggingRef.current = true;
    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    newY = Math.max(50, Math.min(newY, window.innerHeight - 100));
    newX = Math.max(0, Math.min(newX, window.innerWidth - 100));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      e.preventDefault();
      updatePosition(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      e.preventDefault(); // 🔥 중요: 스크롤 방지
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  const stopDragging = (e) => {
    setDragging(false);
    // 클릭과 드래그 구분: 드래그 안했으면 클릭 실행
    if (!isDraggingRef.current && onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: false });
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", stopDragging);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [dragging]);

  return (
    <button
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#ffcccc",
        border: "none",
        zIndex: 10000,
        transition: dragging ? "none" : "top 0.1s ease, left 0.1s ease",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      🐾
    </button>
  );
};

export default FloatingButton;