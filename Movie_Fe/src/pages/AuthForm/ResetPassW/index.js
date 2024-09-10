import styles from './ResetPassw.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';

import { AuthContext } from '~/context';
import { getDetail } from '~/apiService/user';

const cs = classNames.bind(styles);

function ResetPass({ handleCloseModal }, ref) {
    const form = useRef();

    const { showToastMessage } = useContext(AuthContext);

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const user = await getDetail(form.current.email.value);
            if (user.success) {
                form.current.id.value = user.data._id;
                form.current.name.value = user.data.name;
                emailjs.sendForm('service_bjmefgi', 'template_ks6zogm', form.current, 'JH65x1KMTlS6KvDOG').then(
                    (result) => {
                        console.log(result.text);
                        showToastMessage('success', 'Vui lòng kiểm tra email để đặt lại mật khẩu');
                        handleCloseModal();
                        form.current.email.value = '';
                    },
                    (error) => {
                        showToastMessage('error', error.text);
                    },
                );
            } else {
                showToastMessage('error', 'Tài khoản không có trên hệ thống');
            }
        } catch (error) {
            showToastMessage('error', error.message);
        }
    };
    return (
        <div ref={ref} className={cs('modal')} onClick={(e) => e.target.classList.remove('openModal')}>
            <form ref={form} onSubmit={sendMessage} className={cs('modalContain')} onClick={(e) => e.stopPropagation()}>
                <h4 className={cs('modalHeader')}>Hãy nhập email của bạn để đặt lại mật khẩu</h4>
                <input name="id" style={{ display: 'none' }} />
                <input name="name" style={{ display: 'none' }} />
                <input className={cs('inputConfirm')} name="email" required placeholder="Nhập email..." type="email" />
                <button className={cs('modalBtn')}>Xác nhận</button>
            </form>
        </div>
    );
}

export default forwardRef(ResetPass);
