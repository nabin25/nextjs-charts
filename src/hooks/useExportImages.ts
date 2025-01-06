import { toJpeg, toPng } from "html-to-image";

export const useExportImages = (
  chartRef: React.RefObject<HTMLDivElement | null>
) => {
  const handleSaveAsJpeg = () => {
    if (chartRef.current) {
      toJpeg(chartRef.current, { quality: 1, backgroundColor: "white" })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "chart.jpeg";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to save chart as JPEG", err);
        });
    }
  };

  const handleSaveAsPng = () => {
    if (chartRef.current) {
      toPng(chartRef.current, { quality: 2, backgroundColor: "transparent" })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "chart.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to save chart as PNG", err);
        });
    }
  };
  return { handleSaveAsJpeg, handleSaveAsPng };
};
