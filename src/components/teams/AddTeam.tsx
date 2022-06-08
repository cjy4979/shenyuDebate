import React, { Component, useCallback, useEffect, useState } from 'react'
import styles from './AddTeam.less'
import { Upload, DatePicker, Button, Switch, Input, Toast } from '@douyinfe/semi-ui';
import * as XLSX from 'xlsx';



export default class AddTeam extends Component {
    state = {
        team: '',
        leader: '', //领队信息
        phone: '',
        wechat: '',
        QQ: '',
        member1: '', //成员1
        debate1: '',
        theme1: '',
        member2: '', //成员2
        debate2: '',
        theme2: '',
        member3: '', //成员3
        debate3: '',
        theme3: '',
        member4: '', //成员4
        debate4: '',
        theme4: '',
        member5: '', //成员5
        debate5: '',
        theme5: '',
        member6: '', //成员6
        debate6: '',
        theme6: '',
        member7: '', //成员7
        debate7: '',
        theme7: '',
        member8: '', //成员8
        debate8: '',
        theme8: '',
        topic1: '', //辩题1
        explanation1: '',
        topic2: '', //辩题2
        explanation2: '',
        status: true
    }

    Delete = () => {

    }


    //获取报名表信息
    onChange = (e: any) => {
        let file = e.target.files[0];
        this.readWorkbookFromLocalFile(file);

    }

    readWorkbookFromLocalFile(file: Blob) {
        var reader = new FileReader();
        reader.onload = function (e: any) {
            var filedData = e.target.result;
            var workbook = XLSX.read(filedData, {
                type: 'binary'
            });
            var sheet = workbook.Sheets.Sheet1
            var data = {
                team: sheet.D9 ? sheet.D9.v : '',
                leader: sheet.D11 ? sheet.D11.v : '', //领队信息
                phone: sheet.G11 ? sheet.G11.v : '',
                wechat: sheet.K11 ? sheet.K11.v : '',
                QQ: sheet.O11 ? sheet.O11.v : '',
                member1: sheet.C14 ? sheet.C14.v : '', //成员1
                debate1: sheet.J14 ? sheet.J14.v : '',
                theme1: sheet.N14 ? sheet.N14.v : '',
                member2: sheet.C15 ? sheet.C15.v : '', //成员2
                debate2: sheet.J15 ? sheet.J15.v : '',
                theme2: sheet.N15 ? sheet.N15.v : '',
                member3: sheet.C16 ? sheet.C16.v : '', //成员3
                debate3: sheet.J16 ? sheet.J16.v : '',
                theme3: sheet.N16 ? sheet.N16.v : '',
                member4: sheet.C17 ? sheet.C17.v : '', //成员4
                debate4: sheet.J17 ? sheet.J17.v : '',
                theme4: sheet.N17 ? sheet.N17.v : '',
                member5: sheet.C18 ? sheet.C18.v : '', //成员5
                debate5: sheet.J18 ? sheet.J18.v : '',
                theme5: sheet.N18 ? sheet.N18.v : '',
                member6: sheet.C19 ? sheet.C19.v : '', //成员6
                debate6: sheet.J19 ? sheet.J19.v : '',
                theme6: sheet.N19 ? sheet.N19.v : '',
                member7: sheet.C20 ? sheet.C20.v : '', //成员7
                debate7: sheet.J20 ? sheet.J20.v : '',
                theme7: sheet.N20 ? sheet.N20.v : '',
                member8: sheet.C21 ? sheet.C21.v : '', //成员8
                debate8: sheet.J21 ? sheet.J21.v : '',
                theme8: sheet.N21 ? sheet.N21.v : '',
                topic1: sheet.D23 ? sheet.D23.v : '', //辩题1
                explanation1: sheet.D24 ? sheet.D24.v : '',
                topic2: sheet.D25 ? sheet.D25.v : '', //辩题2
                explanation2: sheet.D26 ? sheet.D26.v : '',
                status: false
            }
            this.setState(data)//或许可以更优雅地更新state而不报错
        }.bind(this)
        reader.readAsBinaryString(file);

    }

    //获取报名表信息

