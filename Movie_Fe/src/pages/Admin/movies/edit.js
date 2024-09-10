/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import styles from './Movies.module.scss';
import classNames from 'classnames/bind';
import { Col, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConnect } from '~/components/Firebase';

import { editMovie ,getMovieById } from '~/apiService/movie';
import { getAll } from '~/apiService/genres';
import requestApi from '~/apiService';
import { AuthContext } from '~/context';
import { Img } from '~/apiService/instance';

const cs = classNames.bind(styles);

const EditMovie = () => {
    const { id } = useParams();
    const [isTvShow, setIsTvShow] = useState(false);
    const [genres, setGenres] = useState([]);
    const [movie, setMovie] = useState();
    const [backdrop, setBackdrop] = useState('');
    const [posTer, setPosTer] = useState('');
    const [urlBackDrop, setUrlBackDrop] = useState();
    const [urlPoster, setUrlPoster] = useState();

    const { showToastMessage } = useContext(AuthContext);
    const naviagte = useNavigate();
    const storage = getStorage();

    const { register, handleSubmit, reset } = useForm();

    console.log(id)
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await getMovieById(id , JSON.parse(localStorage.getItem('user')));
                if (res.code===1000) {
                    setMovie(res.results);
                    // if (Number.isInteger(res.data.genres[0])) {
                    //     res.data.genres = res.data.genres.map((genre) => genre.toString());
                    // }
                    // res.data.seasons=res.data.seasons ? res.data.seasons : 1;
                    reset(res.results);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMovie();
    }, [id]);

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
            const res = await editMovie(data,id,JSON.parse(localStorage.getItem('user')));
            naviagte('/admin/dashboard/movies');
            showToastMessage('success', 'Update thành công !');
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
            <h3 className="text-center mb-3 fs-1 fw-bold">Sửa phim</h3>
            {movie && (
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
                        {(isTvShow || movie.category == 'tv') && (
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
                                <img
                                    className={cs('movie_backdrop_path')}
                                    src={urlBackDrop ||'http://localhost:8080/images/'+ movie.backdrop_path}
                                    alt=""
                                />
                                <Form.Control
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
                                <img
                                    className={cs('movie_poster_path')}
                                    src={urlPoster || 'http://localhost:8080/images/'+movie.poster_path}
                                    alt=""
                                />
                                <Form.Control
                                    className="mt-4"
                                    type="file"
                                    style={{ border: 'none' }}
                                    onChange={handleUploadImg}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <button type="submit" className={cs('movie_btn_submit')}>
                        Cập nhập phim
                    </button>
                </Form>
            )}
        </div>
    );
};

export default EditMovie;
