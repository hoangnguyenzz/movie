/* eslint-disable eqeqeq */
import styles from './Movies.module.scss';
import classNames from 'classnames/bind';
import { Col, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createMovie } from '~/apiService/movie';
import { getAll } from '~/apiService/genres';
import { AuthContext } from '~/context';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConnect } from '~/components/Firebase';

const cs = classNames.bind(styles);

const CreateMovie = () => {
    const [isTvShow, setIsTvShow] = useState(false);
    const [genres, setGenres] = useState([]);
    const [backdrop, setBackdrop] = useState('');
    const [posTer, setPosTer] = useState('');
    const [urlBackDrop, setUrlBackDrop] = useState();
    const [urlPoster, setUrlPoster] = useState();

    const { showToastMessage } = useContext(AuthContext);
    const naviagte = useNavigate();
    const storage = getStorage();

    const { register, handleSubmit, reset } = useForm();

    const Onsubmit = async (data) => {
        data.ibmPoints = Number(data.ibmPoints);
        data.episodeCount = data.episodeCount ? Number(data.episodeCount) : null;
    console.log("check ibmPoints :" +JSON.stringify(data.ibmPoints))
    console.log("check episodeCount :" +JSON.stringify(data.episodeCount))
        console.log("check data :" +JSON.stringify(data))
        if (posTer) {
            data.poster_path = posTer;
        }
        if (backdrop) {
            data.backdrop_path = backdrop;
        }
        console.log(data.poster_path + " và "+ data.backdrop_path)

        try {
            const res = await createMovie(data,JSON.parse(localStorage.getItem('user')));
            naviagte('/admin/dashboard/movies');
            showToastMessage('success', 'Thêm mới thành công !');
            reset();
        } catch (error) {
            showToastMessage('error', error);
        }
    };

    const handleChangeCate = (e) => {
        if (e.target.value == 'tv') {
            setIsTvShow(true);
        } else {
            setIsTvShow(false);
        }
    };

    useEffect(() => {
        const getGenres = async () => {
            try {
                const res = await getAll(1,100,JSON.parse(localStorage.getItem('user')));
                setGenres(res.results.content);
            } catch (error) {
                console.log(error);
            }
        };
        getGenres();
    }, []);

    const handleUploadImg = (e) => {
        console.log("target " + e.target.id)
        const image = e.target.files[0];
        if (image) {
            if (e.target.id == 'backDrop') {
                const imageUrl = URL.createObjectURL(image);
                setUrlBackDrop(imageUrl);
            setBackdrop(image);
        } else {
            const imageUrl = URL.createObjectURL(image);
            setUrlPoster(imageUrl)
            setPosTer(image);
        }
        }
    };

    return (
        <div className={cs('movie')}>
            <h3 className="text-center mb-3 fs-1 fw-bold">Thêm phim mới</h3>
            <Form className={cs('movie_form')} onSubmit={handleSubmit(Onsubmit)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên phim</Form.Label>
                            <Form.Control required type="text" {...register('name')} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Link trailer</Form.Label>
                            <Form.Control required type="text" {...register('trailerCode')} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Select {...register('category')} onChange={(e) => handleChangeCate(e)}>
                                <option value="movie">Phim Lẻ</option>
                                <option value="tv">Phim Dài Tập</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {isTvShow && (
                        <>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phần</Form.Label>
                                    <Form.Control required type="number" {...register('seasons')} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số tập phim</Form.Label>
                                    <Form.Control required type="number" {...register('episodeCount')} />
                                </Form.Group>
                            </Col>
                        </>
                    )}
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Thể loại</Form.Label>
                            <Form.Select {...register('genres')} multiple className={cs('movie_form_genres')}>
                                {genres.map((genres, index) => (
                                    <option value={genres.name} key={index}>
                                        {genres.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Quốc gia</Form.Label>
                            <Form.Control required type="text" {...register('country')} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Id url phim</Form.Label>
                            <Form.Control required type="text" {...register('url')} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Tóm tắt phim</Form.Label>
                            <Form.Control required as="textarea" type="text" {...register('overView')} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày phát hành</Form.Label>
                            <Form.Control required type="date" {...register('releaseDate')} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Điểm đánh giá</Form.Label>
                            <Form.Control required type="text" {...register('ibmPoints')} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh nền</Form.Label>
                            {backdrop && <img className={cs('movie_backdrop_path')} src={urlBackDrop} alt="" />}
                            <Form.Control
                                required
                                className="mt-4"
                                id="backDrop"
                                type="file"
                                style={{ border: 'none' }}
                                onChange={handleUploadImg}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            {posTer && <img className={cs('movie_backdrop_path')} src={urlPoster} alt="" />}
                            <Form.Control
                                required
                                className="mt-4"
                                type="file"
                                style={{ border: 'none' }}
                                onChange={handleUploadImg}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <button type="submit" className={cs('movie_btn_submit')}>
                    Thêm phim
                </button>
            </Form>
        </div>
    );
};

export default CreateMovie;
