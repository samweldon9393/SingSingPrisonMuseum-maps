
import React, { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableWrapperProps {
  children: React.ReactNode;
  defaultPosition?: Position;
  dragHandle?: string;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  defaultPosition = { x: 100, y: 100 },
  dragHandle = '.popup-header'
}) => {
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const startDrag = (clientX: number, clientY: number, target: EventTarget | null) => {
    // Type guard to ensure target is an Element
    if (!(target instanceof Element)) return;
    
    // Check if the click target matches the drag handle selector
    const dragElement = target.closest(dragHandle);
    if (!dragElement) return;
    
    // Don't drag if clicking on buttons or other interactive elements
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT') return;
    
    // Null check for wrapperRef.current
    if (!wrapperRef.current) return;
    
    setIsDragging(true);
    const rect = wrapperRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startDrag(e.clientX, e.clientY, e.target);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, e.target);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragOffset.x,
      y: touch.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = 'none'; // Prevent text selection
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
