import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '/client/supabaseClient';

const VoteButtons = ({ post }) => {
    const [voteCounts, setVoteCounts] = useState({
        upvotes: post.upvotes || 0,
        downvotes: post.downvotes || 0
    });

    // Function to fetch and update vote counts from the database
    const fetchVoteCounts = async () => {
        try {
            let { data, error } = await supabase
                .from('votes2')
                .select('vote_type')
                .eq('post_id', post.id);
            if (error) throw error;

            const upvotes = data.filter(v => v.vote_type === 'up').length;
            const downvotes = data.filter(v => v.vote_type === 'down').length;
            setVoteCounts({ upvotes, downvotes });
        } catch (error) {
            console.error('Error fetching vote counts:', error.message);
        }
    };

    // This useEffect will re-fetch vote counts when the post changes
    useEffect(() => {
        fetchVoteCounts();
    }, [post]);

    const handleVote = async (type) => {
        const voteType = (type === 'upvote') ? 'up' : 'down';
        try {
            const { error } = await supabase.from('votes2').upsert([
                { post_id: post.id, vote_type: voteType }
            ]);

            if (error) throw error;

            // Fetch the updated vote counts to reflect the new vote immediately
            await fetchVoteCounts();
            toast.success(`Thank you for your ${type}!`);
        } catch (error) {
            toast.error(`Failed to record ${type}: ${error.message}`);
        }
    };

    return (
        <div>
            <button 
                onClick={() => handleVote('upvote')}
                style={{ color: voteCounts.upvotes > 0 ? 'green' : 'grey', cursor: 'pointer', background: 'none', border: 'none' }}
                onMouseOver={e => e.currentTarget.style.color = 'darkgreen'}
                onMouseOut={e => e.currentTarget.style.color = voteCounts.upvotes > 0 ? 'green' : 'grey'}
            >
                Upvote
            </button>
            <span> {voteCounts.upvotes} </span>
            <button 
                onClick={() => handleVote('downvote')}
                style={{ color: voteCounts.downvotes > 0 ? 'red' : 'grey', cursor: 'pointer', background: 'none', border: 'none' }}
                onMouseOver={e => e.currentTarget.style.color = 'darkred'}
                onMouseOut={e => e.currentTarget.style.color = voteCounts.downvotes > 0 ? 'red' : 'grey'}
            >
                Downvote
            </button>
            <span> {voteCounts.downvotes} </span>
        </div>
    );
};

export default VoteButtons;
