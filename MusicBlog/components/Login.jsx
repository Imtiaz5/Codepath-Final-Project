// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { supabase } from '/client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signIn({ email });
        if (error) {
            toast.error(`Login failed: ${error.message}`);
            setLoading(false);
        } else {
            toast.success('Check your email for the login link!');
            navigate('/');
        }
    };

    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Send Magic Link'}
                </button>
            </form>
        </div>
    );
};

export default Login;
