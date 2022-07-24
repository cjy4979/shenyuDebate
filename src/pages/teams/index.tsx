import React, { useEffect, useState } from 'react'
import styles from './index.less'
import AddTeam from '@/components/teams/AddTeam';
import ShowTeam from '@/components/teams/showTeam';
import Header from '@/components/header/Header';
import { Nav, Toast } from '@douyinfe/semi-ui';
import Icon, { IconUser, IconUserAdd } from '@douyinfe/semi-icons';
import { getCookie } from '@/utils/auth';
import { history } from 'umi'

export default function index() {
  const [unListData, setUnListData] = useState([])
  const [passedListData, setPassedListData] = useState([])
  const [deniedListData, setDeniedListData] = useState([])
  const [holdListData, setHoldListData] = useState([])
  const [teamData, setTeamData] = useState({})
  const [key, setKey] = useState('add')
  const [openKey, setOpenKey] = useState(['', '', '', ''])


  useEffect(() => {
    //未筛选的队伍
    if (getCookie('rights') !== '1') {
      Toast.warning('无权限')
      history.push('./statistics')
    } else {
      fetch('/api/getteamlist?selected=0').then(
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
          setUnListData(leftList)
        }
      )
      //通过的队伍
      fetch('/api/getteamlist?selected=1').then(
        response => response.json()
      ).then(
        data => {
          var leftList = data.data.map((item: any) => {
            return {
              itemKey: item['team'],
              text: item['type'] === null ? '' + item['team'] : item['type'] + '\n' + item['team'],
              icon: <IconUser />,
            }
          })
          setPassedListData(leftList)
        }
      )

    }
  },
    []
  )

  //更新数据
  const fresh = () => {
    //未筛选的队伍
    fetch('/api/getteamlist?selected=0').then(
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
        setUnListData(leftList)
      }
    )

    //通过的队伍
    fetch('/api/getteamlist?selected=1').then(
      response => response.json()
    ).then(
      data => {
        var leftList = data.data.map((item: any) => {

          return {
            itemKey: item['team'],
            text: item['type'] === null ? '' + item['team'] : item['type'] + '\n' + item['team'],
            icon: <IconUser />,
          }
        })
        setPassedListData(leftList)
      }
    )

    //拒绝的队伍
    fetch('/api/getteamlist?selected=2').then(
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
        setDeniedListData(leftList)
      }
    )

    //待定的队伍
    fetch('/api/getteamlist?selected=3').then(
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
        setHoldListData(leftList)
      }
    )

   
  }

  const onClick = (data: any) => {

    fresh()
    if (data.itemKey === '0' || data.itemKey === '1' || data.itemKey === '2' || data.itemKey === '3') {
      var a = openKey //取值
      if (a[Number(data.itemKey)] === '') {
        a[Number(data.itemKey)] = data.itemKey
        setOpenKey(a)
      } else {
        a[Number(data.itemKey)] = ''
        setOpenKey(a)
      }
    } else if (data.itemKey !== 'add') {
      setTeamData([])//增加一步清空数值，应对不知道为什么存在的异步更新
      fetch('/api/getlistbyteam?team=' + data.itemKey).then(
        response => response.json()
      ).then(
        data => {
          setTeamData(data.data[0])
          console.log(data.data[0]);

          setKey(data.itemKey)
        }
      )
    } else {
      setKey(data.itemKey)
    }
  }


  return (
    <div style={{ height: "100hv" }}>
      <Header selectedKeys={['Team']} />
      <div className={styles.main}>

        <div className={styles.left_list}>

          <Nav
            bodyStyle={{ height:'100%' }}
            items={[
              {
                itemKey: 'add',
                text: '添加队伍',
                icon: <IconUserAdd />
              }, 
              {
                itemKey: '0',
                text: '未筛选('+unListData.length+')',
                items: unListData,
                icon: <Icon svg={<UnhandleIcon />} />
              }, 
              {
                itemKey: '1',
                text: '通过(' + passedListData.length + '/24)',
                items: passedListData,
                icon: <Icon svg={<PassIcon />} />,
                maxHeight:'100%'
              }, 
              {
                itemKey: '2',
                text: '落选('+deniedListData.length +')',
                items: deniedListData,
                icon: <Icon svg={<DenyIcon />} />
              }, 
              {
                itemKey: '3',
                text: '待定('+holdListData+')',
                items: holdListData,
                icon: <Icon svg={<HoldIcon />} />
              },

            ]}
            onClick={data => onClick(data)}
            footer={{
              collapseButton: true,
            }}
            openKeys={openKey}
          />
        </div>
        <div className={styles.right_content}>
          {key === 'add' ?
            <AddTeam /> :
            <ShowTeam {...teamData}/>
          }
        </div>
      </div>
    </div>
  )
}

