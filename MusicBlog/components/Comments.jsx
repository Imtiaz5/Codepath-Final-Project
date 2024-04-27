// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { supabase } from '/client/supabaseClient';

// eslint-disable-next-line react/prop-types
const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchComments = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('new_comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data);
        } catch (error) {
            setError(`Failed to load comments: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const submitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) {
            setError("Comment text cannot be empty.");
            return;
        }

        const { data: postData, error: postError } = await supabase
            .from('musictable')
            .select('*')
            .eq('id', postId)
            .single();

        if (postError || !postData) {
            setError(`No post found with ID ${postId} to comment on.`);
            return;
        }

        try {
            setLoading(true);
            const { error } = await supabase.from('new_comments').insert([
                { post_id: postId, comment_text: commentText, created_at: new Date().toISOString() }
            ]);

            if (error) {
                throw error;
            } else {
                // Refresh comments to show the new one
                await fetchComments();
                setCommentText('');
                setError('');
            }
        } catch (error) {
            setError(`Failed to submit comment: ${error.message}`);
        } finally {
            setLoading(false);
        }
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
                    <small>{`By Anonymous on ${new Date(comment.created_at).toLocaleString()}`}</small>
                </div>
            ))}
        </div>
    );
};

export default Comments;
