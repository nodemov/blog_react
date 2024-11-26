import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Create() {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();

        const res = await fetch('/api/posts', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        console.log(data);

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate('/');
        }
    }

    return (
        <div>
            <h1 className="title">Create Post</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-4">
                <div>
                    <input type="text" placeholder="title" value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
                </div>

                <div>
                    <textarea rows="6" placeholder="body" value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}>
                    </textarea>
                    {errors.body && <p className="text-red-500">{errors.body[0]}</p>}
                </div>

                <button type="submit" className="primary-btn">Create Post</button>
            </form >
        </div >
    )
}