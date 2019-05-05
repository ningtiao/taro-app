import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../components/f2-canvas/f2-canvas";
import { View } from '@tarojs/components';


const F2 = require("@antv/f2");

export default class stackBar extends Component {
    static defaultProps = {
        list: []
    }
    // constructor () {
    //     super()
    //     this.state = {
    //         chartData: []
    //     }
    //     // this.click  = this.click.bind(this)
    //   }
    initChart(canvas) {
        const { list } = this.props
        console.log('123456789')
        const chartData = []
        list.optionList.map((item, index) => {
            list.matrixRowList.map((items, indexLenth) => {
                const params = {
                    State: '',
                    age: '',
                    num: null
                }
                params.State = items.formatTitle 
                params.age = item.formatTitle
                params.num = parseInt(list.dataList[index][indexLenth])
                chartData.push(params)
            })
        })

        console.log(chartData)

        
       if(chartData.length == 0) {
            return false
        }
        F2Canvas.fixF2(F2);
        // const data = [
        //     {State: '矩阵行1', age: '矩阵行1', num: 3},
        //     {State: '矩阵行1', age: '矩阵行2', num: 2},
            
        //     {State: '矩阵行2', age: '矩阵行1', num: 3},
        //     {State: '矩阵行2', age: '矩阵行2', num: 2},
        //   ];
        // const data = [
        //     { State: 'WY', age: '小于5岁', num: 3 },
        //     { State: 'WY', age: '5至13岁', num: 2 },
        //     { State: 'DC', age: '小于5岁', num: 2 },
        //     { State: 'DC', age: '5至13岁', num: 3 },
        //   ];
        const data = chartData
        console.log(data, '2222222222222')
        const chart = new F2.Chart({
            el: canvas,
            padding: [ 45, 'auto', 'auto' ],
            pixelRatio: 2
        });
        chart.source(data, {
            'num': {
                tickCount: 5
            }
        });
        chart.coord({
            transposed: true
        });
        chart.axis('State', {
            line: F2.Global._defaultAxis.line,
            grid: null
        });
        chart.axis('num', {
            line: null,
            grid: F2.Global._defaultAxis.grid,
            label(text, index, total) {
                const textCfg = {
                    text: text
                };
                if (index === 0) {
                    textCfg.textAlign = 'left';
                }
                if (index === total - 1) {
                    textCfg.textAlign = 'right';
                }
                return textCfg;
            }
        });
        chart.tooltip({
            custom: true, // 自定义 tooltip 内容框
            onChange(obj) {
                const legend = chart.get('legendController').legends.top[0];
                const tooltipItems = obj.items;
                const legendItems = legend.items;
                const map = {};
                legendItems.map(item => {
                    map[item.name] = Object.assign({}, item);
                });
                tooltipItems.map(item => {
                    const { name, value } = item;
                    if (map[name]) {
                        map[name].value = (value);
                    }
                });
                legend.setItems(Object.values(map));
            },
            onHide() {
                const legend = chart.get('legendController').legends.top[0];
                legend.setItems(chart.getLegendItems().country);
            }
        });
        chart.interval().position('State*num').color('age').adjust('stack');

        chart.render();
        return chart;
    }


    render() {
        return (
            <View className='full-screen'><F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
        )
    }
}

