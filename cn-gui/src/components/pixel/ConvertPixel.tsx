import { ReactElement, useEffect, useRef, useState } from "react";
import { ColourInfo, IColourInfo } from "../../types/colour-info";

import "./ConvertPixel.css";
import { Info } from "./../Info";
import { convertRgbToColour } from "../../commands/colour";
import { clamp } from "../../utils/clamp";

// @NOTE(michael): Some things inspired by: https://codepen.io/chengarda/pen/wRxoyB

const DRAWS_PER_SECOND: number = 1000 / 30;

const CANVAS_WIDTH = 908;
const CANVAS_HEIGHT = 400;

const MIN_ZOOM: number = 0.1;
const MAX_ZOOM: number = 2;
const ZOOM_SENSITIVITY = 0.0005;

export type Translation = {
  x: number,
  y: number,
};

export function step(file: File, canvas: HTMLCanvasElement, scaleChange: number, translation: Translation): void {
  var img = new Image();
  var url = window.URL || window.webkitURL;
  var src = url.createObjectURL(file);

  img.onload = (event: Event) => {
    let ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Set the canvas width/height every frame resets the scale.
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Translate the corner of the shown image to where the mouse is pointing.
    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    // Scale the image to act as a zoom in/out.
    ctx.scale(scaleChange, scaleChange);

    // Translate the corner of the image back to where it was.
    ctx.translate(-CANVAS_WIDTH / 2 + translation.x, -CANVAS_HEIGHT / 2 + translation.y);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#C77979';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, translation.x, translation.y);
  };

  img.src = src;
}

export function ConvertPixel(props: {}): ReactElement<any, any> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaleRef = useRef<number>(1);
  const fileRef = useRef<File | null>(null);
  const translationRef = useRef<Translation>({ x: 0, y: 0 });

  const canvasColour = '#C77979';
  const canvasHeight = CANVAS_HEIGHT;
  const canvasWidth = CANVAS_WIDTH;

  const [colourInfo, setColourInfo] = useState<IColourInfo>(new ColourInfo(
    '#4C4F56',
    'rgb(76, 79, 86)',
    'Abbey',
  ));

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDocumentMouseUp = (event: MouseEvent): void => {
    setIsDragging(false);
  }

  const handlePaste = (event: ClipboardEvent): void => {
    let data = event.clipboardData;
    if (!data) {
      return;
    }

    for (let index in data.items) {
      let item = data.items[index];
      if (item.kind !== 'file' || item.type.indexOf("image") < 0) {
        continue;
      }

      // Reset scale so the new image isn't tiny/huge.
      scaleRef.current = 1;

      // Set the translation back to the origin so the image gets pasted there instead of the middle.
      translationRef.current = {
        x: 0,
        y: 0,
      };

      // Set file last so the file doesn't get changed before the scale/translation.
      fileRef.current = item.getAsFile();
    }
  }

  const handleWheel = (event: WheelEvent): void => {
    event.preventDefault();

    if (!canvasRef.current || !fileRef.current) {
      return;
    }

    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let scaleDelta = event.deltaY * ZOOM_SENSITIVITY;
    let calculatedScale = scaleRef.current + scaleDelta;
    scaleRef.current = clamp(calculatedScale, MIN_ZOOM, MAX_ZOOM);
  }

  useEffect(() => {
    const timerRef = setInterval(() => {
      if (!fileRef.current || !canvasRef.current) {
        return
      }

      step(fileRef.current, canvasRef.current, scaleRef.current, translationRef.current);
    }, DRAWS_PER_SECOND);

    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('paste', handlePaste);
    canvasRef.current?.addEventListener('paste', handlePaste);
    canvasRef.current?.addEventListener('wheel', handleWheel);

    return () => {
      clearInterval(timerRef);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('paste', handlePaste);
      canvasRef.current?.removeEventListener('paste', handlePaste);
      canvasRef.current?.removeEventListener('wheel', handleWheel);
    }
  }, [props]);

  return (
    <div id="ConvertPixel_container">
      <div id="inputs">
        <span>Paste an image into the canvas:</span>

        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: canvasColour,
            height: `${canvasHeight}px`,
            width: `${canvasWidth}px`
          }}
          onMouseDown={(event) => {
            setIsDragging(true);

            if (!canvasRef.current) {
              return;
            }

            let ctx = canvasRef.current.getContext('2d');
            if (!ctx) {
              return;
            }

            let data = ctx.getImageData(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 1, 1);

            convertRgbToColour(data.data[0], data.data[1], data.data[2]).then(colour => {
              if (!colour) {
                return;
              }

              setColourInfo(colour);
            });
          }}
          onMouseMove={(event) => {
            if (!isDragging || !canvasRef.current || !fileRef.current) {
              return;
            }

            let ctx = canvasRef.current.getContext('2d');
            if (!ctx) {
              return;
            }

            console.log(event.movementX, event.movementY, scaleRef.current);

            translationRef.current = {
              x: translationRef.current.x + (event.movementX / (scaleRef.current * 2)),
              y: translationRef.current.y + (event.movementY / (scaleRef.current * 2)),
            };
          }}
          onMouseUp={(event) => {
            setIsDragging(false);
          }}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>

      <div id="result">
        <span id="text">Result:</span>
        <Info colour={colourInfo} />
      </div>
    </div>
  );
}
