import { withSuccess } from '@douyinfe/semi-ui/lib/es/modal/confirm'
import { takeWhile } from 'lodash'
import React, { Component } from 'react'
import styles from './AddTeam.less'
import {Toast } from '@douyinfe/semi-ui';

export default class ShowTeam extends Component<any, any> {
    Delete=()=>{
       var msg=confirm('确认删除吗？')
       if (msg === true){
           fetch('http://localhost/api/deleteteam?team='+this.props.team).then(
               response => response.json()
           ).then(
               data =>{
                   if(data.status === 0){
                    Toast.success('删除成功')
                   }
               }
           )
       }
    }
    
    //本组件纯展示，不做数据处理
    render() {

        return (
            <div className={styles.contents}>                
                    <div>
                        <div className={styles.main}>
                            <h1 className={styles.teamRow}>
                                <div className={styles.showTeamName}>
                                    {this.props.team}
                                </div>
                                <div className={styles.buttonDiv2} >
                                    <button className={styles.button2} onClick={() => this.Delete()}>
                                        删除
                                    </button>
                                </div>
                            </h1>

                            <div className={styles.showleaderRow}>
                                <div>
                                    领队:
                                    {this.props.leader}
                                </div>
                                <div>
                                    手机:
                                    {this.props.phone}
                                </div>
                                <div>
                                    微信:
                                    {this.props.wechat}
                                </div>
                                <div>
                                    QQ:
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
                                                <div style={this.props.debate1==='3-5条'? {color:'red'}:{color:''}}>
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


                            {
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
                            }

                        </div>
                    </div>

            </div>
        )
    }
}
