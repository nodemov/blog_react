import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token, user } = useContext(AppContext);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    useEffect(() => {
        getPost();
    }, []);

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if (res.ok) {
            if (user.id !== data.post.user_id) {
                navigate('/');
                console.log("You are not authorized to update this post");
            }

            setFormData({
                title: data.post.title,
                body: data.post.body,
            });
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const res = await fetch('/api/posts/' + id, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate('/');
        }
    }

    return (
        <div>
            <h1 className="title">Update Post</h1>

            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-4">
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

                <button type="submit" className="primary-btn">Update Post</button>
            </form >
        </div >
    )
}