import React, { Component } from 'react'
import styles from './showStatistics.less'
import moment from 'moment';
import { Space, Col, Row, Divider, Typography, Tag } from '@douyinfe/semi-ui';
const { Text, Title, Paragraph } = Typography;
import { getCookie } from '@/utils/auth';
//rights:权限：1为超级管理员，有全部权限，2为项目部成员，不能访问赛事列表和队伍筛选，0为新媒体，只能访问赛果单
//本组件处理的数据太多了，有条件更请改为后端处理数据

export default class ShowStatistics extends Component<any, any> {
    state = {
        id: this.props.id,
        z: this.props.z,
        f: this.props.f,
        topic: this.props.topic,
        time: this.props.time,
        judge1: this.props.judge1,
        j1win: this.props.judge1win,
        j1best: this.props.judge1best,

        judge2: this.props.judge2,
        j2win: this.props.judge2win,
        j2best: this.props.judge2best,

        judge3: this.props.judge3,
        j3win: this.props.judge3win,
        j3best: this.props.judge3best,

        z1: this.props.z1,
        z2: this.props.z2,
        z3: this.props.z3,
        f1: this.props.f1,
        f2: this.props.f2,
        f3: this.props.f3,

        schedule: this.props.schedule,

        rights: getCookie('rights')

    }

