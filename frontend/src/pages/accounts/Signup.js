import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Alert } from 'antd';
import { useHistory } from 'react-router-dom';

const apiUrl = 'http://localhost:8000/accounts/signup/';

const Signup = () => {
    const history = useHistory();

    const [inputs, setInputs] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [formDisabled, setFromDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors({});
        setLoading(true);

        Axios.post(apiUrl, inputs)
            .then((response) => {
                history.push('/accounts/login/');
            })
            .catch((error) => {
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(
                            ' ',
                        ),
                        password: (error.response.data.password || []).join(
                            ' ',
                        ),
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const Enabled = Object.values(inputs).every((s) => s.length > 0);
        setFromDisabled(!Enabled);
    }, [inputs]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="username" onChange={onChange} />
                    {errors.username && (
                        <Alert type="error" message={errors.username} />
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                    />
                    {errors.password && (
                        <Alert type="error" message={errors.password} />
                    )}
                </div>
                <div>
                    <input
                        type="submit"
                        value="회원가입"
                        disabled={loading || formDisabled}
                    />
                    {loading && '로딩중'}
                </div>
            </form>
        </div>
    );
};

export default Signup;
