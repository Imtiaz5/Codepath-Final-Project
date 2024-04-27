// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { supabase } from '/client/supabaseClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        
        if (error) {
            toast.error(`Signup failed: ${error.message}`);
        } else {
            toast.success('Signup successful! Check your email for a confirmation link.');
            navigate('/login');
        }
        setLoading(false);
    };

    return (
        <div className="form-card">
            <h1>Create Account</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
};

export default CreateAccount;
