import { Link } from 'umi';
import styles from './index.less';
import onlineLogo from '@/images/online.png'
import { Typography} from '@douyinfe/semi-ui';
const { Title,Text } = Typography;

export default function IndexPage() {
  return (
    <div className={styles.bg}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={onlineLogo} alt="logo" style={{ height: "100%" }} />
        </div>
        <div className={styles.headerFoot}>
          <button className={styles.button}>
            <Link className={styles.link} to='/statistics' > 赛事管理</Link>
            </button>
          <button className={styles.button}>
          <Link className={styles.link} to='/vj/questionnaire'> 赛果填写</Link>
          </button>
        </div>


      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          深语10.0 宠物主题网辩赛
        </div>
        <div className={styles.drop}>
          <svg className={styles.peticon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2569" width="6em" height="6em"><path d="M298.666667 298.666667V213.333333a85.333333 85.333333 0 0 1 170.666666 0v85.333334a85.333333 85.333333 0 0 1-170.666666 0z m341.333333 85.333333a85.333333 85.333333 0 0 0 85.333333-85.333333V213.333333a85.333333 85.333333 0 0 0-170.666666 0v85.333334a85.333333 85.333333 0 0 0 85.333333 85.333333z m-341.333333 128v-42.666667a85.333333 85.333333 0 0 0-170.666667 0v42.666667a85.333333 85.333333 0 0 0 170.666667 0z m512-128a85.333333 85.333333 0 0 0-85.333334 85.333333v42.666667a85.333333 85.333333 0 0 0 170.666667 0v-42.666667a85.333333 85.333333 0 0 0-85.333333-85.333333z m-93.866667 290.133333a298.666667 298.666667 0 0 1-55.893333-76.8l-40.106667-79.786666A85.333333 85.333333 0 0 0 544.426667 469.333333h-64.853334a85.333333 85.333333 0 0 0-76.373333 47.36L363.093333 597.333333a298.666667 298.666667 0 0 1-55.893333 76.8l-68.693333 68.693334A85.333333 85.333333 0 0 0 213.333333 803.413333V810.666667a85.333333 85.333333 0 0 0 85.333334 85.333333h426.666666a85.333333 85.333333 0 0 0 85.333334-85.333333v-7.253334a85.333333 85.333333 0 0 0-25.173334-60.586666z" p-id="2570" fill="#515151"></path></svg>
        </div>
       

      </div>
      <div className={styles.footer}>
        <Text type="secondary">COPYRIGHT © 2022 jiyu.Chen, All rights Reserved.</Text>
        <a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2022015095号-2</a>
      </div>

      
    </div>
  );
}
