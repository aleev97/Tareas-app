import React, { useRef, useState } from "react";

const NoteCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);

  const startDrawing = () => setDrawing(true);

  const stopDrawing = () => {
    setDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.beginPath(); // Detener el trazo actual
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2"
          />
        </label>
        <label>
          Grosor:
          <input
            type="number"
            value={lineWidth}
            min="1"
            max="10"
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="ml-2 w-16"
          />
        </label>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <svg
            className="w-5 h-5 inline mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Limpiar
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={draw}
        className="border border-gray-300 w-full h-auto"
      ></canvas>
    </div>
  );
};

export default NoteCanvas;