import styles from './Panigation.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const cs = classNames.bind(styles);

const Panigation = (props) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        //Biến 1 số thành 1 mảng liên tiếp
        // const totalPage = []
        // for (let i = 1; i <= props.pages; i++) {
        //     totalPage.push(i);
        // }
        setPages(Array.from({ length: props.pages }, (item, index) => index + 1));
    }, [props.pages]);

    return (
        <Pagination size="lg">
            <Pagination.First
                disabled={props.currPage == 1}
                className={cs('page-item')}
                onClick={() => props.onSetCurrentPage(props.currPage - 1)}
            />
            {pages.map((page) => (
                <Pagination.Item
                    active={props.currPage == page}
                    className={cs('page-item')}
                    key={page}
                    onClick={() => props.onSetCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
            <Pagination.Last
                disabled={props.currPage == pages.length}
                className={cs('page-item')}
                onClick={() => props.onSetCurrentPage(props.currPage + 1)}
            />
        </Pagination>
    );
};

export default Panigation;
