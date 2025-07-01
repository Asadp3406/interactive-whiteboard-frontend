import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';

const Whiteboard = ({ whiteboardData, onDraw }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPoint = useRef(null);

    const drawLine = useCallback((start, end, ctx) => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        whiteboardData.forEach((data) => {
            drawLine(data.start, data.end, ctx);
        });
    }, [whiteboardData, drawLine]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;

        const resizeCanvas = () => {
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                whiteboardData.forEach((data) => {
                    drawLine(data.start, data.end, ctx);
                });
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [whiteboardData, drawLine]);

    const getCanvasCoordinates = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, []);

    const startDrawing = useCallback((e) => {
        setIsDrawing(true);
        lastPoint.current = getCanvasCoordinates(e);
    }, [getCanvasCoordinates]);

    const draw = useCallback((e) => {
        if (!isDrawing) return;
        const currentPoint = getCanvasCoordinates(e);
        onDraw({
            start: lastPoint.current,
            end: currentPoint
        });
        lastPoint.current = currentPoint;
    }, [isDrawing, getCanvasCoordinates, onDraw]);

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
        lastPoint.current = null;
    }, []);

    return (
        <Card.Body className="p-0 flex-grow-1 position-relative">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-100 h-100 border"
                style={{ cursor: 'crosshair' }}
            />
        </Card.Body>
    );
};

export default Whiteboard;