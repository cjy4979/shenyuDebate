import React, { useEffect, useState } from 'react'
import ShowStatistics from '@/components/statistics/ShowStatistics'
import Header from '@/components/header/Header';
import List from '@/components/schedule/List'
import styles from './index.less'
import { Layout, TextArea } from '@douyinfe/semi-ui';
import Icon, { IconPlusCircle } from '@douyinfe/semi-icons';
const {Footer } = Layout;

export default function index() {
    const [listData, setListData] = useState([])

    //首次挂载加载数据
    useEffect(() => {
        fetch('/api/schedule?type=半决&page=1&size=4').then(
            response => response.json()
        ).then(
            data => {
                setListData(data.data)
            }
        )

    },
        []
    )
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)',width:'100%' }}>
            <div>
                <div>
                    <Header />
                </div>

                <div className={styles.main}>
                    <div className={styles.right} >
                        {listData.map((item) => {
                            return <List key={item['id']} {...item} />
                        })}

                    </div>
                    <div className={styles.right}>
                        {listData.map((item) => {
                            return <ShowStatistics key={item['id']} {...item} />
                        })}
                        <p className={styles.textArea}>粘贴试试：</p>
                        <TextArea autosize  className={styles.textArea}
                        
                        >
                            
                        </TextArea>
                    </div>

                </div>

            </div>
            <Footer
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    color: 'var(--semi-color-text-2)',
                    backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span>COPYRIGHT © 2022 jiyu.Chen, All rights Reserved. </span>
                </span>
            </Footer>
        </Layout>

    )
}
