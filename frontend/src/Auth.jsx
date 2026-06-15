import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';


function Auth() {
    const [loading, setLoading] = useState(false);
    const [auth_token, setAuthToken] = useState(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        validate: values => {
        const errors = {};
        if (!values.username) errors.username = 'Обязательно';
        if (!values.password) errors.password = 'Обязательно';
        return errors;
        },
        
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post('/api/auth/login', values);
                const token = response.data.token; 
                
                localStorage.setItem('auth_token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                navigate('/profile');
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 401) {
                    alert(error.response.data.message || "Неверный логин или пароль!");
                } else {
                    alert("Ошибка при отправке запроса: " + (error.message || "Неизвестная ошибка"));
                }
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Авторизация</h2>
                        <p>Для входа введите свой логин и пароль</p>
                        
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label>Логин</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    id="login" 
                                    className="form-control" 
                                    required
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={loading}
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <div style={{ color: 'red' }}>{formik.errors.username}</div>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label>Пароль</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-control" 
                                    required
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={loading}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div style={{ color: 'red' }}>{formik.errors.password}</div>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <input 
                                    type="submit" 
                                    name="submit" 
                                    className="btn btn-primary" 
                                    value={loading ? "Вход..." : "Войти"}
                                    disabled={loading}
                                />
                            </div>
                            
                            <p>Нет аккаунта? <a href="/register">Создайте его за минуту</a>.</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;