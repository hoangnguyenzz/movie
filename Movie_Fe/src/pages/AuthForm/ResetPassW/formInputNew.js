import styles from './ResetPassw.module.scss';
import classNames from 'classnames/bind';
import { useContext, useRef } from 'react';

import { AuthContext } from '~/context';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { changePassword } from '~/apiService/user';

const cs = classNames.bind(styles);

function FormInputNewPassW() {
    const [searchParam] = useSearchParams();
    const { showToastMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const form = useRef();

    const resetPassw = async (e) => {
        e.preventDefault();
        try {
            await changePassword({
                newPassword: form.current.password.value.trim(),
                id: searchParam.get('key'),
            });
            navigate('/login');
            showToastMessage('success', 'Cập nhật mật khẩu thành công');
        } catch (error) {
            showToastMessage('error', error.message);
        }
    };
    return (
        <div className={cs('modalInputNewPass')}>
            <form
                ref={form}
                onSubmit={resetPassw}
                className={cs('modalContain')}
                style={{ marginTop: '40px', width: '400px', maxWidth: 'calc(100% - 32px) ' }}
            >
                <h4 className={cs('modalHeader')}>Đặt lại mật khẩu</h4>
                <input
                    className={cs('inputConfirm')}
                    name="password"
                    required
                    placeholder="Nhập mật khẩu mới của bạn..."
                    type="password"
                />
                <button className={cs('modalBtn')}>Xác nhận</button>
            </form>
        </div>
    );
}

export default FormInputNewPassW;
