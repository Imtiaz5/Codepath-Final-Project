// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '/client/supabaseClient';

// eslint-disable-next-line react/prop-types
const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Wrap fetchComments with useCallback
    const fetchComments = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('new_comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: false });

        if (error) {
            setError(`Failed to load comments: ${error.message}`);
        } else {
            setComments(data);
        }
        setLoading(false);
    }, [postId]); // postId is a dependency of fetchComments

    useEffect(() => {
        fetchComments();
    }, [postId, fetchComments]); // Include fetchComments here

    const submitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) {
            setError("Comment text cannot be empty.");
            return;
        }
        const user = supabase.auth.user();
        if (!user) {
            setError('You must be logged in to comment.');
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.from('new_comments').insert([
            { post_id: postId, comment_text: commentText, created_by: user.email, created_at: new Date() }
        ]);

        if (error) {
            setError(`Failed to submit comment: ${error.message}`);
        } else {
            setComments([data[0], ...comments]);
            setCommentText('');
        }
        setLoading(false);
    };

    return (
        <div>
            <h3>Comments</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submitComment}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    style={{ width: '100%', height: '100px' }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
            {loading ? <p>Loading comments...</p> : comments.map(comment => (
                <div key={comment.id} style={{ marginTop: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <p>{comment.comment_text}</p>
                    <small>{`By ${comment.created_by} on ${new Date(comment.created_at).toLocaleString()}`}</small>
                </div>
            ))}
        </div>
    );
};

export default Comments;