    //提交报名表信息
    onClick = () => {
        var data = this.state
        delete data['status'] //ts中delete不合法，或许有人知道怎么正确的删除

        fetch('http://localhost/api/addteam', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                data.status === 0 ? Toast.success(data.data) : Toast.error(data.data)
            }
        ).then(
            
        )
    }


    render() {
        return (
            <div className={styles.contents}>

                {this.state.status ?
                    <input type="file" id="excel" accept='.xls,.xlsx' onChange={(e) => this.onChange(e)} />
                    : null}

                {this.state.team === '' ? null :
                    <div>
                        <div className={styles.main}>
                            <h1 className={styles.teamRow}>
                                <input id='team' readOnly defaultValue={this.state.team} />
                            </h1>

                            <div className={styles.leaderRow}>
                                <div>
                                    领队:
                                </div>
                                <input id='leader' readOnly defaultValue={this.state.leader} />
                                <div>
                                    手机:
                                </div>
                                <input id='phone' readOnly defaultValue={this.state.phone} />
                                <div>
                                    微信:
                                </div>
                                <input id='wechat' readOnly defaultValue={this.state.wechat} />
                                <div>
                                    QQ:
                                </div>
                                <input id='QQ' readOnly defaultValue={this.state.QQ} />
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
                                            <td>
                                                {this.state.member1}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.debate1}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.theme1}
                                                </div>

                                            </td>

                                        </tr>

                                        {/* 成员2信息 */}
                                        <tr className={styles.tr}>
                                            <td>
                                                成员2
                                            </td>
                                            <td>
                                                {this.state.member2}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.debate2}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.theme2}
                                                </div>
                                            </td>

                                        </tr>

                                        {/* 成员3信息 */}
                                        <tr className={styles.tr}>
                                            <td>
                                                成员3
                                            </td>
                                            <td>
                                                {this.state.member3}
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.debate3}
                                                </div>
                                            </td>
                                            <td className={styles.theme1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.theme3}
                                                </div>
                                            </td>

                                        </tr>

                                        {/* 成员4信息 */}
                                        {this.state.member4 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员4
                                                </td>
                                                <td>
                                                    {this.state.member4}
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate4}
                                                    </div>
                                                </td>
                                                <td className={styles.theme1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.theme4}
                                                    </div>
                                                </td>

                                            </tr>
                                        }

                                        {/* 成员5信息 */}
                                        {this.state.member5 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员5
                                                </td>
                                                <td>
                                                    {this.state.member5}
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate5}
                                                    </div>
                                                </td>
                                                <td className={styles.theme1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.theme5}
                                                    </div>
                                                </td>

                                            </tr>
                                        }

                                        {/* 成员6信息 */}
                                        {this.state.member6 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员6
                                                </td>
                                                <td>
                                                    {this.state.member6}
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate6}
                                                    </div>
                                                </td>
                                                <td className={styles.theme1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.theme6}
                                                    </div>
                                                </td>

                                            </tr>
                                        }

                                        {/* 成员7信息 */}
                                        {this.state.member7 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员7
                                                </td>
                                                <td>
                                                    {this.state.member7}
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate7}
                                                    </div>
                                                </td>
                                                <td className={styles.theme1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.theme7}
                                                    </div>
                                                </td>

                                            </tr>
                                        }

                                        {/* 成员8信息 */}
                                        {this.state.member8 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员8
                                                </td>
                                                <td>
                                                    {this.state.member8}
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate8}
                                                    </div>
                                                </td>
                                                <td className={styles.theme1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.theme8}
                                                    </div>
                                                </td>

                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>


                            {
                                this.state.topic1 === '' ?
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
                                                            {this.state.topic1}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解1:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.state.explanation1}
                                                        </div>
                                                    </td>
                                                </tr >
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        辩题2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.state.topic2}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.state.explanation2}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            }

                            <div className={styles.button}>
                                <div>
                                    <Button type='primary' size='large' onClick={() => this.onClick()}>
                                        确认并提交
                                    </Button>
                                </div>
                            </div>


                        </div>
                    </div>
                }
            </div>
        )
    }
}
