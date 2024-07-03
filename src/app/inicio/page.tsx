"use client";

import { useEffect, useRef, useState } from "react";
import { useStoreGame } from "../store/store";
import confetti from 'canvas-confetti'
import Image from "next/image";

function Inicio() {
  const { name } = useStoreGame();
  const nombre = name.toLowerCase();

  const [showButton, setShowButton] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [images, setImages] = useState(false)
  const [eraseProgress, setEraseProgress] = useState(0); // Estado para controlar el progreso de borrado

  useEffect(() => {
    const titleText = `Hola ${nombre}. En este juego vas a tener que raspar rápido con tu dedo el recuadro para descubrir qué hay detrás. ¿Estás listo/a?`;
    let index = 0;

    const intervalId = setInterval(() => {
      setShowTitle(titleText.substring(0, index + 1));
      index++;

      if (index === titleText.length) {
        clearInterval(intervalId);
        setShowButton(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [nombre]);

  function handleClick() {
    setShowInput(true);
    setShowButton(false);
  }

  useEffect(() => {
    if (showInput) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#C0C0C0"; // Color de la capa
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startDrawing = (e: MouseEvent | TouchEvent) => {
        isDrawing.current = true;
        draw(e);
      };

      const stopDrawing = () => {
        isDrawing.current = false;
      };

      const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing.current) return;

        const rect = canvas.getBoundingClientRect();
        const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
        const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 10; // Grosor del trazo para el borrado (ajusta según necesites)
        ctx.lineCap = "round";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        updateEraseProgress(); // Actualizar el progreso de borrado después de cada trazo
      };

      const updateEraseProgress = () => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const totalPixels = canvas.width * canvas.height;
        let erasedPixels = 0;

        for (let i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i + 3] === 0) {
            erasedPixels++;
          }
        }

        const progress = (erasedPixels / totalPixels) * 100;
        setEraseProgress(progress);

        if (progress >= 40) {
          confetti();
          setImages(true) // Lanzar confetti cuando se borra el 40% y se revela la palabra "TÍA"
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        draw(e);
      };

      const handleTouchMove = (e: TouchEvent) => {
        draw(e);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mousedown", startDrawing);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", stopDrawing);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mousedown", startDrawing);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", stopDrawing);
      };
    }
  }, [showInput, showTitle]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {!showInput && (
        <h1 className="text-3xl text-red-700 px-8 text-center">{showTitle}</h1>
      )}

      {showButton && (
        <button
          type="button"
          className="border rounded-2xl bg-[#FF8087] px-6 py-2 mt-[10px] flex items-center gap-2"
          onClick={handleClick}
        >
          Jugar <i className="fi fi-sr-right"></i>{" "}
        </button>
      )}

      {showInput && (
        <div className="shadow-custom w-[80%] h-[350px] flex flex-col m-auto justify-center items-center rounded-lg relative">
          <p className="text-[45px] font-bold select-none">¡Felicidades! </p>
          <p className="text-[45px] font-bold text-center select-none">vas a ser </p>
          <p className="text-[55px] font-bold text-center select-none">TÍA</p>
          <canvas
            ref={canvasRef}
            className="canvas"
            width={window.innerWidth}  // Ajusta el tamaño del canvas según necesites
            height={300}  // Ajusta el tamaño del canvas según necesites
          ></canvas>
        </div>
      )}
      <div>
        {images && (
          <Image src='/image/bebe.png' alt="imagen bb" width={200} height={200}/>
        )}
      </div>
    </main>
  );
}

export default Inicio;