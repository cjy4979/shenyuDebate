import React, { Component, useEffect, useState } from 'react'
import styles from './List.less'
import { DatePicker, Button, Switch, Input, Toast, Select } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';
import { range } from 'lodash-es';

export default class List extends Component<any, any>  {
  state = {
    id: this.props.id,
    z: this.props.z,
    f: this.props.f,
    topicZ: this.props.topicZ,
    topicF: this.props.topicF,
    topic: this.props.topic,
    time: this.props.time,
    schedule: this.props.schedule,
    meeting: this.props.meeting,
    judge1: this.props.judge1,
    judge2: this.props.judge2,
    judge3: this.props.judge3,
    type:this.props.type,
    check: true //防误删开关
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
    this.setState({
      time: date[1],
    }, () => {
      var data = {
        id: this.state.id,
        time: this.state.time
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
          data.msg === "success" ? Toast.success('更新成功') : Toast.error('更新失败')
        }
      )
    })
  }

  //赛程
  onSelect = (e:any) =>{
    this.setState({
      type:e.value
    },() => { 
      var data = {
        id:this.state.id,
        type:this.state.type
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

  //更新赛程信息
  onChange = (e: { target: { value: any; id: any }; }) => {
    this.setState({
      [e.target.id]: e.target.value,
    }, () => {
      var data = {
        id: this.state.id,
        [e.target.id]: e.target.value
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
      }
    )
  }



  render() {
    //赛程
    const list = [
      { value: '预赛', label: '预赛', otherKey:0 },
      { value: '初赛', label: '初赛', otherKey: 1 },
      { value: '复赛', label: '复赛', otherKey: 2 },
      { value: '半决赛', label: '半决赛', otherKey: 3 },
      { value: '决赛', label: '决赛', otherKey: 3 },
    ];

    return (
      <div className={styles.main}>
        <div className={styles.firstRow}>
          <input className={styles.Z} id='z'
            defaultValue={this.state.z}
            disabled={this.state.check}
            onChange={(e) => this.onChange(e)} />

          <input className={styles.F} id='f'
            disabled={this.state.check}
            defaultValue={this.state.f}
            onChange={(e) => this.onChange(e)} />

          <DatePicker type="dateTime"
            defaultValue={this.state.time}
            needConfirm={true}
            disabledTime={this.disabledTime}
            onConfirm={(...args) => this.dataConfirm(...args)}
            onCancel={(...args) => {
              console.log('Canceled: ', ...args);
            }}
          ></DatePicker>
          <Button type="danger" disabled={this.state.check} onClick={() => this.Delete()}>删除</Button>

        </div>
        <div className={styles.firstRow}>
          <input className={styles.meeting} id='meeting'
            disabled={this.state.check}
            defaultValue={this.state.meeting}
            onChange={(e) => this.onChange(e)} />

          <input className={styles.schedule} id='schedule'
            disabled={this.state.check}
            defaultValue={this.state.schedule}
            onChange={(e) => this.onChange(e)} />
          <Switch defaultChecked={this.state.check} onChange={(v, e) => { this.setState({ check: e.target.checked }) }}></Switch>
        </div>



        <div className={styles.firstRow}>
          <input className={styles.topicZ} id='topicZ'
            disabled={this.state.check}
            defaultValue={this.state.topicZ}
            onChange={(e) => this.onChange(e)} />
          <input className={styles.topicF} id='topicF'
            disabled={this.state.check}
            defaultValue={this.state.topicF}
            onChange={(e) => this.onChange(e)} />
        </div>



        <div className={styles.firstRow}>
          <input className={styles.topic} id='topic'
            disabled={this.state.check}
            defaultValue={this.state.topic}
            onChange={(e) => this.onChange(e)} />
        </div>



        <div className={styles.firstRow}>
          <input className={styles.judge1} id='judge1'
            disabled={this.state.check}
            defaultValue={this.state.judge1}
            onChange={(e) => this.onChange(e)} />

          <input className={styles.judge2} id='judge2'
            disabled={this.state.check}
            defaultValue={this.state.judge2}
            onChange={(e) => this.onChange(e)} />

          <input className={styles.judge3} id='judge2'
            disabled={this.state.check}
            defaultValue={this.state.judge3}
            onChange={(e) => this.onChange(e)} />
        </div>
        <Select className={styles.judge4} id='type'
          style={{ width: 140 }} optionList={list}
          disabled={this.state.check}
          defaultValue={this.state.type ===null?'预赛':this.state.type}
          // defaultValue={this.state.judge2}
          onSelect={(v:any, e:any) => this.onSelect(e)}
          ></Select>
      </div>
    )
  }
}
