import { useLoadingOverlay } from "@/providers/overlay-state-provider";
import { toJpeg, toPng } from "html-to-image";

export const useExportImages = (
  chartRef: React.RefObject<HTMLDivElement | null>
) => {
  const { setOverlay } = useLoadingOverlay();
  const handleSaveAsJpeg = () => {
    setOverlay(true);
    setTimeout(() => {
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
          })
          .finally(() => setOverlay(false));
      } else {
        setOverlay(false);
      }
    }, 5);
  };

  const handleSaveAsPng = () => {
    setOverlay(true);
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
        })
        .finally(() => setOverlay(false));
    } else {
      setOverlay(false);
    }
  };
  return { handleSaveAsJpeg, handleSaveAsPng };
};
