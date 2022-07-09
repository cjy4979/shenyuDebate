import React, { Component } from 'react'
import styles from './AddTeam.less'
import { Radio, RadioGroup, Select, Toast } from '@douyinfe/semi-ui';


export default class ShowTeam extends Component<any, any> {

    state = {
        selected: Number(this.props.selected),
        type: this.props.type
    }
    Delete = () => {
        var msg = confirm('确认删除吗？')
        if (msg === true) {
            fetch('http://localhost/api/deleteteam?team=' + this.props.team).then(
                response => response.json()
            ).then(
                data => {
                    if (data.status === 0) {
                        Toast.success('删除成功')
                    }
                }
            )
        }
    }

    //更新选择状态
    onChange = (e: any) => {
        this.setState({
            selected: e.target.value
        })
        fetch('http://localhost/api/teamselect?team=' + this.props.team + '&selected=' + e.target.value).then(
            response => response.json()
        ).then(
            data => {
                console.log(data);

                if (data.status === 0) {
                    Toast.success('成功')
                }
            }
        )
    }

    //更新队伍编号
    onCodeChange = (e: any) => {
        fetch('http://localhost/api/teamcode?type=' + e + '&team=' + this.props.team).then(
            response => response.json()
        ).then(
            data => {
                if (data.msg === 'success') {
                    Toast.success('成功！')
                } else if (data.msg === 'failed') {
                    Toast.error('出错了')
                } else {
                    if (confirm(data.data)) { //if语句内部判断确认框
                        fetch('http://localhost/api/teamcodeforce?type=' + e + '&team=' + this.props.team).then(
                            response => response.json()
                        ).then(
                            data => {
                                if (data.msg === 'success') {
                                    Toast.success('更新成功！')
                                } else {
                                    Toast.error('出错了')
                                }
                            }
                        )
                    } else {
                        Toast.warning('请更换编号')
                    }
                }
            }
        )
    }

