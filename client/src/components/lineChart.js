import { Line } from "@ant-design/plots";

export default function LineChart(data) {
  
  const config = {
    data: data.data,
    padding: "auto",
    xField: "label",
    yField: "value",
    xAxis: {
      tickCount: 5,
    },
  };
  return (
    <div>
      <Line {...config} />
    </div>
  );
}
