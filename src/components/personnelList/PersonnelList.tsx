import { Input, Typography, Divider, Select } from '@douyinfe/semi-ui';
import React, { Component } from 'react'
import styles from './PersonnelList.less'
//import { Select } from 'antd'
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
const { Title, Text } = Typography;


export default class PersonnelList extends Component<any, any> {
    state = {
        id: this.props.id,
        z: this.props.z,
        f: this.props.f,
        topic: this.props.topic,
        schedule: this.props.schedule,
        judge1: this.props.judge1,
        judge2: this.props.judge2,
        judge3: this.props.judge3,
        z1: this.props.z1,
        z2: this.props.z2,
        z3: this.props.z3,
        f1: this.props.f1,
        f2: this.props.f2,
        f3: this.props.f3,
        type: this.props.type,//赛段
        check: true, //防误删开关,true为不可修改
        teamZ: [],
        teamF: [],
        url0: '',
        changeId: ''
    }
    //组件挂载获取正反双方的队员
    componentDidMount() {
        var teamZ: { value: any; label: any; }[] = []
        var teamF: { value: any; label: any; }[] = []
        if (this.props.z != null && this.props.z != "") {
            fetch('/api/getmember?team=' + this.props.z.substr(3)).then(
                response => response.json()
            ).then(
                data => {
                   
                    const obj = data.data
                    for (let i in obj) {
                        if (obj[i] != null && obj[i] != '') {
                            teamZ.push({
                                value: obj[i],
                                label: obj[i]
                            })
                        }
                    }
                    this.setState({
                        teamZ: teamZ
                    })
                }
            )

        }

        if (this.props.f != null && this.props.f != "") {
            fetch('/api/getmember?team=' + this.props.f.substr(3)).then(
                response => response.json()
            ).then(
                data => {
                    const obj = data.data
                    for (let i in obj) {
                        if (obj[i] != null && obj[i] != '') {
                            teamF.push({
                                value: obj[i],
                                label: obj[i]
                            })
                        }
                    }
                    this.setState({
                        teamF: teamF
                    })
                }
            )
        }
    }


    //由于onchange不提供target，先从focus获取id值，设置即将递交的内容值
    //antd的样式不如semi，但semi的onFocus不提供target.id，故废弃
    // onFocus = (e: any) => {
    //     this.setState({ changeId: e.target.id })
    // }

    //更新人员名单
    onChange = (e: any) => {
        this.setState({
            [this.state.changeId]: e,
        }, () => {
            var data = {
                id: this.state.id,
                [this.state.changeId]: e
            }
            fetch('/api/changeschedule', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    this.state = data.data[0];
                }

            )
        })
    }

    render() {
        //背景色
        const color = {
            'A': '#E2EEDA',
            'B': '#DEEAF6',
            'C': '#FFF2CB',
            'D': '#FBE4D6',
        }

        return (

            <div className={styles.main}
                style={this.state.schedule.substr(0, 2) === '决赛' ? { backgroundColor: '	#FAFAD2' } :
                    this.state.schedule.substr(0, 2) === '半决' ? { backgroundColor: '#FFF0F5' } :
                        { backgroundColor: color[this.state.schedule.substr(3, 1) as keyof typeof color] }}
            >

                {/*第一行，放场次信息 */}
                <Title heading={4} style={{ margin: '8px 0' }} >{this.state.schedule.replace(/\,/g, '-')}</Title>

                {/*第二行，放辩题信息 */}
                <Title heading={6} style={{ margin: '4px 0' }} >辩题：{this.state.topic}</Title>
                <Divider />

                {/*正反方 */}
                <div className={styles.content}>
                    {/*左侧正 */}
                    <div className={styles.left}>
                        {/*正方 */}
                        <Title heading={6} >正方：{this.state.z}</Title>

                        {/*人员行 */}
                        {/*一辩 */}
                        <div className={styles.Row} >

                            <Text>正方一辩：</Text>
                            <Select placeholder='请选择' id='z1'
                                style={{ width: 120 }}
                                value={this.state.z1}
                                optionList={this.state.teamZ}
                                onChange={(e) => this.onChange(e)}
                                onFocus={() => this.setState({ changeId: 'z1' })}
                            ></Select>
                        </div>

                        {/*二辩 */}
                        <div className={styles.Row}>
                            <Text>正方二辩：</Text>
                            <Select placeholder='请选择' id='z2'
                                style={{ width: 120 }}
                                value={this.state.z2}
                                optionList={this.state.teamZ}
                                onChange={(e) => this.onChange(e)}
                                onFocus={() => this.setState({ changeId: 'z2' })}
                            ></Select>
                        </div>

                        {/*三辩 */}
                        <div className={styles.Row}>
                            <Text>正方三辩：</Text>
                            <Select placeholder='请选择' id='z3'
                                style={{ width: 120 }}
                                value={this.state.z3}
                                optionList={this.state.teamZ}
                                onChange={(e) => this.onChange(e)}
                                onFocus={() => this.setState({ changeId: 'z3' })}
                            ></Select>
                        </div>
                    </div>

                    {/*右侧反 */}
                    <div className={styles.right}>
                        {/*反方 */}
                        <Title heading={6} >反方：{this.state.f}</Title>

                        {/*人员行 */}
                        {/*一辩 */}
                        <div className={styles.Row}>
                            <Text>反方一辩：</Text>
                            <Select placeholder='请选择' id='f1'
                                style={{ width: 120 }}
                                value={this.state.f1}
                                optionList={this.state.teamF}
                                onChange={(e) => this.onChange(e)}
                                onFocus={() => this.setState({ changeId: 'f1' })}
                            ></Select>
                        </div>

                        {/*二辩 */}
                        <div className={styles.Row}>
                            <Text>反方二辩：</Text>
                            <Select placeholder='请选择' id='f2'
                                style={{ width: 120 }}
                                value={this.state.f2}
                                optionList={this.state.teamF}
                                onChange={(e) => this.onChange(e)}
                                onFocus={() => this.setState({ changeId: 'f2' })}
                            ></Select>
                        </div>

                        {/*三辩 */}
                        <div className={styles.Row}>
                            <Text>反方三辩：</Text>
                            <Select placeholder='请选择' id='f3'
                                style={{ width: 120 }}
                                value={this.state.f3}
                                optionList={this.state.teamF}
                                onChange={(e) => this.onChange(e)}
                                onFocus={() =>this.setState({ changeId: 'f3'})}
                            ></Select>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}
