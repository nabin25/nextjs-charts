"use client";
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

export default function LineChartComponent({ data }: { data: any }) {
  return (
    <>
      <ResponsiveContainer width={"40%"} height={400}>
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
            ></Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
