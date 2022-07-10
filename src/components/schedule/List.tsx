import React, { Component, useEffect, useState } from 'react'
import styles from './List.less'
import { DatePicker, Button, Typography, Input, Toast, Divider, Select } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';
import moment from "moment";
import { Card } from 'antd'
import { range } from 'lodash-es';
import { IconCopy } from '@douyinfe/semi-icons';
import { getCookie, removeCookie } from '@/utils/auth';
const { Text } = Typography;


export default class List extends Component<any, any>  {

  state = {
    id: this.props.id,
    z: this.props.z,
    f: this.props.f,
    topicZ: this.props.topicZ,
    topicF: this.props.topicF,
    topic: this.props.topic,
    time: this.props.time,
    endtime: this.props.endtime,
    schedule: this.props.schedule,
    meeting: this.props.meeting,
    judge1: this.props.judge1,
    judge2: this.props.judge2,
    judge3: this.props.judge3,
    timer: this.props.timer,//计时
    host: this.props.host,//主席
    control: this.props.control,//场控
    teamContact: this.props.teamContact,//队伍负责
    judgeContact: this.props.judgeContact,//评委负责
    type: this.props.type,//赛段
    //以上为数据，一下为前台处理所用缓存
    check: true, //防误删开关,true为不可修改
    url0: '',
    teams: [{}], //队伍选项
    changeId: '',//正反方select选择器的id
    rights: getCookie('rights'),
    urlOpen: false, //计时器链接框
  }


  //组件挂载获取队名
  componentWillMount() {
    fetch('http://localhost/api/getteamlist?selected=1').then(
      response => response.json()
    ).then(
      data => {
        var list = data.data.map((item: any) => {
          return {
            value: item['type'] === null ? '' : item['type'] + ' ' + item['team'],
            label: item['type'] === null ? '' : item['type'] + ' ' + item['team'],
          }
        })
        this.setState({
          teams: list
        })

      }
    )
  }


  //更新人员名单
  onChange = (e: any) => {
    this.setState({
      [this.state.changeId]: e,
    }, () => {
      var data = {
        id: this.state.id,
        [this.state.changeId]: e
      }
      fetch('http://localhost:80/api/changeschedule', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        response => response.json()
      ).then(
        data => {
          this.state = data.data[0];
        }

      )
    })
  }

  //只允许选择0秒
  disabledTime = () => {
    return {
      disabledSeconds: () => range(1, 60),
    }
  }

  //比赛日期更改
  dataConfirm = (...args: (string | string[] | Date | Date[])[]) => {
    var date = args
    console.log(date);
    var t = date[0].getTime() + 5400000
    t = new Date(t)
    var end = moment(t).format("YYYY-MM-DD HH:mm:ss")
    this.setState({
      time: date[1],
      endtime: end
    }, () => {
      var data = {
        id: this.state.id,
        time: this.state.time,
        endtime: this.state.endtime
      }
      fetch('http://localhost:80/api/changeschedule', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        response => response.json()
      ).then(
        data => {
          this.state = data.data[0];
        }
      )
    })
  }
  dataConfirmEnd = (...args: (string | string[] | Date | Date[])[]) => {
    var date = args

    this.setState({
      endtime: date[1]
    }, () => {
      var data = {
        id: this.state.id,
        endtime: this.state.endtime
      }
      console.log(data);
      fetch('http://localhost:80/api/changeschedule', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        response => response.json()
      ).then(
        data => {
          this.state = data.data[0];
        }
      )
    })
  }

  //赛程
  onCascaderChange = (v: any) => {
    this.setState({
      schedule: v.toString(),
      type: v.toString().substr(0, 2)
    }, () => {
      var data = {
        id: this.state.id,
        schedule: this.state.schedule,
        type: this.state.type
      }

      fetch('http://localhost:80/api/changeschedule', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        response => response.json()
      ).then(
        data => {
          this.state = data.data[0];
        })
    })

  }


  //更新其他信息
  onInputChange = (v: { target: { value: any; id: any }; }) => {
    this.setState({
      [v.target.id]: v.target.value,
    }, () => {
      var data = {
        id: this.state.id,
        [v.target.id]: v.target.value
      }
      fetch('http://localhost:80/api/changeschedule', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        response => response.json()
      ).then(
        data => {
          this.state = data.data[0];
        }

      )
    })
  }


  Delete = () => {
    fetch('http://localhost:80/api/deletelist?id=' + this.state.id).then(
      response => response.json()
    ).then(
      data => {
        data.msg === "success" ? Toast.success('删除成功') : Toast.error('删除失败')
        location.reload();
      }

    )
  }

  //防误触
  onCheckClick = () => {
    if (this.state.rights === '1') {
      this.state.check === true ? this.setState({ check: false }) : this.setState({ check: true })
    }
  }

  //计时码生成
  buildCode = () => {
    this.setState({ urlOpen: !this.state.urlOpen })
    var url0 = "https://new.bianlun.online/#/show?rid=9&nub=false&useb=true&off=false&ringBellTime=30&isDisplayTitle=true&custom=true&water=false&colorCode=%23e0ffff%7C%23ffffff%7C%2328769b%7C%23ffffff%7C%23ffffff%7C%23BF2727%7C%23007A9C" +
      "&n0=" + encodeURI(this.state.z) +
      "&n1=" + encodeURI(this.state.f) +
      "&t0=" + encodeURI(this.state.topicZ) +
      "&t1=" + encodeURI(this.state.topicF)
    this.setState({ url0: url0 })

  }

