import styles from './Genres.module.scss';
import classNames from 'classnames/bind';
import { Button, Table } from 'react-bootstrap';
import { deleteGenres, getAll } from '~/apiService/genres';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Panigation from '~/layout/component/Panigation';

const cs = classNames.bind(styles);

function GenresPage() {
    const [genres, setGenres] = useState();
    const [pages, setPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getGenres = async () => {
        try {
            const res = await getAll(currPage,10,JSON.parse(localStorage.getItem('user')));
            if (res.code=1000) {
                setGenres(res.results.content);
                setPages(res.results.totalPages);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getGenres();
    }, [currPage]);

    const handleDeleteGenres = async (id) => {
        if (window.confirm('Bạn thật sự muốn xoá thể loại này')) {
            try {
                await deleteGenres(id,JSON.parse(localStorage.getItem('user')));
                getGenres();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={cs('admin_container')}>
            <h3 className="text-center mb-3 fs-1 fw-bold">Danh sách thể loại</h3>
            <Link to="/admin/dashboard/genres/create" className="btn btn-success fs-4 mb-2">
                Thêm thể loại mới
            </Link>
            {loading && <div>Loading...</div>}
            {genres && (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên thể loại</th>
                                <th className="text-center">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                        <Link to={`/admin/dashboard/genres/edit/${item.id}`}>Sửa</Link>
                                        <Button variant="danger" onClick={() => handleDeleteGenres(item.id)}>
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Panigation pages={pages} currPage={currPage} onSetCurrentPage={setCurrPage} />
                </>
            )}
        </div>
    );
}

export default GenresPage;
