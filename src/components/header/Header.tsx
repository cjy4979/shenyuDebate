import React, { Component } from 'react'
import { Layout, Nav, Button, Avatar, Toast, Icon, Dropdown, Tag } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconHelpCircle, IconUserGroup, IconHistogram, IconCalendarClock, IconUserSetting, IconFile, IconExit } from '@douyinfe/semi-icons';
import { history } from 'umi'
import { getCookie, removeCookie } from '@/utils/auth';
//rights:权限：1为超级管理员，有全部权限，2为项目部成员，不能访问赛事列表和队伍筛选，0为新媒体，只能访问赛果单


export default class Header extends Component<any, any> {
    state = {
        selectedKeys: this.props.selectedKeys,
        rights: getCookie('rights'),
        num: this.props.num
    }

    //登出
    onLogout = () => {

        fetch('/api/logout').then(
            response => response.json()
        ).then(
            data => {
                if (data.status === 0) {
                    Toast.success('退出成功')
                    history.push('/login')
                    removeCookie('username');
                    removeCookie('password');
                    removeCookie('rights');
                } else {
                    Toast.error('请重试')
                }
            }
        )
    }
    

    render() {
        const { Header } = Layout;
        return (
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)', width: '100%' }}>
                    <Nav mode="horizontal" selectedKeys={this.state.selectedKeys} style={{overflow:'auto'}}>
                        <Nav.Header>
                            <Icon svg={<PetIcon />} 
                            //onClick={() => history.push("/try")}
                            />
                        </Nav.Header>

                        <Nav.Item itemKey="Schedule" text="赛程"
                            icon={<IconCalendarClock size="large" />}
                            onClick={() => {
                                this.setState({ selectedKeys: ['Schedule'] })
                                history.push('/schedule')
                            }}
                        />
                        <Nav.Item itemKey="Result" text="赛果"
                            icon={<IconHistogram size="large" />}
                            onClick={() => {
                                this.setState({ selectedKeys: ['Result'] })
                                history.push('/statistics')
                            }}
                        />
                        <Nav.Item itemKey="Work" text="人员安排"
                            style={this.state.rights === '0' ? { display: 'none' } : {}}
                            icon={<IconUserSetting size="large" />}
                            onClick={() => {
                                this.setState({ selectedKeys: ['Work'] })
                                history.push('/work')
                            }}
                        />
                        <Nav.Item itemKey="Team" text="队伍筛选"
                            style={this.state.rights !== '1' ? { display: 'none' } : {}}
                            icon={<IconFile size="large" />}
                            onClick={() => {
                                this.setState({ selectedKeys: ['Team'] })
                                history.push('/team')
                            }}
                        />
                        <Nav.Item itemKey="personnel" text="对阵双方"
                            style={this.state.rights === '0' ? { display: 'none' } : {}}
                            icon={<IconUserGroup size="large" />}
                            onClick={() => {
                                this.setState({ selectedKeys: ['personnel'] })
                                history.push('/personnel')
                            }}
                        />
                        <Nav.Footer>
                            <Button
                                theme="borderless"
                                icon={<IconExit size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                                onClick={() => this.onLogout()}
                            />
                            <Button
                                theme="borderless"
                                icon={<IconHelpCircle size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                            onClick={() => history.push("/try")}
                            />
                            <Avatar color={this.state.rights === '1' ? 'pink' : this.state.rights === '0' ? 'light-green' : 'light-blue'} size="small">
                                {this.state.rights === '1' ? '管理' : this.state.rights === '0' ? '媒体' : '项目'}
                            </Avatar>
                        </Nav.Footer>
                    </Nav>

            </Header>
        )
    }
}
export function PetIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2728" width="40" height="40"><path d="M512 1024C229.239467 1024 0 794.760533 0 512S229.239467 0 512 0 1024 229.239467 1024 512 794.760533 1024 512 1024z m-132.937956-502.419911c64.7168-14.381511 85.4016-72.840533 57.002667-138.877156-11.218489-26.146133-56.502044-115.757511-75.070578-152.393955a101.489778 101.489778 0 0 0-24.1664 29.127111c-22.141156 41.142044-23.665778 132.437333-34.816 246.442667 20.161422 13.5168 46.102756 22.528 77.050311 15.701333z m462.529423-154.237156a26.123378 26.123378 0 0 0-28.672-25.1904c-25.144889 2.571378-63.806578 2.571378-96.802134-14.244977-53.885156-27.534222-30.651733-67.265422-75.138844-109.226667-45.056-42.507378-160.699733-47.149511-238.341689-13.585067 30.446933 62.350222 75.093333 155.420444 85.788444 185.5488 30.72 86.948978-16.839111 157.604978-90.294044 179.996445-43.030756 13.152711-76.959289 6.030222-102.4-7.691378-2.161778 17.408-4.642133 35.248356-7.486578 53.384533a843.389156 843.389156 0 0 1-29.058844 124.700445 49.607111 49.607111 0 0 0-8.874667 28.444444 49.493333 49.493333 0 0 0 56.797867 49.152l0.455111 0.432356H651.946667a29.718756 29.718756 0 0 0 32.039822-29.673245c0-4.846933-1.160533-9.489067-3.185778-13.5168a198.519467 198.519467 0 0 0-80.6912-116.349155c1.524622-32.608711 9.102222-62.577778 27.534222-82.261334 38.365867-41.051022 134.849422-10.581333 187.209956-80.213333 25.759289-34.429156 28.034844-93.980444 26.715022-129.706667z" p-id="2729"></path><path d="M599.768178 380.131556c-20.548267 0-37.205333-16.839111-37.205334-37.614934s16.657067-37.592178 37.205334-37.592178c20.525511 0 37.205333 16.816356 37.205333 37.592178 0 20.798578-16.679822 37.614933-37.205333 37.614934z" p-id="2730"></path></svg>
}
