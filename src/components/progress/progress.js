import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { NONAME } from 'dns';
// import console = require('console');

export default class ProgCharts extends Component {
    static defaultProps = {
        percentageNum: PropTypes.number,
        allNum: PropTypes.number,
        progressName: PropTypes.string,
        isShowNum: PropTypes.number
    };
    constructor(props) {
        super(props)
    }

    render() {
        let percentageNum = (this.props.percentageNum * 100);
        //这个支持css样式响应式的
        let leftPercentage = (1 - this.props.percentageNum) * (-100);
        //不支持样式响应式,可以写死
        let allNum = this.props.allNum
        let isShow = this.props.isShowNum
        let div1 = null
        if(isShow == 0) {
            div1 = {
                //不支持样式响应式,可以写死
                // width:"450px"
                //这个支持css样式响应式的
                width: '100%',
                height: '45px',
                background: '#F3F7FB',
                position: 'relative',
                margin: '0',
                display: 'none',
                overflow: 'hidden',
                borderRadius: '6px'
            };
        } else {
            div1 = {
                //不支持样式响应式,可以写死
                // width:"450px"
                //这个支持css样式响应式的
                width: '100%',
                height: '45px',
                background: '#F3F7FB',
                position: 'relative',
                margin: '0',
                overflow: 'hidden',
                borderRadius: '6px'
            };
        }

        let div2 = {
            //不支持样式响应式,可以写死
            // width:"450px"
            //这个支持css样式响应式的
            width: "100%",
            height: "45px",
            background: "#C0E1F6",
            position: "absolute",
            borderRadius: '6px',
            //不支持样式响应式,可以写死
            // left:`${leftPercentage}px`,
            //这个支持css样式响应式的
            left: `${leftPercentage}%`,
        };
        let div3 = {
            position: "absolute",
            width: "auto",
            height: "45px",
            left: "15px",
            color: "#5588A8",
            lineHeight: "45px",
            fontSize: "16px",
            borderRadius: '6px'
        };
        let div4 = {
            position: "absolute",
            width: "auto",
            height: "45px",
            right: "15px",
            lineHeight: "45px",
            fontSize: "16px",
            color: "#5588A8",
            borderRadius: '6px'
        };
        return (
            <View style={div1}>
                <View style={div2}></View>
                <View style={div3}>{this.props.progressName}</View>
                <View style={div4}>
                    {allNum},{percentageNum}%
                </View>
            </View>
        )
    }
}