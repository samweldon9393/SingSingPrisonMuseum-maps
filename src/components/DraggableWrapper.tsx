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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Type guard to ensure target is an Element
    if (!(e.target instanceof Element)) return;
    
    // Check if the click target matches the drag handle selector
    const dragElement = e.target.closest(dragHandle);
    if (!dragElement) return;
    
    // Don't drag if clicking on buttons or other interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
    
    // Null check for wrapperRef.current
    if (!wrapperRef.current) return;
    
    setIsDragging(true);
    const rect = wrapperRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
