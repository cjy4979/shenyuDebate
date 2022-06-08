import React, { useEffect, useState } from 'react'
import List from '@/components/schedule/List'
import './index.css'
import { Typography, Divider } from '@douyinfe/semi-ui';
import Icon, { IconPlusCircle  } from '@douyinfe/semi-icons';




export default function index() {
    const { Title } = Typography;
    const [listData, setListData] = useState([])

    useEffect(() => {
        fetch('http://localhost:80/api/schedule').then(
            response => response.json()
        ).then(
            data => {
                setListData(data.data);                
            } 
        )
    },
    //[]
    )//不加[]可以实时刷新，但是吃资源

    //添加比赛信息
    const onClick=()=>{
        fetch('http://localhost/api/addlist')
    }

    return (
        <div>
            <div>
                <Title heading={2} style={{ margin: '8px 0' }} >这儿有个header</Title>
            </div>
            <div>
                {listData.map((item) => {
                    return <List key={item['id']} {...item} />
                })}
                <div className='plusLine' onClick={()=> onClick()}>
                    <Divider margin='12px' align='center'>添加
                        <IconPlusCircle  className='plus' size='extra-large'/>
                        信息
                    </Divider>
                </div>
            </div>

        </div>
    )
}
