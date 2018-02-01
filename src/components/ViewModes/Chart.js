import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux';


function* getColor() {
    let i = 0;
    const colors = [
        '#e6194b',
        '#3cb44b',
        '#ffe119',
        '#0082c8',
        '#f58231',
        '#911eb4',
        '#46f0f0',
        '#f032e6',
        '#d2f53c',
        '#fabebe',
        '#008080',
        '#e6beff',
        '#aa6e28',
        '#fffac8',
        '#800000',
        '#aaffc3',
        '#808000',
        '#ffd8b1',
        '#000080',
        '#80808'
    ];
    while (true) {
        console.log(colors[i % colors.length])
        yield colors[i++ % colors.length];
    }
} 

const addPoints = (a,b) => {
    return {
        averageFitness: a.averageFitness + b.averageFitness,
        bestSolution: {
            args: a.bestSolution.args.map(() => 'n/a'),
            binary: 'n/a',
            fitness: a.bestSolution.fitness + b.bestSolution.fitness,
            value: a.bestSolution.value + b.bestSolution.value,
        },
        worstSolution: {
            args: a.worstSolution.args.map(() => 'n/a'),
            binary: 'n/a',
            fitness: a.worstSolution.fitness + b.worstSolution.fitness,
            value: a.worstSolution.value + b.worstSolution.value,
        },
        executionTime: a.executionTime + b.executionTime
    }
};

const divPoint = (divisor) => (point) => {
    return {
        averageFitness: point.averageFitness / divisor,
        bestSolution: {
            args: point.bestSolution.args,
            binary: point.bestSolution.binary,
            fitness: point.bestSolution.fitness / divisor,
            value: point.bestSolution.value / divisor
        },
        worstSolution: {
            args: point.worstSolution.args,
            binary: point.worstSolution.binary,
            fitness: point.worstSolution.fitness / divisor,
            value: point.worstSolution.value / divisor
        },
        executionTime: point.executionTime
    }
}


const Chart = (props) => {
    // Make data conform to recharts dresscode.
    const roundsData = props.data.map(roundData => {
        return roundData.reduce((result, instanceData, instanceIndex) => {
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
    });

    let chartData = roundsData[0];

    if (!chartData || chartData.length === 0) {
        return (
            <p>No data available</p>
        );
    }

    // Sum rounds.
    for (let i = 1; i < roundsData.length; i++) {
        const roundData = roundsData[i];
        chartData = chartData.map((rows, instance) => {
            return Object.keys(rows).reduce(
                (result, generation) => {
                    return { 
                      ...result,
                      [generation]: addPoints(rows[generation], roundData[instance][generation])
                    }
                }
            , {});
        });
    }

    // Divide result.
    const divide = divPoint(roundsData.length);
    chartData = chartData.map((rows, instance) => {
        return Object.keys(rows).reduce(
            (result, generation) => {
                return { 
                  ...result,
                  [generation]: divide(rows[generation])
                }
            }
        , {});
    });

    const getPoint = (i) => (data) => {
        return data[i][props.chartKey].value;
    }

    const tooltipFormatter = (value, name, entry, i) => {
        const keys = Object.keys(entry.payload);
        const result = entry.payload[keys[i]];
        //  (average fitness: ${result.averageFitness})
        return `#${i}: f(${result.bestSolution.args.join(',')}) = ${value}`;
    };

    const colorizer = getColor();
    return (
        <div className="container">
            <ResponsiveContainer width="100%" height={600}>
                <LineChart data={chartData}>
                    <XAxis/>
                    <YAxis/>
                    <Tooltip formatter={tooltipFormatter}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    {Object.keys(chartData[0]).map((index) =>
                        <Line dot={false} type="monotone" key={index} dataKey={getPoint(index)} stroke={colorizer.next().value}/>
                    )}            
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const mapStateToProps = (state) => ({
    instanceConfigurations: state.instanceConfigurations,
    data: state.data,
    generations: state.currentGeneration,
    chartKey: state.ui.chartKey
});

export default connect(mapStateToProps)(Chart);