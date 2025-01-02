import React, { useRef, useState, useCallback, useEffect } from "react";

interface TextElement {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  isDragging: boolean;
}

const NoteCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentFontSize, setCurrentFontSize] = useState(20);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const getCanvasContext = useCallback(() => {
    if (canvasRef.current) {
      return canvasRef.current.getContext("2d");
    }
    return null;
  }, []);

  const startDrawing = (x: number, y: number) => {
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (x: number, y: number) => {
    const ctx = getCanvasContext();
    if (!ctx || !drawing) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = erasing ? bgColor : color;
    ctx.globalCompositeOperation = erasing ? "destination-out" : "source-over";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.fillStyle = bgColor;
      if (canvasRef.current) {
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      setTextElements([]);
      setImage(null);
    }
  };

  const saveCanvas = () => {
    const ctx = getCanvasContext();
    if (ctx && canvasRef.current) {
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const addTextElement = () => {
    if (!currentText.trim()) return;
    setTextElements((prev) => [
      ...prev,
      {
        text: currentText,
        x: 50,
        y: 50,
        fontSize: currentFontSize,
        isDragging: false,
      },
    ]);
    setCurrentText("");
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startDrawing(x, y);

    setTextElements((prev) =>
      prev.map((text) => ({
        ...text,
        isDragging:
          x >= text.x &&
          x <= text.x + text.fontSize * text.text.length &&
          y >= text.y - text.fontSize &&
          y <= text.y,
      }))
    );
  };

  const handleMouseUp = () => {
    stopDrawing();
    setTextElements((prev) =>
      prev.map((text) => ({ ...text, isDragging: false }))
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (drawing) {
      draw(x, y);
    } else {
      setTextElements((prev) =>
        prev.map((text) =>
          text.isDragging
            ? {
                ...text,
                x,
                y,
              }
            : text
        )
      );
    }
  };

  const renderTextElements = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    if (canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    if (image) {
      if (canvasRef.current) {
        ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    textElements.forEach((text) => {
      ctx.fillStyle = color;
      ctx.font = `${text.fontSize}px Arial`;
      ctx.fillText(text.text, text.x, text.y);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = URL.createObjectURL(file);
  };

  useEffect(() => {
    renderTextElements();
  }, [textElements, bgColor, image]);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <label>
          Color del trazo:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2"
            disabled={erasing}
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
        <label>
          Color de fondo:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="ml-2"
          />
        </label>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Limpiar
        </button>
        <button
          onClick={saveCanvas}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Guardar
        </button>
        <button
          onClick={() => setErasing(!erasing)}
          className={`px-4 py-2 ${erasing ? "bg-gray-500" : "bg-yellow-500"} text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300`}
        >
          {erasing ? "Dibujar" : "Borrar"}
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Texto a añadir"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
        />
        <label>
          Tamaño de fuente:
          <input
            type="number"
            value={currentFontSize}
            min="10"
            max="100"
            onChange={(e) => setCurrentFontSize(Number(e.target.value))}
            className="ml-2 w-16"
          />
        </label>
        <button
          onClick={addTextElement}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Añadir texto
        </button>
        <label>
          Subir imagen de fondo:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="ml-2"
          />
        </label>
      </div>
      <div className="border-4 border-gray-700 p-2">
        <canvas
          ref={canvasRef}
          width={700}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="border border-gray-300 w-full h-auto"
          style={{ backgroundColor: bgColor }}
        ></canvas>
      </div>
    </div>
  );
};

export default NoteCanvas;