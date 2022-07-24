import React, { useState } from 'react'
import './index.css'
import ShowStatistics from '@/components/statistics/ShowStatistics'

export default function index() {
    const [listData, setListData] = useState([
        {
            id: 21,
            z: 'A1 深语学院',
            f: 'A2 宠物喵喵',
            topic: '赢了吹，输了喷是/不是可取的竞技游戏观',
            time: '2022-07-05 21:00:00',
            judge1: '评委一',
            j1win: '反@反@反',
            j1best: 'f3',
    
            judge2: '丁羕',
            j2win: '反@反@反',
            j2best: 'f3',
    
            judge3: '庞靖怡',
            j3win: '反@正@反',
            j3best: 'f1',
    
            z1: '',
            z2: '',
            z3: '',
            f1: '',
            f2: '',
            f3: '萨摩耶',
    
            schedule: '预赛,A组,第一场'
        }
        
    ])
    return (
        <div>
            {listData.map((item) => {
                return <ShowStatistics key={item['id']} {...item} />
            })}
        </div>
    )
}
