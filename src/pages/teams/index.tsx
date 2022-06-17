import React, { useEffect, useState } from 'react'
import styles from './index.less'
import AddTeam from '@/components/teams/AddTeam';
import ShowTeam from '@/components/teams/showTeam';
import TeamLeftMenu from '@/components/teams/TeamLeftMenu';
import { Nav } from '@douyinfe/semi-ui';
import { IconUser, IconUserAdd } from '@douyinfe/semi-icons';
import { useLocation } from 'react-router-dom'

export default function index() {
  const [listData, setListData] = useState([])
  const [teamData, setTeamData] = useState({})
  const [key, setKey] = useState('add')

  useEffect(() => {
    fetch('http://localhost/api/getteamlist').then(
      response => response.json()
    ).then(
      data => {
        var leftList = data.data.map((item: any) => {
          return {
            itemKey: item['team'],
            text: item['team'],
            icon: <IconUser />,
          }
        })
        var add = { itemKey: 'add', text: '添加新队伍', icon: <IconUserAdd style={{ color: '#6A3AC7' }} /> }
        leftList.unshift(add)
        setListData(leftList)
      }
    )

  },
  //[]
  )

  const onClick = (data: any) => {
    if (data.itemKey !== 'add') {
      fetch('http://localhost/api/getlistbyteam?team=' + data.itemKey).then(
        response => response.json()
      ).then(
        data => {
          setTeamData(data.data[0])
          setKey(data.itemKey)
        }
      )
    } else {
      setKey(data.itemKey)
    }
  }


  return (
    <div className={styles.main}>

      <div className={styles.left_list}>

        <Nav
          bodyStyle={{ height: '100%' }}
          items={listData}
          onClick={data => onClick(data)}
        />
      </div>
      <div className={styles.right_content}>
        {key === 'add' ?
          <AddTeam /> :
          <ShowTeam {...teamData} />
        }
      </div>
    </div>
  )
}
