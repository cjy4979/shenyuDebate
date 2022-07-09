import React, { useEffect, useState } from 'react'
import styles from './questionnaire.less';
import onlineLogo from '../../../images/online.png'
import Ques from '@/components/Ques/Ques'

export default function questionnaire() {
    return (
        <div className={styles.ques_bg}>
            <div className={styles.content_wrap}>
                <div className={styles.contents}>
                    <div className={styles.online}>
                        <img src={onlineLogo} alt="logo" style={{ height: "100%", width: "100%" }} />
                    </div>
                    <div className={styles.ques_title}>
                        深语10.0赛果收集
                </div>
                <Ques/>
                </div>

            </div>
        </div>
    )
};