    render() {
        //背景色
        const color = {
            'A': '#E2EEDA',
            'B': '#DEEAF6',
            'C': '#FFF2CB',
            'D': '#FBE4D6',
        }

        //佳辩
        const bestDebater = {
            'z1': '正方一辩',
            'z2': '正方二辩',
            'z3': '正方三辩',
            'f1': '反方一辩',
            'f2': '反方二辩',
            'f3': '反方三辩',

        }

        //票型
        var win1 = this.state.j1win === '' ? '尚未进行投票' : this.state.j1win.split('@')
        var win2 = this.state.j2win === '' ? '尚未进行投票' : this.state.j2win.split('@')
        var win3 = this.state.j3win === '' ? '尚未进行投票' : this.state.j3win.split('@')

        //比分及获胜方
        var rate = ''
        var win = ''
        var defeat = ''
        if (this.state.j1win === '' && this.state.j2win === '' && this.state.j3win === '') {
            win = ''
            rate = ''
        } else {
            var win1 = this.state.j1win.split('@')
            var win2 = this.state.j2win.split('@')
            var win3 = this.state.j3win.split('@')
            win1.push(...win2)
            win1.push(...win3)
            function getEleNums(data: any) {
                var count = 0
                for (var i = 0; i < data.length; i++) {
                    if (data[i] === '正') {
                        count = count + 1
                    }
                }
                return count
            }
            var zheng = getEleNums(win1)
            if (win1.length<8){
                rate='投票未完成'
            }else{
                var fan = 9 - zheng
                rate = '正方 ' + zheng + ':' + fan + ' 反方'
                win = zheng > fan ? '正方 ' + this.state.z : '反方 ' + this.state.f
                defeat = zheng < fan ? '正方 ' + this.state.z : '反方 ' + this.state.f
            }
        }

        //时间
        var time = moment(this.state.time).format('M月D日 HH:mm')

        //佳辩
        var best = ''
        if (this.state.j1best === '' || this.state.j2best === '' || this.state.j3best === '') {
            best = ''
        } else if (this.state.j1best === this.state.j2best || this.state.j1best === this.state.j3best) {
            best = this.state[this.state.j1best as keyof typeof bestDebater] === null ? bestDebater[this.state.j1best as keyof typeof bestDebater] : bestDebater[this.state.j1best as keyof typeof bestDebater] + ' ' + this.state[this.state.j1best as keyof typeof bestDebater]
        } else if (this.state.j2best === this.state.j3best) {
            best = this.state[this.state.j2best as keyof typeof bestDebater] === null ? bestDebater[this.state.j2best as keyof typeof bestDebater] : bestDebater[this.state.j2best as keyof typeof bestDebater] + ' ' + this.state[this.state.j2best as keyof typeof bestDebater]
        } else {
            best = '无佳辩'
        }

        //按新媒体复制
        var mediaCopy = time + '\n辩题：' + this.state.topic + '\n\n' + this.state.z + '\n\nVS\n\n' + this.state.f + '\n'
            + '\n比分：' + rate + '\n获胜方：' + win + '\n最佳辩手：' + best

        //按主席稿末段复制
        var hostCopy = '本场的最佳辩手为' + best + '。\n' +
            '内容票：' + this.state.judge1 + '评委投给' + win1[0] + '方；' + this.state.judge2 + '评委投给' + win2[0] + '方；' + this.state.judge3 + '评委投给' + win3[0] + '方；\n' +
            '环节票：' + this.state.judge1 + '评委投给' + win1[1] + '方；' + this.state.judge2 + '评委投给' + win2[1] + '方；' + this.state.judge3 + '评委投给' + win3[1] + '方；\n' +
            '决胜票：' + this.state.judge1 + '评委投给' + win1[2] + '方；' + this.state.judge2 + '评委投给' + win2[2] + '方；' + this.state.judge3 + '评委投给' + win3[2] + '方；\n' +
            '综合评委评票结果，正方比反方为' + rate + '，' + win + '获胜，恭喜。同时也让我们感谢' + defeat + '队的精彩表现。'




        return (
            <div className={styles.main} style={rate === '' ? { display: 'none' } : {}}>

                {/* {rate === '' ? '' : */}
                <div className={styles.content}
                    style={this.state.schedule.substr(0, 2) === '决赛' ? { backgroundColor: '	#FAFAD2' } :
                        this.state.schedule.substr(0, 2) === '半决' ? { backgroundColor: '#FFF0F5' } :
                            { backgroundColor: color[this.state.schedule.substr(3, 1) as keyof typeof color] }}
                >
                    <div className={styles.row}>
                        <Text style={{ fontWeight: 'bold', fontSize: '20px', margin: '4px' }}>
                            {this.state.schedule.replace(/\,/g, '-')}
                        </Text>
                    </div>

                    <div className={styles.row}>
                        <Row>
                            <Col span={24}>
                                {time}
                            </Col>
                        </Row>
                    </div>

                    <div className={styles.row}>
                        <Row>
                            <Col span={24}>
                                辩题：{this.state.topic}
                            </Col>
                        </Row>
                    </div>
                    <Divider />



                    <div className={styles.row}>
                        <div>
                            <Text>正方：</Text>
                            {this.state.z === null ? '' : this.state.z}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            VS
                        </div>
                    </div>


                    <div className={styles.row}>
                        <div>
                            <Text>反方：</Text>{this.state.f === null ? '' : this.state.f}
                        </div>
                    </div>

                    <Divider />
                    <div className={styles.details} style={this.state.rights === '0' ? { display: 'none' } : {}}>
                        {/* 
                            ------------------------------------
                            |   姓名    |   票型    |   佳辩    |
                            ------------------------------------
                            |   评委1   |   票型    |   佳辩    |
                            ------------------------------------
                            |   评委2   |   票型    |   佳辩    |
                            ------------------------------------
                            |   评委3   |   票型    |   佳辩    |
                            ------------------------------------
                            |   总计    |   比分    |   佳辩    |
                            ------------------------------------
                            */}

                        <div className={styles.row}>

                            <Text strong>评委</Text>

                            <Text strong>票型</Text>

                            <Paragraph copyable={{ content: hostCopy }}>
                                <Text strong>佳辩</Text>
                            </Paragraph>

                        </div>

                        {/* 评委1 */}
                        <div className={styles.row}>

                            <div className={styles.name}>
                                <Text type="secondary">{this.state.judge1}</Text>
                            </div>
                            {
                                this.state.j1win === '' ?
                                    <span>
                                        <Tag color='red'>尚未进行投票</Tag>
                                    </span> :
                                    <span>
                                        <div>
                                            <Tag color={win1[0] === '正' ? 'teal' : 'blue'} >
                                                内容票：{win1[0]}
                                            </Tag>
                                        </div>
                                        <div style={{ marginTop: '2px' }}>
                                            <Tag color={win1[1] === '正' ? 'teal' : 'blue'} >
                                                环节票：{win1[1]}
                                            </Tag>
                                        </div>
                                        <div style={{ marginTop: '2px' }}>
                                            <Tag color={win1[2] === '正' ? 'teal' : 'blue'} >
                                                决胜票：{win1[2]}
                                            </Tag>
                                        </div>
                                    </span>

                            }

                            {
                                this.state.j1win === '' ?
                                    <span>
                                        <Tag color='red'>尚未进行投票</Tag>
                                    </span>
                                    :
                                    <div className={styles.bestdebater}>
                                        <Tag color={this.state.j1best.substr(0, 1) === 'z' ? 'teal' : 'blue'} type='ghost'>
                                            {bestDebater[this.state.j1best as keyof typeof bestDebater]}
                                        </Tag>
                                    </div>
                            }
                        </div>
                        <Divider />

                        {/* 评委2 */}
                        <div className={styles.row}>

                            <div className={styles.name}>
                                <Text type="secondary">{this.state.judge2}</Text>
                            </div>

                            {
                                this.state.j2win === '' ?
                                    <span>
                                        <Tag color='red'>尚未进行投票</Tag>
                                    </span> :
                                    <span>
                                        <div>
                                            <Tag color={win2[0] === '正' ? 'teal' : 'blue'} >
                                                内容票：{win2[0]}
                                            </Tag>
                                        </div>
                                        <div style={{ marginTop: '2px' }}>
                                            <Tag color={win2[1] === '正' ? 'teal' : 'blue'} >
                                                环节票：{win2[1]}
                                            </Tag>
                                        </div>
                                        <div style={{ marginTop: '2px' }}>
                                            <Tag color={win2[2] === '正' ? 'teal' : 'blue'} >
                                                决胜票：{win2[2]}
                                            </Tag>
                                        </div>
                                    </span>
                            }
                            {
                                this.state.j2win === '' ?
                                    <span>
                                        <Tag color='red'>尚未进行投票</Tag>
                                    </span> :
                                    <div className={styles.bestdebater}>
                                        <Tag color={this.state.j2best.substr(0, 1) === 'z' ? 'teal' : 'blue'} type='ghost'>
                                            {bestDebater[this.state.j2best as keyof typeof bestDebater]}
                                        </Tag>
                                    </div>
                            }
                        </div>
                        <Divider />

                        {/* 评委3 */}
                        <div className={styles.row}>
                            <div className={styles.name}>
                                <Text type="secondary">{this.state.judge3}</Text>
                            </div>
                            {
                                this.state.j3win === '' ?
                                    <span>
                                        <Tag color='red'>尚未进行投票</Tag>
                                    </span> :
                                    <span>
                                        <div>
                                            <Tag color={win3[0] === '正' ? 'teal' : 'blue'} >
                                                内容票：{win3[0]}
                                            </Tag>
                                        </div>
                                        <div style={{ marginTop: '2px' }}>
                                            <Tag color={win3[1] === '正' ? 'teal' : 'blue'} >
                                                环节票：{win3[1]}
                                            </Tag>
                                        </div>
                                        <div style={{ marginTop: '2px' }}>
                                            <Tag color={win3[2] === '正' ? 'teal' : 'blue'} >
                                                决胜票：{win3[2]}
                                            </Tag>
                                        </div>
                                    </span>
                            }
                            {
                                this.state.j3win === '' ?
                                    <span>
                                        <Tag color='red'>尚未进行投票</Tag>
                                    </span> :
                                    <div className={styles.bestdebater}>
                                        <Tag color={this.state.j3best.substr(0, 1) === 'z' ? 'teal' : 'blue'} type='ghost'>
                                            {bestDebater[this.state.j3best as keyof typeof bestDebater]}
                                        </Tag>
                                    </div>
                            }
                        </div>
                        <Divider />

                    </div>
                    <div className={styles.rowRate}>
                        <div >
                            <Text type='secondary'>
                                比分：
                            </Text>
                            {rate}
                        </div>
                        <Paragraph copyable={{ content: mediaCopy }} style={this.state.rights === '2' ? { display: 'none' } : {}}>
                        </Paragraph>
                    </div>

                    <div className={styles.row}>
                        <div>
                            <Text type='secondary'>
                                获胜方：
                            </Text>
                            {win}
                        </div>

                    </div>


                    <div className={styles.row}>
                        <div>
                            <Text type='secondary'>
                                最佳辩手：
                            </Text>
                            {best}
                        </div>
                    </div>
                </div>
                {/* } */}
            </div>
        )
    }
}