export function HoldIcon() {
  return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1432" width="24" height="24"><path d="M335.36 197.12h28.16c23.04 0 43.52-20.48 43.52-43.52V69.12c0-23.04-20.48-43.52-43.52-43.52h-28.16c-23.04 0-43.52 20.48-43.52 43.52V153.6c0 23.04 17.92 43.52 43.52 43.52z m622.08 23.04V120.32c0-20.48-17.92-38.4-38.4-38.4h-102.4-25.6v53.76c0 51.2-40.96 92.16-92.16 92.16h-5.12c-51.2 0-92.16-40.96-92.16-92.16V81.92H435.2v53.76c0 51.2-40.96 92.16-92.16 92.16h-5.12c-51.2 0-92.16-40.96-92.16-92.16V81.92h-25.6-120.32c-20.48 0-38.4 17.92-38.4 38.4v837.12c0 20.48 17.92 38.4 38.4 38.4H921.6c20.48 0 38.4-17.92 38.4-38.4V227.84c0-2.56-2.56-5.12-2.56-7.68z m-56.32 665.6c0 53.76-5.12 56.32-56.32 56.32H194.56c-53.76 0-76.8-5.12-76.8-56.32V312.32h783.36v573.44z m-204.8-688.64h28.16c23.04 0 43.52-20.48 43.52-43.52V69.12c0-25.6-20.48-43.52-43.52-43.52h-28.16c-23.04 0-43.52 20.48-43.52 43.52V153.6c0 23.04 20.48 43.52 43.52 43.52z m-125.44 591.36c2.56-2.56 5.12-7.68 7.68-12.8 0-5.12-2.56-10.24-5.12-12.8l-53.76-56.32c-7.68-7.68-17.92-7.68-25.6 0-7.68 7.68-7.68 17.92 0 25.6l53.76 56.32c5.12 7.68 15.36 7.68 23.04 0z m-273.92-240.64c5.12 0 10.24-2.56 12.8-5.12l104.96-115.2c5.12-7.68 5.12-17.92 0-25.6-5.12-2.56-7.68-5.12-12.8-5.12s-10.24 2.56-12.8 5.12L281.6 519.68c-7.68 7.68-5.12 17.92 0 25.6 5.12 2.56 10.24 2.56 15.36 2.56z m145.92 128h243.2v138.24c0 7.68-2.56 15.36-10.24 20.48-5.12 5.12-12.8 10.24-23.04 10.24h-84.48c-10.24 0-17.92 7.68-17.92 17.92 0 10.24 7.68 17.92 17.92 17.92h84.48c10.24 0 17.92-2.56 25.6-5.12 25.6-10.24 40.96-35.84 40.96-61.44v-138.24h20.48c10.24 0 17.92-7.68 17.92-17.92 0-10.24-7.68-17.92-17.92-17.92h-20.48v-64h20.48c10.24 0 17.92-7.68 17.92-17.92 0-10.24-7.68-17.92-17.92-17.92h-133.12v-71.68h128c10.24 0 17.92-7.68 17.92-17.92 0-10.24-7.68-17.92-17.92-17.92h-128V409.6c0-10.24-7.68-17.92-17.92-17.92-10.24 0-17.92 7.68-17.92 17.92v23.04h-125.44c-10.24 0-17.92 7.68-17.92 17.92 0 10.24 7.68 17.92 17.92 17.92h125.44V537.6h-130.56c-10.24 0-17.92 7.68-17.92 17.92 0 10.24 7.68 17.92 17.92 17.92h243.2v64h-243.2c-10.24 0-17.92 7.68-17.92 17.92 2.56 12.8 10.24 20.48 20.48 20.48z m-87.04-130.56l-71.68 81.92c-7.68 7.68-5.12 17.92 0 25.6 5.12 2.56 7.68 5.12 12.8 5.12s10.24-2.56 12.8-5.12l40.96-46.08v258.56c0 10.24 7.68 17.92 17.92 17.92 10.24 0 17.92-7.68 17.92-17.92v-307.2c2.56-17.92-17.92-25.6-30.72-12.8z" fill="" p-id="1433"></path></svg>
}
export function DenyIcon() {
  return <svg viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1707" width="24" height="24"><path d="M577.024 3.84a510.08 510.08 0 1 0 0.128 1019.904A510.08 510.08 0 0 0 577.024 3.84zM195.136 513.792a382.336 382.336 0 0 1 381.888-381.824c86.656 0 166.4 29.312 230.528 78.144l-534.208 534.272a379.584 379.584 0 0 1-78.208-230.592z m381.888 381.824a378.944 378.944 0 0 1-220.608-70.72l531.776-531.776a379.52 379.52 0 0 1 70.656 220.672 382.336 382.336 0 0 1-381.824 381.824z" fill="#434343" p-id="1708"></path></svg>
}
export function PassIcon() {
  return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4993" width="24" height="24"><path d="M768 192H640c0-70.4-57.6-128-128-128s-128 57.6-128 128H256c-35.2 0-64 28.8-64 64v640c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64V256c0-35.2-28.8-64-64-64z m-256-32c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32z m256 736H256V256h64v64h384v-64h64v640z m-59.2-404.8L459.2 740l-45.6-45.6 248.8-248.8 46.4 45.6z m-340 68l136 136-45.6 45.6-136-136 45.6-45.6z" p-id="4994"></path></svg>
}
export function UnhandleIcon() {
  return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5289" width="24" height="24"><path d="M293.432889 853.333333H91.022222V170.666667h841.955556v439.182222h-52.337778v-386.844445H143.36v577.991112h150.072889V853.333333z" fill="#e6e6e6" p-id="5290"></path><path d="M227.555556 375.466667h568.888888v52.337777H227.555556zM227.555556 558.535111h568.888888v52.337778H227.555556z" fill="#e6e6e6" p-id="5291"></path><path d="M876.088889 796.444444m-56.888889 0a56.888889 56.888889 0 1 0 113.777778 0 56.888889 56.888889 0 1 0-113.777778 0Z" fill="#e6e6e6" p-id="5292"></path><path d="M443.733333 796.444444m-56.888889 0a56.888889 56.888889 0 1 0 113.777778 0 56.888889 56.888889 0 1 0-113.777778 0Z" fill="#e6e6e6" p-id="5293"></path><path d="M659.911111 796.444444m-56.888889 0a56.888889 56.888889 0 1 0 113.777778 0 56.888889 56.888889 0 1 0-113.777778 0Z" fill="#e6e6e6" p-id="5294"></path></svg>
}



