import { message } from 'antd';
import { Redirect } from 'umi'
import { getCookie } from '../../utils/auth'

export default (props: any) => {
    if (getCookie('rights') !== '') {
        return <div>{props.children}</div>;

    } else {
        return <Redirect to="/login" />;
    }
}