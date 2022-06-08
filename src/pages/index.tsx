import styles from './index.less';
import List from '@/components/schedule/List';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <List/>
    </div>
  );
}
