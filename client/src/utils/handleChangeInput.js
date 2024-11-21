export const handleChangeInput = (e, setData, userData) => {
    setData({
        ...userData,
        [e.target.name]: e.target.value
    });
};