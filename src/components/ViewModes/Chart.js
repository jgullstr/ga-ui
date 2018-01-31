import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { connect } from 'react-redux';

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

    const addPoints = (a,b) => {
        return {
            averageFitness: a.averageFitness + b.averageFitness,
            bestSolution: {
                args: a.bestSolution.args.map(() => 'n/a'),
                binary: 'n/a',
                fitness: a.bestSolution.fitness + b.bestSolution.fitness,
                value: a.bestSolution.value + b.bestSolution.value,
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
            executionTime: point.executionTime
        }
    }

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
        return data[i].bestSolution.value;
    }

    const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);


    const tooltipFormatter = (value, name, entry, i) => {
        const keys = Object.keys(entry.payload);
        const result = entry.payload[keys[i]];
        //  (average fitness: ${result.averageFitness})
        return `#${i}: f(${result.bestSolution.args.join(',')}) = ${value}`;
    };

    return (
        <ResponsiveContainer width={1000} height={600}>
            <LineChart data={chartData}>
                <XAxis/>
                <YAxis/>
                <Tooltip formatter={tooltipFormatter}/>
                <CartesianGrid strokeDasharray="3 3"/>
                {Object.keys(chartData[0]).map((index) =>
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