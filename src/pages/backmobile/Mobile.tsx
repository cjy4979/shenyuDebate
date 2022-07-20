import React, { useEffect, useState } from 'react'
import { Pagination, Divider } from 'antd';
import MItem from '@/components/MItem/MItem'
import styles from './Mobile.less'
import onlineLogo from '@/images/online.png'


export default function Mobile() {
    const [dataSourse, setDataSourse] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetch('/api/backdate?page=' + currentPage + '&size=10', {
            credentials: 'same-origin',
        }
        ).then(response => response.json())
            .then(data => {
                setDataSourse(data.data)
                setTotal(data.total)
            })
    });
    const loadData = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className={styles.back}>
            <img className={styles.logo} src={onlineLogo} alt="online" />
            <div className={styles.title}>深语赛果统计</div>
            <Divider />
            <div style={{ marginTop: '5px', width: '80%' }}>
                {dataSourse.map((item) => {
                    return <MItem key={item['id']} {...item} />
                })}
            </div>
            <Pagination style={{ marginTop: '15px' }}
                defaultCurrent={1}
                total={total}
                showSizeChanger={false}
                defaultPageSize={12}
                onChange={(page) => loadData(page)} />
        </div>
    )
}
