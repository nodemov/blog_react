import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Login() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/');
        }
    }

    return (
        <>
            <h1 className="title">Login to your account</h1>
            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                </div>

                <div>
                    <input type="password" placeholder="Password" autoComplete="password" value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                </div>

                <button className="primary-btn">Login</button>
            </form>
        </>
    )
}