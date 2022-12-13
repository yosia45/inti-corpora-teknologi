import { Bar } from "@ant-design/plots";

export default function BarChart(data){
    const config = {
        data: data.data,
        xField: "value",
        yField: "label",
        seriesField: "label",
        legend: {
          position: "top-left",
        },
      };
    return(
        <div>
            <Bar {...config} />
        </div>
    )
}