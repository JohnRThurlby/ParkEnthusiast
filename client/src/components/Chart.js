import React, { Component } from "react"

import {Bar} from 'react-chartjs-2';


class Chart extends Component {
    constructor (props){
        super(props)
        this.state = {
          chartData: props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true, 
        displayLegend: false, 
        legendPosition: 'right',
        defaultFontColor: 'rgba(255,255,255,0)'
    }

    render(){

        return(
            <div className="chart">  
                <Bar
                    data={this.state.chartData}
                    options={{
                    title: {
                        display: this.props.displayTitle,
                        text: 'Ratings',
                        fontColor: 'white',
                        fontSize:30
                    },
                    legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition,
                    }
                    }}
                />
             </div>
        )
    }
}

export default Chart