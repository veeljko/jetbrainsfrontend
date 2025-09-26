import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        return (
            <div className="custom-tooltip p-1 bg-gray-100/90 rounded-md shadow-sm">
                <p className="label">{name} - {value}</p>
            </div>
        );
    }
    return null;
};


function Example({ data }) {
    return (
        <div className="w-[100%] h-40 sm:h-52 lg:h-64 border-b-1">
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,

                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis
                        label={{
                            value: "Number of Questions",
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#374151', fontSize: 15, fontWeight: 600},
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Example;