    //本组件纯展示，不做数据处理
    render() {
        const list = [
            { value: 'A1', label: 'A1' },
            { value: 'A2', label: 'A2' },
            { value: 'A3', label: 'A3' },
            { value: 'A4', label: 'A4' },
            { value: 'A5', label: 'A5' },
            { value: 'A6', label: 'A6' },
            { value: 'A7', label: 'A7' },
            { value: 'A8', label: 'A8' },
            { value: 'B1', label: 'B1' },
            { value: 'B2', label: 'B2' },
            { value: 'B3', label: 'B3' },
            { value: 'B4', label: 'B4' },
            { value: 'B5', label: 'B5' },
            { value: 'B6', label: 'B6' },
            { value: 'B7', label: 'B7' },
            { value: 'B8', label: 'B8' },
            { value: 'C1', label: 'C1' },
            { value: 'C2', label: 'C2' },
            { value: 'C3', label: 'C3' },
            { value: 'C4', label: 'C4' },
            { value: 'C5', label: 'C5' },
            { value: 'C6', label: 'C6' },
            { value: 'C7', label: 'C7' },
            { value: 'C8', label: 'C8' },
            { value: 'D1', label: 'D1' },
            { value: 'D2', label: 'D2' },
            { value: 'D3', label: 'D3' },
            { value: 'D4', label: 'D4' },
            { value: 'D5', label: 'D5' },
            { value: 'D6', label: 'D6' },
            { value: 'D7', label: 'D7' },
            { value: 'D8', label: 'D8' },
        ];

        return (
            <div className={styles.contents}>
                <div>
                    <div className={styles.main}>
                        <h1 className={styles.teamRow}>
                            {this.props.selected === 1 ?
                                <Select placeholder='请选择队伍编号'
                                    style={{ width: 100 }}
                                    value={this.props.type}
                                    optionList={list}
                                    onChange={(e) => this.onCodeChange(e)}
                                >

                                </Select>
                                :
                                ''
                            }
                            <div className={styles.showTeamName}>
                                {this.props.team}
                            </div>
                            <div>
                                <RadioGroup onChange={(e) => this.onChange(e)} defaultValue={this.props.selected} name="demo-radio-group">
                                    <Radio value={0} style={{ display: 'none' }}>未筛选</Radio>
                                    <Radio value={1}>通过</Radio>
                                    <Radio value={2}>拒绝</Radio>
                                    <Radio value={3}>待定</Radio>
                                </RadioGroup>
                            </div>
                            <div className={styles.buttonDiv2} >
                                <button className={styles.button2} onClick={() => this.Delete()}>
                                    删除
                                </button>
                            </div>
                        </h1>

                        <div className={styles.showleaderRow}>
                            <div>
                                领队：
                                {this.props.leader}
                            </div>
                            <div>
                                手机：
                                {this.props.phone}
                            </div>
                            <div>
                                微信：
                                {this.props.wechat}
                            </div>
                            <div>
                                QQ：
                                {this.props.QQ}
                            </div>
                        </div>

                        {/* 成员展示列表 */}
                        <div className={styles.member}>
                            <table>
                                <tbody>
                                    <tr className={styles.tr}>
                                        <th className={styles.name}>

                                        </th>
                                        <th className={styles.name}>
                                            姓名
                                        </th>
                                        <th className={styles.debate}>
                                            辩论履历
                                        </th>
                                        <th className={styles.theme}>
                                            主题履历
                                        </th>
                                    </tr>

                                    {/* 成员1信息 */}
                                    <tr className={styles.tr}>
                                        <td>
                                            成员1
                                        </td>
                                        <td >
                                            <div style={this.props.debate1 === '3-5条' ? { color: 'red' } : { color: '' }}>
                                                {this.props.member1}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.debate1}
                                            </div>
                                        </td>
                                        <td className={styles.theme1}>
                                            <div style={{ width: '90%' }}>
                                                {this.props.theme1}
                                            </div>

                                        </td>

                                    </tr>

                                    {/* 成员2信息 */}
                                    <tr className={styles.tr}>
                                        <td>
                                            成员2
                                        </td>
                                        <td>
                                            {this.props.member2}
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.debate2}
                                            </div>
                                        </td>
                                        <td className={styles.theme1}>
                                            <div style={{ width: '90%' }}>
                                                {this.props.theme2}
                                            </div>
                                        </td>

                                    </tr>

                                    {/* 成员3信息 */}
                                    <tr className={styles.tr}>
                                        <td>
                                            成员3
                                        </td>
                                        <td>
                                            {this.props.member3}
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.debate3}
                                            </div>
                                        </td>
                                        <td className={styles.theme1}>
                                            <div style={{ width: '90%' }}>
                                                {this.props.theme3}
                                            </div>
                                        </td>

                                    </tr>

                                    {/* 成员4信息 */}
                                    {this.props.member4 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员4
                                            </td>
                                            <td>
                                                {this.props.member4}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate4}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.theme4}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员5信息 */}
                                    {this.props.member5 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员5
                                            </td>
                                            <td>
                                                {this.props.member5}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate5}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.theme5}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员6信息 */}
                                    {this.props.member6 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员6
                                            </td>
                                            <td>
                                                {this.props.member6}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate6}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.theme6}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员7信息 */}
                                    {this.props.member7 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员7
                                            </td>
                                            <td>
                                                {this.props.member7}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate7}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.theme7}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员8信息 */}
                                    {this.props.member8 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员8
                                            </td>
                                            <td>
                                                {this.props.member8}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate8}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.theme8}
                                                </div>
                                            </td>

                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>


                        {/* {
                                this.props.topic1 === '' ?
                                    <h1>
                                        无
                                    </h1>
                                    :
                                    <div className={styles.member}>
                                        <table>
                                            <tbody>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        辩题1:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.topic1}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解1:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.explanation1}
                                                        </div>
                                                    </td>
                                                </tr >
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        辩题2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.topic2}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.explanation2}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            } */}

                    </div>
                </div>

            </div>
        )
    }
}
