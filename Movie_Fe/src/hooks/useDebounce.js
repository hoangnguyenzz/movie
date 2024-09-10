import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounce(value), delay);
        // phải xóa cái cũ đi ko nó cộng dồn
        return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounce;
}
export default useDebounce;
