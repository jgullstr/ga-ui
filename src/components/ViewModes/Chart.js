import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { connect } from 'react-redux';

const Chart = (props) => {
    // Make data conform to recharts dresscode.
    const chartData = props.data.reduce((result, instanceData, instanceIndex) => {
        if (instanceData !== false) {
            instanceData.map((value, generation) => {
                while (result.length <= generation) {
                    result.push({})
                }
                result[generation][instanceIndex] = {
                    ...value,
                    generation: generation,
                }
            });
        }
        return result;
    }, []);

    const getPoint = (i) => (data) => {
        return data[i].bestSolution.value;
    }

    const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);

    if (chartData.length === 0) {
        return (
            <p>No data available</p>
        );
    }


    return (
        <ResponsiveContainer width={1000} height={1000}>
            <LineChart data={chartData}>
                <XAxis/>
                <YAxis/>
                <Tooltip/>
                <CartesianGrid strokeDasharray="3 3"/>
                {Object.keys(chartData[0]).map((value, index) =>
                    <Line dot={false} type="monotone" key={index} dataKey={getPoint(index)} stroke={randomColor()}/>
                )}            
            </LineChart>
        </ResponsiveContainer>
    );
};

const mapStateToProps = (state) => ({
    instanceConfigurations: state.instanceConfigurations,
    data: state.data,
    generations: state.currentGeneration
});

export default connect(mapStateToProps)(Chart);