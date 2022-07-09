import React, { useState, useEffect } from 'react'
import styles from './success.less'
import { Result } from 'antd';
import onlineLogo from '../../../images/online.png'

export default function success() {
    return (
        <div className={styles.successBg}>
            <div className={styles.header}>
                <div className={styles.online}>
                    <img src={onlineLogo} alt="logo" style={{ height: "100%", width: "100%" }} />
                </div>
            </div>
            <div className={styles.result}>
                <Result
                    status="success"
                    title="提交成功"
                    subTitle="已收到您的赛果，如有述票顺序要求，请移步评委联络群"

                />
            </div>
        </div>
    )
}