  //复制
  Copy = () => {
    var copyDOM = document.getElementById("url")!;  //需要复制文字的节点  
    var range = document.createRange(); //创建一个range
    window.getSelection()!.removeAllRanges();   //清楚页面中已有的selection
    range.selectNode(copyDOM);    // 选中需要复制的节点    
    window.getSelection()!.addRange(range);   // 执行选中元素
    var successful = document.execCommand('copy');    // 执行 copy 操作  
    if (successful) {
      Toast.success('复制成功')
    } else {
      Toast.error('复制失败，请手动复制')
    }
    // 移除选中的元素  
    window.getSelection()!.removeAllRanges();
  }


  render() {
    //赛段
    const treeData = [
      {
        label: '预赛',
        value: '预赛',
        children: [
          {
            label: 'A组',
            value: 'A组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }, {
                label: '第三场',
                value: '第三场',
              }, {
                label: '第四场',
                value: '第四场'
              }
            ]
          }, {
            label: 'B组',
            value: 'B组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }, {
                label: '第三场',
                value: '第三场',
              }, {
                label: '第四场',
                value: '第四场'
              }
            ]
          }, {
            label: 'C组',
            value: 'C组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }, {
                label: '第三场',
                value: '第三场',
              }, {
                label: '第四场',
                value: '第四场'
              }
            ]
          }, {
            label: 'D组',
            value: 'D组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }, {
                label: '第三场',
                value: '第三场',
              }, {
                label: '第四场',
                value: '第四场'
              }
            ]
          }
        ]
      }, {
        label: '初赛',
        value: '初赛',
        children: [
          {
            label: 'A组',
            value: 'A组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }
            ]
          }, {
            label: 'B组',
            value: 'B组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }
            ]
          }, {
            label: 'C组',
            value: 'C组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }
            ]
          }, {
            label: 'D组',
            value: 'D组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              }, {
                label: '第二场',
                value: '第二场'
              }
            ]
          }
        ]
      }, {
        label: '复赛',
        value: '复赛',
        children: [
          {
            label: 'A组',
            value: 'A组',
          }, {
            label: 'B组',
            value: 'B组',
          }, {
            label: 'C组',
            value: 'C组',
          }, {
            label: 'D组',
            value: 'D组',
          }
        ]
      }, {
        label: '半决赛',
        value: '半决赛',
        children: [
          {
            label: 'AB组',
            value: 'AB组',
          }, {
            label: 'CD组',
            value: 'CD组',
          }
        ]
      }, {
        label: '决赛',
        value: '决赛'
      }
    ]

    //背景色
    const color = {
      'A': '#E2EEDA',
      'B': '#DEEAF6',
      'C': '#FFF2CB',
      'D': '#FBE4D6',
    }

    //周几
    const a = [
      '日',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
    ]

    //Input展示的时间格式
    var time = moment(this.state.time).format('M月D日 HH:mm')
    var endtime = moment(this.state.endtime).format('M月D日 HH:mm')

    return (
      <div className={styles.main}
        style={this.state.schedule.substr(0, 2) === '决赛' ? { backgroundColor: '	#FAFAD2' } :
          this.state.schedule.substr(0, 2) === '半决' ? { backgroundColor: '#FFF0F5' } :
            { backgroundColor: color[this.state.schedule.substr(3, 1) as keyof typeof color] }}
      >

        {/*第一行，放场次信息、会议号 */}
        <div className={styles.firstRow}>
          <Input className={styles.meeting} id='schedule'
            insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>场次</span>}
            readonly
            value={this.state.schedule.replace(/\,/g, '-')}
            style={{ width: 210 }} />

          <div className={styles.icon}
            onClick={() => this.onCheckClick()}
          >
            {this.state.check === true ?
              //红标，禁止修改状态
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9759" id="mx_n_1657098948337"
                width="32" height="32"
              >
                <path d="M1011.541 399.886c59.995 266.134-108.34 530.792-375.988 591.128C367.9 1051.352 102.295 884.518 42.299 618.381-17.695 352.246 158.442 85.83 418.289 27.252c267.649-60.337 533.256 106.498 593.252 372.634z" fill="#D72747" p-id="9760"></path><path d="M1011.541 399.886c7.166 31.608 11.256 63.911 12.244 96.322 0.456 16.207 0.199 32.439-0.896 48.628a512.933 512.933 0 0 1-5.604 48.35c-10.573 64.1-33.711 126.213-67.727 182.023-33.984 55.816-78.813 105.383-131.766 144.824-26.482 19.689-54.896 36.975-84.859 51.271a517.554 517.554 0 0 1-93.674 34.154c-32.303 8.363-65.529 13.684-99.07 15.664-33.537 1.949-67.384 0.67-100.845-4.057-33.449-4.752-66.552-12.719-98.568-24.035a505.054 505.054 0 0 1-47.163-19.316 505.518 505.518 0 0 1-45.1-23.963c-58.568-34.916-110.292-81.867-150.688-137.4-20.227-27.734-37.597-57.602-51.791-88.912a515.981 515.981 0 0 1-18.867-47.969 525.836 525.836 0 0 1-13.922-49.605C5.633 592.309 1.416 557.93 0.887 523.506c-0.305-17.209 0.329-34.429 1.84-51.558a492.027 492.027 0 0 1 7.14-51.03c12.968-67.471 39.819-131.867 77.651-188.507a524.198 524.198 0 0 1 64.469-78.82c23.908-24.077 50.201-45.677 78.216-64.564 28.015-18.899 57.916-34.858 88.979-47.746a497.242 497.242 0 0 1 96.261-28.83C480.94-0.179 548.66 0.053 613.379 13.073c64.767 12.917 126.523 38.492 181.168 74.341 54.668 35.835 102.211 82.027 139.256 135.395a512.264 512.264 0 0 1 25.803 41.274c7.936 14.152 15.129 28.708 21.671 43.542 6.533 14.84 12.278 30.017 17.349 45.41a498.784 498.784 0 0 1 12.915 46.851z m0 0a498.168 498.168 0 0 0-13.055-46.804c-5.109-15.376-11.059-30.467-17.697-45.239-6.629-14.778-14.083-29.177-22.197-43.181a466.594 466.594 0 0 0-26.467-40.66c-37.99-52.373-86.719-96.688-141.928-129.648a476.804 476.804 0 0 0-42.515-22.613 476.361 476.361 0 0 0-44.457-18.223c-30.173-10.687-61.374-18.175-92.883-22.652-31.521-4.459-63.397-5.645-94.983-3.805-31.606 1.882-62.855 6.891-93.383 14.806-30.343 7.868-59.875 18.854-87.902 32.559-28.064 13.674-54.611 30.211-79.358 48.96-49.464 37.581-91.366 84.489-123.364 137.042-32.017 52.549-54.087 110.827-64.377 170.926a479.143 479.143 0 0 0-5.523 45.328 472.974 472.974 0 0 0-1.059 45.583c0.809 30.383 4.582 60.664 11.344 90.311a466.495 466.495 0 0 0 12.207 44.004c4.756 14.459 10.192 28.693 16.34 42.617 12.244 27.871 27.235 54.537 44.644 79.576 34.823 50.074 79.521 93.473 130.952 127.152 51.405 33.699 109.508 57.754 170.431 69.893 60.896 12.238 124.542 12.484 186.37 0.563 30.91-5.943 61.346-14.84 90.688-26.717 29.324-11.904 57.62-26.648 84.17-44.227 26.547-17.568 51.51-37.736 74.178-60.344a481.432 481.432 0 0 0 61.026-74.229c35.718-53.475 60.706-114.42 72.542-178.029a465.99 465.99 0 0 0 6.456-48.084c1.322-16.131 1.872-32.336 1.521-48.53-0.344-16.191-1.443-32.375-3.429-48.456a498.72 498.72 0 0 0-8.292-47.879z" fill="#B1DAE0" p-id="9761"></path><path d="M958.697 542.84h-55.771c-0.317-38.675-20.939-82.273-56.216-122.125h1.413l-84.187-145.818-33.774 58.502c-51.008-25.008-110.254-40.818-173.467-40.818-62.573 0-121.265 15.488-171.922 40.059l-33.337-57.742-83.145 144.01c-31.274 34.792-51.367 72.559-56.509 107.478h-60.576c-8.286 0-15 6.715-15 15v20c0 8.283 6.714 15 15 15h64.021c2.775 9.605 6.732 19.125 11.787 28.48l-68.688 25c-7.783 2.832-11.799 11.441-8.965 19.225l6.842 18.793c2.834 7.785 11.442 11.799 19.226 8.965l82.573-30.053C318.16 710.018 429.396 757.58 556.697 757.58c118.477 0 223.04-41.199 285.462-97.875l92.312 33.598c7.786 2.834 16.395-1.18 19.227-8.965l6.841-18.793c2.832-7.783-1.182-16.393-8.965-19.225l-74.001-26.936c5.854-8.684 10.778-17.555 14.672-26.545h66.453c8.281 0 15-6.717 15-15v-20c-0.001-8.284-6.719-14.999-15.001-14.999z" fill="#696969" p-id="9762"></path><path d="M960.445 535.07h-55.771c-0.317-38.673-20.947-82.273-56.221-122.124h1.411L765.68 267.129l-33.774 58.5c-51.009-25.007-110.254-40.817-173.467-40.817-62.573 0-121.265 15.488-171.921 40.059L353.18 267.13l-83.145 144.008c-31.274 34.793-51.367 72.559-56.509 107.478H152.95c-8.286 0-15 6.717-15 15v20c0 8.283 6.714 15 15 15h64.021c2.776 9.607 6.734 19.127 11.787 28.482l-68.686 25c-7.783 2.832-11.8 11.439-8.965 19.223l6.84 18.795c2.835 7.785 11.443 11.799 19.227 8.965l82.573-30.055c60.156 63.223 171.392 110.787 298.694 110.787 118.477 0 223.039-41.199 285.461-97.877l92.314 33.6c7.788 2.834 16.396-1.18 19.229-8.965l6.841-18.795c2.832-7.783-1.182-16.391-8.965-19.223l-74.009-26.938c5.859-8.684 10.786-17.553 14.678-26.545h66.455c8.281 0 15-6.717 15-15v-20c0-8.283-6.718-15-15-15z" fill="#FFFFFF" p-id="9763"></path><path d="M482.931 501.592c0 22.781-18.467 41.248-41.245 41.248-22.783 0-41.25-18.467-41.25-41.248s18.467-41.248 41.25-41.248c22.778 0 41.245 18.467 41.245 41.248zM732.931 501.592c0 22.781-18.467 41.248-41.245 41.248-22.783 0-41.25-18.467-41.25-41.248s18.467-41.248 41.25-41.248c22.778 0 41.245 18.467 41.245 41.248zM342.062 308.884c-0.449-2.202-0.605-4.424-0.527-6.663 0.068-2.238 0.407-4.494 1.155-6.709 0.783-2.158 2.061-4.426 4.25-5.717 2.16-1.338 4.777-1.299 6.841-0.494-2.236 0.228-4.284 0.811-5.713 2.088-1.44 1.242-2.358 3.029-3.022 4.953-1.368 3.883-1.845 8.216-2.984 12.542zM393.937 334.301c7.104-4.953 14.81-8.991 22.634-12.702 7.85-3.677 15.906-6.909 24.1-9.753 16.411-5.633 33.34-9.717 50.464-12.532 34.282-5.62 69.284-5.933 103.818-2.595 34.521 3.513 68.708 12.094 100.241 26.726 7.898 3.584 15.599 7.604 23.436 11.155 3.906 1.67 7.969 3.477 12.051 3.493 2.023-0.005 3.908-0.801 5.264-2.29 1.316-1.553 2.617-3.367 3.843-5.103 9.792-14.165 16.851-30.215 21.65-46.816-2.109 8.396-4.966 16.604-8.33 24.595-3.403 7.969-7.349 15.754-12.231 22.971-1.245 1.814-2.43 3.551-3.889 5.315-1.531 1.771-3.945 2.822-6.263 2.832-4.655 0.015-8.755-1.836-12.764-3.464-7.979-3.489-15.684-7.386-23.597-10.853-15.756-7.044-32.038-12.878-48.752-17.148-16.699-4.319-33.758-7.161-50.913-8.955-34.323-3.538-69.128-3.147-103.274 1.985-17.067 2.568-33.952 6.462-50.378 11.799-8.223 2.648-16.323 5.686-24.231 9.172-7.884 3.526-15.668 7.379-22.879 12.168z" fill="#231815" p-id="9764"></path><path d="M435.623 548.885c4.92-0.674 9.648-2.047 14.256-3.641 4.595-1.65 9.048-3.645 13.286-6.035 8.54-4.709 16.152-10.9 23.271-17.824-5.608 8.215-13.276 15.102-22.056 20.006-4.404 2.428-9.07 4.395-13.918 5.709-4.831 1.32-9.86 2.08-14.839 1.785zM689.771 546.801c2.847-0.645 5.649-1.387 8.394-2.32a87.631 87.631 0 0 0 8.125-2.979c5.293-2.254 10.425-4.863 15.173-8.057 4.783-3.141 9.163-6.855 13.104-11.016 3.936-4.176 7.28-8.91 10.205-13.96-0.977 2.755-2.28 5.392-3.706 7.968a60.24 60.24 0 0 1-5.054 7.256c-3.721 4.605-8.252 8.541-13.166 11.834-4.949 3.252-10.291 5.889-15.877 7.764-5.576 1.879-11.348 3.24-17.198 3.51zM145.499 529.094c3.021-0.16 6.032-0.188 9.048-0.307l9.033-0.133 18.047-0.139 18.018-0.148c3.003-0.043 6.001-0.145 8.984-0.365 1.496-0.082 2.988-0.199 4.468-0.404 1.46-0.252 2.983-0.428 4.277-1.213-1.152 1.02-2.695 1.447-4.141 1.859-1.474 0.396-2.964 0.703-4.46 0.975-3.001 0.473-6.014 0.791-9.026 1.066-6.03 0.539-12.075 0.672-18.11 0.729-6.035-0.006-12.068-0.102-18.094-0.445-6.022-0.321-12.043-0.725-18.044-1.475zM157.687 635.76l9.844-3.979 9.878-3.85 19.729-7.695a694.524 694.524 0 0 0 19.588-7.959c3.242-1.377 6.447-2.83 9.568-4.438 3.093-1.611 6.345-3.174 8.654-5.863-0.864 1.572-2.275 2.764-3.662 3.871-1.406 1.098-2.886 2.102-4.39 3.059-3.044 1.854-6.191 3.514-9.36 5.117-6.353 3.186-12.902 5.918-19.484 8.537-6.607 2.559-13.258 4.998-19.996 7.174-6.73 2.2-13.494 4.291-20.369 6.026zM961.854 546.801c-5.664 0.955-11.374 1.498-17.094 1.9-5.721 0.424-11.463 0.545-17.209 0.473-5.743-0.141-11.508-0.439-17.215-1.432-2.848-0.514-5.693-1.127-8.443-2.148-1.354-0.553-2.689-1.211-3.871-2.115-1.158-0.883-2.166-2.273-2-3.76 0.129 1.477 1.229 2.512 2.378 3.215 1.198 0.689 2.526 1.143 3.88 1.494 2.695 0.748 5.505 1.137 8.317 1.41 5.63 0.523 11.312 0.754 16.999 0.84 5.689 0.131 11.39 0.078 17.098 0.111l8.569-0.037 8.591 0.049zM531.725 676.609c-13.384 0-23.711-10.965-24.162-11.451l2.746-2.551c0.105 0.111 10.474 11.055 22.844 10.203 7.305-0.512 13.992-5.033 19.871-13.438l1.623-2.32 1.504 2.398c4.705 7.51 10.306 11.553 16.648 12.014 13.198 0.998 25.835-13.648 25.959-13.797l2.857 2.43c-0.563 0.662-13.924 16.195-29.078 15.109-6.904-0.5-12.966-4.365-18.049-11.498-6.199 7.988-13.286 12.307-21.099 12.844-0.561 0.04-1.113 0.057-1.664 0.057z" fill="#231815" p-id="9765">
                </path>
              </svg>
              :
              //绿标，开启修改
              <svg
                viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="9895"
                width="32" height="32">
                <path d="M1011.541 399.886c59.995 266.134-108.34 530.792-375.988 591.128C367.9 1051.352 102.295 884.518 42.299 618.381-17.695 352.246 158.442 85.83 418.289 27.252c267.649-60.337 533.256 106.498 593.252 372.634z"
                  fill="#eaff8f" p-id="9896" data-spm-anchor-id="a313x.7781069.0.i38" ></path><path d="M1011.541 399.886c7.166 31.608 11.256 63.911 12.244 96.322 0.456 16.207 0.199 32.439-0.896 48.628a512.933 512.933 0 0 1-5.604 48.35c-10.573 64.1-33.711 126.213-67.727 182.023-33.984 55.816-78.813 105.383-131.766 144.824-26.482 19.689-54.896 36.975-84.859 51.271a517.554 517.554 0 0 1-93.674 34.154c-32.303 8.363-65.529 13.684-99.07 15.664-33.537 1.949-67.384 0.67-100.845-4.057-33.449-4.752-66.552-12.719-98.568-24.035a505.054 505.054 0 0 1-47.163-19.316 505.518 505.518 0 0 1-45.1-23.963c-58.568-34.916-110.292-81.867-150.688-137.4-20.227-27.734-37.597-57.602-51.791-88.912a515.981 515.981 0 0 1-18.867-47.969 525.836 525.836 0 0 1-13.922-49.605C5.633 592.309 1.416 557.93 0.887 523.506c-0.305-17.209 0.329-34.429 1.84-51.558a492.027 492.027 0 0 1 7.14-51.03c12.968-67.471 39.819-131.867 77.651-188.507a524.198 524.198 0 0 1 64.469-78.82c23.908-24.077 50.201-45.677 78.216-64.564 28.015-18.899 57.916-34.858 88.979-47.746a497.242 497.242 0 0 1 96.261-28.83C480.94-0.179 548.66 0.053 613.379 13.073c64.767 12.917 126.523 38.492 181.168 74.341 54.668 35.835 102.211 82.027 139.256 135.395a512.264 512.264 0 0 1 25.803 41.274c7.936 14.152 15.129 28.708 21.671 43.542 6.533 14.84 12.278 30.017 17.349 45.41a498.784 498.784 0 0 1 12.915 46.851z m0 0a498.168 498.168 0 0 0-13.055-46.804c-5.109-15.376-11.059-30.467-17.697-45.239-6.629-14.778-14.083-29.177-22.197-43.181a466.594 466.594 0 0 0-26.467-40.66c-37.99-52.373-86.719-96.688-141.928-129.648a476.804 476.804 0 0 0-42.515-22.613 476.361 476.361 0 0 0-44.457-18.223c-30.173-10.687-61.374-18.175-92.883-22.652-31.521-4.459-63.397-5.645-94.983-3.805-31.606 1.882-62.855 6.891-93.383 14.806-30.343 7.868-59.875 18.854-87.902 32.559-28.064 13.674-54.611 30.211-79.358 48.96-49.464 37.581-91.366 84.489-123.364 137.042-32.017 52.549-54.087 110.827-64.377 170.926a479.143 479.143 0 0 0-5.523 45.328 472.974 472.974 0 0 0-1.059 45.583c0.809 30.383 4.582 60.664 11.344 90.311a466.495 466.495 0 0 0 12.207 44.004c4.756 14.459 10.192 28.693 16.34 42.617 12.244 27.871 27.235 54.537 44.644 79.576 34.823 50.074 79.521 93.473 130.952 127.152 51.405 33.699 109.508 57.754 170.431 69.893 60.896 12.238 124.542 12.484 186.37 0.563 30.91-5.943 61.346-14.84 90.688-26.717 29.324-11.904 57.62-26.648 84.17-44.227 26.547-17.568 51.51-37.736 74.178-60.344a481.432 481.432 0 0 0 61.026-74.229c35.718-53.475 60.706-114.42 72.542-178.029a465.99 465.99 0 0 0 6.456-48.084c1.322-16.131 1.872-32.336 1.521-48.53-0.344-16.191-1.443-32.375-3.429-48.456a498.72 498.72 0 0 0-8.292-47.879z" fill="#B1DAE0" p-id="9897"></path><path d="M958.697 542.84h-55.771c-0.317-38.675-20.939-82.273-56.216-122.125h1.413l-84.187-145.818-33.774 58.502c-51.008-25.008-110.254-40.818-173.467-40.818-62.573 0-121.265 15.488-171.922 40.059l-33.337-57.742-83.145 144.01c-31.274 34.792-51.367 72.559-56.509 107.478h-60.576c-8.286 0-15 6.715-15 15v20c0 8.283 6.714 15 15 15h64.021c2.775 9.605 6.732 19.125 11.787 28.48l-68.688 25c-7.783 2.832-11.799 11.441-8.965 19.225l6.842 18.793c2.834 7.785 11.442 11.799 19.226 8.965l82.573-30.053C318.16 710.018 429.396 757.58 556.697 757.58c118.477 0 223.04-41.199 285.462-97.875l92.312 33.598c7.786 2.834 16.395-1.18 19.227-8.965l6.841-18.793c2.832-7.783-1.182-16.393-8.965-19.225l-74.001-26.936c5.854-8.684 10.778-17.555 14.672-26.545h66.453c8.281 0 15-6.717 15-15v-20c-0.001-8.284-6.719-14.999-15.001-14.999z" fill="#696969" p-id="9898"></path><path d="M960.445 535.07h-55.771c-0.317-38.673-20.947-82.273-56.221-122.124h1.411L765.68 267.129l-33.774 58.5c-51.009-25.007-110.254-40.817-173.467-40.817-62.573 0-121.265 15.488-171.921 40.059L353.18 267.13l-83.145 144.008c-31.274 34.793-51.367 72.559-56.509 107.478H152.95c-8.286 0-15 6.717-15 15v20c0 8.283 6.714 15 15 15h64.021c2.776 9.607 6.734 19.127 11.787 28.482l-68.686 25c-7.783 2.832-11.8 11.439-8.965 19.223l6.84 18.795c2.835 7.785 11.443 11.799 19.227 8.965l82.573-30.055c60.156 63.223 171.392 110.787 298.694 110.787 118.477 0 223.039-41.199 285.461-97.877l92.314 33.6c7.788 2.834 16.396-1.18 19.229-8.965l6.841-18.795c2.832-7.783-1.182-16.391-8.965-19.223l-74.009-26.938c5.859-8.684 10.786-17.553 14.678-26.545h66.455c8.281 0 15-6.717 15-15v-20c0-8.283-6.718-15-15-15z" fill="#FFFFFF" p-id="9899"></path><path d="M482.931 501.592c0 22.781-18.467 41.248-41.245 41.248-22.783 0-41.25-18.467-41.25-41.248s18.467-41.248 41.25-41.248c22.778 0 41.245 18.467 41.245 41.248zM732.931 501.592c0 22.781-18.467 41.248-41.245 41.248-22.783 0-41.25-18.467-41.25-41.248s18.467-41.248 41.25-41.248c22.778 0 41.245 18.467 41.245 41.248zM342.062 308.884c-0.449-2.202-0.605-4.424-0.527-6.663 0.068-2.238 0.407-4.494 1.155-6.709 0.783-2.158 2.061-4.426 4.25-5.717 2.16-1.338 4.777-1.299 6.841-0.494-2.236 0.228-4.284 0.811-5.713 2.088-1.44 1.242-2.358 3.029-3.022 4.953-1.368 3.883-1.845 8.216-2.984 12.542zM393.937 334.301c7.104-4.953 14.81-8.991 22.634-12.702 7.85-3.677 15.906-6.909 24.1-9.753 16.411-5.633 33.34-9.717 50.464-12.532 34.282-5.62 69.284-5.933 103.818-2.595 34.521 3.513 68.708 12.094 100.241 26.726 7.898 3.584 15.599 7.604 23.436 11.155 3.906 1.67 7.969 3.477 12.051 3.493 2.023-0.005 3.908-0.801 5.264-2.29 1.316-1.553 2.617-3.367 3.843-5.103 9.792-14.165 16.851-30.215 21.65-46.816-2.109 8.396-4.966 16.604-8.33 24.595-3.403 7.969-7.349 15.754-12.231 22.971-1.245 1.814-2.43 3.551-3.889 5.315-1.531 1.771-3.945 2.822-6.263 2.832-4.655 0.015-8.755-1.836-12.764-3.464-7.979-3.489-15.684-7.386-23.597-10.853-15.756-7.044-32.038-12.878-48.752-17.148-16.699-4.319-33.758-7.161-50.913-8.955-34.323-3.538-69.128-3.147-103.274 1.985-17.067 2.568-33.952 6.462-50.378 11.799-8.223 2.648-16.323 5.686-24.231 9.172-7.884 3.526-15.668 7.379-22.879 12.168z" fill="#231815" p-id="9900"></path><path d="M435.623 548.885c4.92-0.674 9.648-2.047 14.256-3.641 4.595-1.65 9.048-3.645 13.286-6.035 8.54-4.709 16.152-10.9 23.271-17.824-5.608 8.215-13.276 15.102-22.056 20.006-4.404 2.428-9.07 4.395-13.918 5.709-4.831 1.32-9.86 2.08-14.839 1.785zM689.771 546.801c2.847-0.645 5.649-1.387 8.394-2.32a87.631 87.631 0 0 0 8.125-2.979c5.293-2.254 10.425-4.863 15.173-8.057 4.783-3.141 9.163-6.855 13.104-11.016 3.936-4.176 7.28-8.91 10.205-13.96-0.977 2.755-2.28 5.392-3.706 7.968a60.24 60.24 0 0 1-5.054 7.256c-3.721 4.605-8.252 8.541-13.166 11.834-4.949 3.252-10.291 5.889-15.877 7.764-5.576 1.879-11.348 3.24-17.198 3.51zM145.499 529.094c3.021-0.16 6.032-0.188 9.048-0.307l9.033-0.133 18.047-0.139 18.018-0.148c3.003-0.043 6.001-0.145 8.984-0.365 1.496-0.082 2.988-0.199 4.468-0.404 1.46-0.252 2.983-0.428 4.277-1.213-1.152 1.02-2.695 1.447-4.141 1.859-1.474 0.396-2.964 0.703-4.46 0.975-3.001 0.473-6.014 0.791-9.026 1.066-6.03 0.539-12.075 0.672-18.11 0.729-6.035-0.006-12.068-0.102-18.094-0.445-6.022-0.321-12.043-0.725-18.044-1.475zM157.687 635.76l9.844-3.979 9.878-3.85 19.729-7.695a694.524 694.524 0 0 0 19.588-7.959c3.242-1.377 6.447-2.83 9.568-4.438 3.093-1.611 6.345-3.174 8.654-5.863-0.864 1.572-2.275 2.764-3.662 3.871-1.406 1.098-2.886 2.102-4.39 3.059-3.044 1.854-6.191 3.514-9.36 5.117-6.353 3.186-12.902 5.918-19.484 8.537-6.607 2.559-13.258 4.998-19.996 7.174-6.73 2.2-13.494 4.291-20.369 6.026zM961.854 546.801c-5.664 0.955-11.374 1.498-17.094 1.9-5.721 0.424-11.463 0.545-17.209 0.473-5.743-0.141-11.508-0.439-17.215-1.432-2.848-0.514-5.693-1.127-8.443-2.148-1.354-0.553-2.689-1.211-3.871-2.115-1.158-0.883-2.166-2.273-2-3.76 0.129 1.477 1.229 2.512 2.378 3.215 1.198 0.689 2.526 1.143 3.88 1.494 2.695 0.748 5.505 1.137 8.317 1.41 5.63 0.523 11.312 0.754 16.999 0.84 5.689 0.131 11.39 0.078 17.098 0.111l8.569-0.037 8.591 0.049zM531.725 676.609c-13.384 0-23.711-10.965-24.162-11.451l2.746-2.551c0.105 0.111 10.474 11.055 22.844 10.203 7.305-0.512 13.992-5.033 19.871-13.438l1.623-2.32 1.504 2.398c4.705 7.51 10.306 11.553 16.648 12.014 13.198 0.998 25.835-13.648 25.959-13.797l2.857 2.43c-0.563 0.662-13.924 16.195-29.078 15.109-6.904-0.5-12.966-4.365-18.049-11.498-6.199 7.988-13.286 12.307-21.099 12.844-0.561 0.04-1.113 0.057-1.664 0.057z" fill="#231815" p-id="9901">
                </path></svg>

            }

          </div>




          <Input className={styles.meeting} id='meeting'
            insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>会议号</span>}
            readonly={this.state.check}
            value={this.state.meeting}
            style={{ width: 210 }}
            onChange={(e, v) => this.onInputChange(v)} />
        </div>

        {/*第二行，放时间信息 */}
        {this.state.rights === '1' && this.state.check === false ?
          <div className={styles.firstRow}>
            <DatePicker type="dateTime"
              insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>时间</span>}
              value={this.state.time}
              style={{ width: 210, marginRight: '5%' }}
              timePickerOpts={{
                scrollItemProps: { cycled: false },
              }}
              needConfirm={true}
              disabledTime={this.disabledTime}
              onConfirm={(...args) => this.dataConfirm(...args)}
              onCancel={(...args) => {
                console.log('Canceled: ', ...args);
              }}
            ></DatePicker>

            <Input className={styles.meeting} id='schedule'
              readonly
              value={this.state.time === null ? '' : '周' + a[moment(this.state.time).day()]}
              style={{ width: 60 }} />

            <DatePicker type="dateTime"
              value={this.state.endtime}
              style={{ width: 210, marginLeft: '5%' }}
              timePickerOpts={{
                scrollItemProps: { cycled: false },
              }}
              needConfirm={true}
              disabledTime={this.disabledTime}
              onConfirm={(...args) => this.dataConfirmEnd(...args)}
              onCancel={(...args) => {
                console.log('Canceled: ', ...args);
              }}
            ></DatePicker>
          </div>
          :
          //非管理员不得更改
          <div className={styles.firstRow}>
            <Input 
              insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>时间</span>}
              value={time}
              style={{ width: 210, marginRight: '5%' }}
              readonly
            ></Input>

            <Input className={styles.meeting} id='schedule'
              readonly
              value={this.state.time === null ? '' : '周' + a[moment(this.state.time).day()]}
              style={{ width: 60 }} />

            <Input type="dateTime"
              value={endtime}
              style={{ width: 210, marginLeft: '5%' }}
              readonly
            ></Input>
          </div>
        }

        {/*第三行，放辩题信息 */}
        <div className={styles.firstRow}>
          <Input className={styles.topic} id='topic'
            readonly={this.state.check}
            insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>辩题</span>}
            style={{ fontSize: '24px', width: '100%' }}
            placeholder='请填写'
            value={this.state.topic}
            onChange={(e, v) => this.onInputChange(v)} />
        </div>

        {/*第四行，放正反方信息 */}
        {this.state.rights === '1' && this.state.check === false ?
          <div className={styles.firstRow}>
            <Select placeholder='请选择' id='z'
              insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>正方</span>}
              style={{ width: '44%' }}
              value={this.state.z}
              optionList={this.state.teams}
              onChange={(e) => this.onChange(e)}
              onFocus={() => this.setState({ changeId: 'z' })}
            ></Select>

            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8042" id="mx_n_1657097586450" data-spm-anchor-id="a313x.7781069.0.i25" width="36" height="36"><path d="M448 608L608 192h384l-64 160h-192l-64 128h192l-192 416h-320l64-160H576l64-128H448z" fill="#F8B304" p-id="8043"></path><path d="M672 928h-320c-12.8 0-19.2-6.4-25.6-12.8-6.4-12.8-6.4-19.2-6.4-32l64-160c6.4-12.8 19.2-19.2 32-19.2h140.8l32-64H448c-12.8 0-19.2-6.4-25.6-12.8s-6.4-19.2-6.4-32L576 179.2c6.4-12.8 19.2-19.2 32-19.2h384c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 6.4 32l-64 160c-6.4 12.8-19.2 19.2-32 19.2h-172.8l-32 64h140.8c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 0 32l-192 416c0 12.8-12.8 19.2-25.6 19.2z m-275.2-64h249.6L812.8 512h-140.8c-12.8 0-19.2-6.4-25.6-12.8-6.4-6.4-6.4-19.2 0-32l64-128c0-12.8 12.8-19.2 25.6-19.2h172.8l38.4-96h-320L492.8 576H640c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-64 128c0 12.8-12.8 19.2-25.6 19.2H435.2l-38.4 96z" p-id="8044"></path><path d="M256 192H64l230.4 556.8c19.2 51.2 96 51.2 121.6 0L640 192H448L352 480 256 192z" fill="#AECFFF" p-id="8045"></path><path d="M352 825.6c-38.4 0-76.8-25.6-89.6-57.6L32 204.8c-6.4-12.8 0-19.2 0-32 12.8-6.4 19.2-12.8 32-12.8h192c12.8 0 25.6 6.4 32 19.2l64 198.4 64-198.4c6.4-12.8 19.2-19.2 32-19.2h192c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-230.4 556.8c-6.4 38.4-44.8 64-83.2 64zM108.8 224l211.2 512c6.4 19.2 25.6 19.2 32 19.2s19.2 0 32-19.2l211.2-512H473.6L384 492.8c-12.8 25.6-51.2 25.6-64 0L230.4 224H108.8z" p-id="8046"></path></svg>

            <Select placeholder='请选择' id='f'
              insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>反方</span>}
              style={{ width: '44%' }}
              value={this.state.f}
              optionList={this.state.teams}
              onChange={(e) => this.onChange(e)}
              onFocus={() => this.setState({ changeId: 'f' })}
            ></Select>
          </div>
          :
          <div className={styles.firstRow}>
            <Input placeholder='请选择' id='z'
              insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>正方</span>}
              style={{ width: '44%' }}
              readonly
              value={this.state.z}
            ></Input>

            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8042" id="mx_n_1657097586450" data-spm-anchor-id="a313x.7781069.0.i25" width="36" height="36"><path d="M448 608L608 192h384l-64 160h-192l-64 128h192l-192 416h-320l64-160H576l64-128H448z" fill="#F8B304" p-id="8043"></path><path d="M672 928h-320c-12.8 0-19.2-6.4-25.6-12.8-6.4-12.8-6.4-19.2-6.4-32l64-160c6.4-12.8 19.2-19.2 32-19.2h140.8l32-64H448c-12.8 0-19.2-6.4-25.6-12.8s-6.4-19.2-6.4-32L576 179.2c6.4-12.8 19.2-19.2 32-19.2h384c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 6.4 32l-64 160c-6.4 12.8-19.2 19.2-32 19.2h-172.8l-32 64h140.8c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 0 32l-192 416c0 12.8-12.8 19.2-25.6 19.2z m-275.2-64h249.6L812.8 512h-140.8c-12.8 0-19.2-6.4-25.6-12.8-6.4-6.4-6.4-19.2 0-32l64-128c0-12.8 12.8-19.2 25.6-19.2h172.8l38.4-96h-320L492.8 576H640c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-64 128c0 12.8-12.8 19.2-25.6 19.2H435.2l-38.4 96z" p-id="8044"></path><path d="M256 192H64l230.4 556.8c19.2 51.2 96 51.2 121.6 0L640 192H448L352 480 256 192z" fill="#AECFFF" p-id="8045"></path><path d="M352 825.6c-38.4 0-76.8-25.6-89.6-57.6L32 204.8c-6.4-12.8 0-19.2 0-32 12.8-6.4 19.2-12.8 32-12.8h192c12.8 0 25.6 6.4 32 19.2l64 198.4 64-198.4c6.4-12.8 19.2-19.2 32-19.2h192c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-230.4 556.8c-6.4 38.4-44.8 64-83.2 64zM108.8 224l211.2 512c6.4 19.2 25.6 19.2 32 19.2s19.2 0 32-19.2l211.2-512H473.6L384 492.8c-12.8 25.6-51.2 25.6-64 0L230.4 224H108.8z" p-id="8046"></path></svg>

            <Input placeholder='请选择' id='f'
              insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>反方</span>}
              style={{ width: '44%' }}
              value={this.state.f}
              readonly
            ></Input>
          </div>
        }


        {/*第五行，放评委信息 */}
        <div className={styles.firstRow}>
          <Input className={styles.judge1} id='judge1'
            readonly={this.state.check}
            placeholder='请填写'
            value={this.state.judge1}
            onChange={(e, v) => this.onInputChange(v)} />

          <Input className={styles.judge2} id='judge2'
            readonly={this.state.check}
            placeholder='请填写'
            value={this.state.judge2}
            onChange={(e, v) => this.onInputChange(v)} />

          <Input className={styles.judge3} id='judge3'
            readonly={this.state.check}
            placeholder='请填写'
            value={this.state.judge3}
            onChange={(e, v) => this.onInputChange(v)} />
        </div>

        {
          //工作人员页显示
          this.props.selectedKey === 'work' ?

            <div className={styles.work}>
              <Divider />
              {/* 第六行，正反方辩题，用于生成计时码 */}
              <div className={styles.firstRow}>
                <Input className={styles.topicZ} id='topicZ'
                  value={this.state.topicZ}
                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>正方辩题</span>}
                  placeholder='请填写'
                  readonly={this.state.check}
                  onChange={(e, v) => this.onInputChange(v)} />

                <Input className={styles.topicF} id='topicF'
                  readonly={this.state.check}
                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>反方辩题</span>}
                  placeholder='请填写'
                  value={this.state.topicF}
                  onChange={(e, v) => this.onInputChange(v)} />
              </div>

              {/* 第七、八行，工作人员信息*/}
              <div className={styles.firstRow}>
                <Input className={styles.judge1} id='host'

                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>主席</span>}
                  placeholder='请填写'
                  value={this.state.host}
                  onChange={(e, v) => this.onInputChange(v)} />

                <Input className={styles.judge2} id='timer'

                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>计时</span>}
                  placeholder='请填写'
                  value={this.state.timer}
                  onChange={(e, v) => this.onInputChange(v)} />

                <Input className={styles.judge3} id='control'

                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>场控</span>}
                  placeholder='请填写'
                  value={this.state.control}
                  onChange={(e, v) => this.onInputChange(v)} />
              </div>

              {/* 第七、八行，工作人员信息*/}
              <div className={styles.firstRow}>
                <Input className={styles.judge1} id='teamContact'

                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>队伍负责</span>}
                  placeholder='请填写'
                  value={this.state.teamContact}
                  onChange={(e, v) => this.onInputChange(v)} />

                <Button type="secondary"
                  disabled={this.state.topicZ === null || '' ? true : false}
                  onClick={() => this.buildCode()}
                >生成计时链接</Button>

                <Input className={styles.judge2} id='judgeContact'

                  insetLabel={<span style={{ marginLeft: 5, color: "var(--semi-color-text-2)" }}>评委负责</span>}
                  placeholder='请填写'
                  value={this.state.judgeContact}
                  onChange={(e, v) => this.onInputChange(v)} />
              </div>

              {
                this.state.urlOpen ?
                  <div className={styles.firstRow}>
                    <Card title="点击右侧复制，点击链接跳转" extra={
                      <IconCopy
                        style={{ cursor: 'pointer', color: '#40a9ff' }}
                        onClick={() => this.Copy()}
                      />
                    } style={{ width: '100%' }}>

                      <a id="url" href={this.state.url0} target='_blank'>{this.state.url0}</a>
                    </Card>
                  </div>
                  : ''
              }
            </div>
            : ''
        }
      </div>
    )
  }
}
