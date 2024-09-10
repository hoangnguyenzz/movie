/* eslint-disable eqeqeq */
import styles from './Genres.module.scss';
import classNames from 'classnames/bind';
import { Button, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { createGenres } from '~/apiService/genres';
import { AuthContext } from '~/context';
import { useNavigate } from 'react-router-dom';

const cs = classNames.bind(styles);

const CreateGenres = () => {
    const { showToastMessage } = useContext(AuthContext);
    const naviagte = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const Onsubmit = async (data) => {
        try {
            
            const res = await createGenres(data,
                JSON.parse(localStorage.getItem('user'))
            );
            naviagte('/admin/dashboard/genres');
            showToastMessage('success', "Thêm mới thành công !");
            reset();
        } catch (error) {
            showToastMessage('error', 'Id đã tồn tại trên hệ thống');
        }
    };

    return (
        <div className={cs('genres')}>
            <h3 className="text-center mt-4 mb-3 fs-1 fw-bold">Thêm thể loại mới</h3>
            <Form className={cs('genres_form')} onSubmit={handleSubmit(Onsubmit)}>
                
                <Form.Group className="mb-3">
                    <Form.Label>Tên thể loại</Form.Label>
                    <Form.Control required type="text" {...register('name')} />
                </Form.Group>
                <button type="submit" className={cs('movie_btn_submit')}>
                    Thêm thể loại
                </button>
            </Form>
        </div>
    );
};

export default CreateGenres;
