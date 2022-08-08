import React, { useEffect, useState } from 'react'
import { Layout, Table, Tag, Space, DatePicker } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { history } from 'umi';
import moment from 'moment';
import styles from './Statistics.less'
import onlineLogo from '@/images/online.png'

const { Content, Footer } = Layout;

export default function index() {

    function isMobile() {
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            history.push('/m-back');//跳转
            return true; // 移动端
            
        } else {
            return false; // PC端 
        }
    }

    const [dataSourse, setDataSourse] = useState([])
    const [currentPage, setCurrentPge] = useState(1)
    const [total, setTotal] = useState(0)

    //佳辩
    const bestDebater = {
        'z1': '正方一辩',
        'z2': '正方二辩',
        'z3': '正方三辩',
        'f1': '反方一辩',
        'f2': '反方二辩',
        'f3': '反方三辩',
    }

    const colorArr = [
        '',
        'green',
        'geekblue',
        'red',
        'magenta',
    ]

    const loadData = (page: number) => {
        setCurrentPge(page)
    }

    useEffect(()=>{
        isMobile()
    },
    []
    )

    //useEffect能实时更新，但是会一直向服务器发送请求，antd也会有频闪动画，但是先用着吧
    useEffect(() => {
        fetch('/api/backdate?page=' + currentPage + '&size=10').then(response => response.json())
            .then(data => {
                setDataSourse(data.data)
                setTotal(data.total)
            })
    });


    const columns: ColumnProps<IUserInfo>[] = [{
        title: '评委',
        key: 'name',
        dataIndex: 'name',
        ellipsis: false,
        align: 'center',
    }, {
        title: '提交时间',
        key: 'time',
        dataIndex: 'time',
        ellipsis: false,
        align: 'center',
        render: (time: any) => {
            let text = moment(time).format('M月D日 HH:mm:ss')
            return (
                <span style={{ fontSize: '15px' }}>
                    {text}
                </span>
            );
        },
    },{
        title: '获胜方',
        key: 'win',
        dataIndex: 'win',
        render: winner => {

            let arr = winner.split('@')
            return (
                <span>
                    <div>
                        <Tag color={arr[0] === '正' ? colorArr[1] : colorArr[2]} >
                            内容票：{arr[0]}
                        </Tag>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                        <Tag color={arr[1] === '正' ? colorArr[1] : colorArr[2]} >
                            环节票：{arr[1]}
                        </Tag>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                        <Tag color={arr[2] === '正' ? colorArr[1] : colorArr[2]} >
                            决胜票：{arr[2]}
                        </Tag>
                    </div>
                </span>
            )

        },
        align: 'center',
    }, {
        title: '佳辩票型',
        key: 'best',
        dataIndex: 'best',
        ellipsis: false,
        align: 'center',
        render: best => {
            let FinalDebater = bestDebater[best as keyof typeof bestDebater];
            return (
                best === '' ?
                <div style={{ color: '#ff4d4f', fontSize: '18px' }}>
                    弃票
                </div>:
                <div style={best.substr(0, 1) === 'z' ? { color: '#00b483', fontSize: '18px' } : { color: '#7991d1', fontSize: '18px' }}>
                    {FinalDebater}
                </div>
            );

        }

    }]

    interface IUserInfo {
        key: string;
        name: string;
        age: number;
        debater: string
    }



    return (

        <div className={styles.background}>
            <Layout style={{ backgroundColor: '	#FCFCFC' }}>
                <header className={styles.header}>
                    <img className={styles.logo} src={onlineLogo} alt="online" />
                    <div className={styles.title}>深语赛果统计</div>
                </header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 32, backgroundColor: '	#FCFCFC' }}>
                    <Table columns={columns}
                        style={{ marginTop: "15px" }} rowKey="id"
                        pagination={{
                            total,
                            defaultPageSize: 10,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                            onChange: loadData
                        }}
                        bordered
                        dataSource={dataSourse}
                    />
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: '	#FCFCFC' }}>深语10.0  @2022 by online项目部</Footer>
            </Layout>

        </div>
    )
}
