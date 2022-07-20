import React, { Component } from 'react'
import styles from './Mobile.less'
import { Tag, Divider } from 'antd';

export default class MItem extends Component<any,any> {
    render() {
        const id = this.props.id
        let win = this.props.win
        var winText = ''
        var winColor = ''
        var final = []
        if (win.length === 1) {
            winColor = win === '正' ? 'green' : 'geekblue';
            winText = win === '正' ? '正方' : '反方';
        } else {
            final = win.split('@')
        }

        //处理佳辩

        const bestdebater = [
            '无佳辩',
            '正方一辩',
            '正方二辩',
            '正方三辩',
            '反方一辩',
            '反方二辩',
            '反方三辩',
        ]
        var arr = []
        var bestText = ''
        var bestColor = ''
        var FinalText = ''
        if (this.props.debater.length > 3) {
            arr = this.props.debater.split('@').map(Number)
            arr.unshift(0);
            let best = arr.indexOf(Math.max.apply(Math, arr))//判断最大值
            //如果评委分票三个人，max默认返回第一个，故需继续判断
            var count = 0;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === 1) {
                    count = count + 1;
                }
                //计数，有几个1，有3个代表没有佳辩
            }
            bestText = count === 3 ? bestdebater[0] : bestdebater[best];
            bestColor = count === 3 ? 'magenta' : best > 3 ? 'green' : 'geekblue';
        } else if (this.props.debater === '弃票') {
            bestText = '弃票'
            bestColor = 'red'
        } else {
            bestColor = this.props.debater.substr(0, 1) === 'z' ? 'green' : 'geekblue';
            FinalText = '请综合三位评委票型';
            bestText = bestdebater[this.props.debater.substr(1, 1)];
        }






        //赛程处理
        const sche = {
            '04-08': { 'T': '第一轮模辩', 'C': '#237804' },
            '04-09': { 'T': '第一轮正赛', 'C': '#006d75' },
            '04-15': { 'T': '第二轮模辩', 'C': '#adc6ff' },
            '04-16': { 'T': '第二轮正赛', 'C': '#adc6ff' },
            '04-22': { 'T': '第三轮模辩', 'C': 'magenta' },
            '04-23': { 'T': '第三轮正赛', 'C': 'purple' },
            '04-30': { 'T': '决赛', 'C': 'gold' },
            '04-29': { 'T': '决赛', 'C': 'gold' },
            '05-01': { 'T': '决赛', 'C': 'gold' },
            '04-13': {'T': '决赛', 'C': 'gold'}
        }

        const date = this.props.time.substr(5, 5)


        return (
            <div className={styles.table}>
                <Divider style={{ visibility: 'hidden' }} />
                <div className={styles.line1}>
                    <div className={styles.cell} >
                        {this.props.name}
                    </div>
                    <div className={styles.cell} >
                        {this.props.time.substr(5, 11)}
                    </div>
                </div>
                <Divider />
                <div className={styles.line2}>
                    <div className={styles.cell} >
                        <Tag color={sche.[date].['C']}>{sche.[date].['T']}</Tag>
                    </div>
                    <div className={styles.cell} style={win.length === 1 ? { display: 'block' } : { display: 'none' }}>
                        <Tag color={winColor}>{winText}</Tag>
                    </div>
                    <div className={styles.cell} style={win.length === 1 ? { display: 'none' } : { display: 'block' }}>
                        <span>
                            <div>
                                <Tag color={final[0] === '正' ? 'green' : 'geekblue'} >
                                    内容票：{final[0]}
                                </Tag>
                            </div>
                            <div style={{ marginTop: '4px' }}>
                                <Tag color={final[1] === '正' ? 'green' : 'geekblue'} >
                                    环节票：{final[1]}
                                </Tag>
                            </div>
                            <div style={{ marginTop: '4px' }}>
                                <Tag color={final[2] === '正' ? 'green' : 'geekblue'} >
                                    决胜票：{final[2]}
                                </Tag>
                            </div>
                        </span>
                    </div>
                </div>
                <Divider />
                <div className={styles.line2}>

                        <div style={this.props.debater === '弃票' ? { display: "none" } : FinalText==='' ? {display:'flex'}: { display: "none" }} className={styles.bestdebater}>
                            <div style={arr[1] === 0 ? { display: "none" } : {  color: '#00b483'}} >
                                {bestdebater[1] + "：" + arr[1]}
                            </div>
                            <div style={arr[2] === 0 ? { display: "none" } : {  color: '#00b483'}}>
                                {bestdebater[2] + "：" + arr[2]}
                            </div>
                            <div style={arr[3] === 0 ? { display: "none" } : {  color: '#00b483' }}>
                                {bestdebater[3] + "：" + arr[3]}
                            </div>
                            <div style={arr[4] === 0 ? { display: "none" } : {  color: '#7991d1' }}>
                                {bestdebater[4] + "：" + arr[4]}
                            </div>
                            <div style={arr[5] === 0 ? { display: "none" } : {  color: '#7991d1' }}>
                                {bestdebater[5] + "：" + arr[5]}
                            </div>
                            <div style={arr[6] === 0 ? { display: "none" } : {  color: '#7991d1'}}>
                                {bestdebater[6] + "：" + arr[6]}
                            </div>
                        </div>
                        <div className={styles.bestdebater} style={this.props.debater === '弃票' ? {  color: "red", fontWeight: "bold"} : { display: "none" }}>
                            弃票
                        </div>
                    <div className={styles.best} style={FinalText==='' ? {display:'none'}:{}}>
                        <Tag color={bestColor} >{bestText}</Tag>
                    </div>

                    <div className={styles.best} >
                        <Tag color={bestColor} style={FinalText==='' ? {}:{display:'none'}}>{bestText}</Tag>
                        <div style={FinalText==='' ? {display:'none'}:{}}>{FinalText}</div>
                    </div>
                </div>

                <Divider />
            </div>
        )
    }
}
