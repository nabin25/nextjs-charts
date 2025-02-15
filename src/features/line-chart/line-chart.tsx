"use client";
import { useExportImages } from "@/hooks/useExportImages";
import { Button, Card, Flex } from "@radix-ui/themes";
import { IoBookmarksOutline } from "react-icons/io5";
import { GoBookmarkSlash } from "react-icons/go";
import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useMedia from "use-media";
import { TbTrash } from "react-icons/tb";
import {
  deleteLineChart,
  moveToNonPersistant,
  moveToPersistant,
} from "@/lib/line-charts/line-charts-slice";
import { useDispatch } from "react-redux";

export default function LineChartComponent({
  data,
  dataOn,
}: {
  data: any;
  dataOn: "non-persistant" | "persistant";
}) {
  const isSmallScreen = useMedia({ maxWidth: 768 });
  const isMediumScreen = useMedia({ minWidth: 769, maxWidth: 1024 });
  const isLargeScreen = useMedia({ minWidth: 1025 });
  const dispatch = useDispatch();

  const getWidth = () => {
    if (isSmallScreen) return 300;
    if (isMediumScreen) return 500;
    if (isLargeScreen) return 600;
    return 400;
  };

  const getHeight = () => {
    if (isSmallScreen) return 200;
    if (isMediumScreen) return 300;
    if (isLargeScreen) return 400;
    return 300;
  };

  const chartRef = useRef<HTMLDivElement>(null);
  const { handleSaveAsJpeg, handleSaveAsPng } = useExportImages(chartRef);
  return (
    <>
      <Card
        size="5"
        mt="4"
        style={{
          width: `${getWidth() + 20}px`,
          minHeight: `${getHeight() + 130}px`,
        }}
        className="bg-gray-300 shadow-xl dark:bg-[#111] justify-self-center"
      >
        <Flex justify="center" align="center">
          <div>
            <ResponsiveContainer width={getWidth()} height={getHeight()}>
              <LineChart data={data.data} margin={{ top: 20 }}>
                {data.firstFormData.show_cartesian_grid && (
                  <CartesianGrid strokeDasharray="3 3" />
                )}
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.secondFormData.map((singleData: any, index: any) => (
                  <Line
                    type="monotone"
                    key={index}
                    dataKey={singleData.name}
                    stroke={singleData.color || "#8884d8"}
                    activeDot={{ r: 8 }}
                    strokeDasharray={
                      singleData.line_type === "dashed" ? "3 3" : "0"
                    }
                  ></Line>
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              width: "1200px",
              height: "800px",
            }}
          >
            <ResponsiveContainer width={1200} height={800} ref={chartRef}>
              <LineChart data={data.data} margin={{ top: 20 }}>
                {data.firstFormData.show_cartesian_grid && (
                  <CartesianGrid strokeDasharray="3 3" />
                )}
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.secondFormData.map((singleData: any, index: any) => (
                  <Line
                    type="monotone"
                    key={singleData.id}
                    dataKey={singleData.name}
                    stroke={singleData.color || "#8884d8"}
                    activeDot={{ r: 8 }}
                    strokeDasharray={
                      singleData.line_type === "dashed" ? "3 3" : "0"
                    }
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Flex>
        <div className="mt-4 flex gap-4 justify-between flex-wrap">
          <Flex gap="2">
            <Button onClick={handleSaveAsPng}>Save as PNG</Button>
            <Button onClick={handleSaveAsJpeg}>Save as JPEG</Button>
          </Flex>
          <Flex gap="2" justify="end">
            <Button
              color="bronze"
              title="Save for later"
              onClick={
                dataOn === "persistant"
                  ? () => dispatch(moveToNonPersistant(data.id))
                  : () => dispatch(moveToPersistant(data.id))
              }
            >
              {dataOn === "persistant" ? (
                <GoBookmarkSlash
                  className={`transform transition-all duration-300 ease-in-out ${
                    dataOn === "persistant"
                      ? "scale-100 opacity-100 animate-scaleIn"
                      : "scale-0 opacity-0"
                  }`}
                />
              ) : (
                <IoBookmarksOutline
                  className={`transform transition-all duration-300 ease-in-out ${
                    dataOn === "non-persistant"
                      ? "scale-100 opacity-100 animate-scaleIn"
                      : "scale-0 opacity-0"
                  }`}
                />
              )}
            </Button>

            <Button
              color="red"
              title="Delete"
              className="!cursor-pointer"
              onClick={() => {
                dispatch(deleteLineChart(data.id));
              }}
            >
              <TbTrash />
            </Button>
          </Flex>
        </div>
      </Card>
    </>
  );
}
