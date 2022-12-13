import { Pie } from "@ant-design/plots";

export default function PieChart(data){
    const config = {
        appendPadding: 10,
        data:data.data,
        angleField: 'value',
        colorField: 'label',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };
    return(
        <div>
            <Pie {...config} />
        </div>
    )
}