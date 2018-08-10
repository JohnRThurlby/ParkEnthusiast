import React, { Component } from "react"

import {Bar} from 'react-chartjs-2';

class Waitchart extends Component {
    constructor (props){
        super(props)
        this.state = {
          waitData: props.waitData
        }
    }

    static defaultProps = {
        displayTitle: true, 
        displayLegend: false, 
        legendPosition: 'right',
        fontColor: 'white',
        defaultColor: 'rgba(255,255,255,0.5)'
    }

    render(){

        return(
            <div className="chart">  
                <Bar
                    data={this.state.waitData}
                    options={{
                    title: {
                        display: this.props.displayTitle,
                        text: 'Wait Times',
                        fontColor: 'white',
                        fontSize:30
                    },
                    legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                    },
                    yAxes: [{
                        gridLines: {
                           display: true,
                           color: "rgba(255,99,132,0.2)"
                        }
                     }]
                    }}
                />
             </div>
        )
    }
}

export default Waitchart