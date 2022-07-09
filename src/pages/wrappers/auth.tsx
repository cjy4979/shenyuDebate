import { Redirect } from 'umi'
import { getCookie } from '../../utils/auth'

export default (props: any) => {
    if (getCookie('username') === 'QXdebate' && getCookie('password') === '@online') {
        return <div>{props.children}</div>;
    } else {
        return <Redirect to="/admin/login" />;
    }
}