// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const VoteButtons = ({ post }) => {
    const [votes, setVotes] = useState({
        upvotes: post.upvotes || 0,
        downvotes: post.downvotes || 0
    });
    const [voteStatus, setVoteStatus] = useState({ upvoted: false, downvoted: false });

    const handleVote = (type) => {
        let newVotes = { ...votes };
        let newStatus = { ...voteStatus };

        if (type === 'upvote') {
            if (!voteStatus.upvoted) {
                // If previously downvoted, remove downvote
                if (voteStatus.downvoted) {
                    newVotes.downvotes--;
                    newStatus.downvoted = false;
                }
                // Add upvote
                newVotes.upvotes++;
                newStatus.upvoted = true;
                toast.success("Thank you for your upvote!");
            } else {
                // Undo upvote
                newVotes.upvotes--;
                newStatus.upvoted = false;
                toast.info("Upvote removed.");
            }
        } else {
            if (!voteStatus.downvoted) {
                // If previously upvoted, remove upvote
                if (voteStatus.upvoted) {
                    newVotes.upvotes--;
                    newStatus.upvoted = false;
                }
                // Add downvote
                newVotes.downvotes++;
                newStatus.downvoted = true;
                toast.success("Thank you for your downvote!");
            } else {
                // Undo downvote
                newVotes.downvotes--;
                newStatus.downvoted = false;
                toast.info("Downvote removed.");
            }
        }

        setVotes(newVotes);
        setVoteStatus(newStatus);
    };

    return (
        <div>
            <button 
                onClick={() => handleVote('upvote')} 
                style={{ 
                    color: voteStatus.upvoted ? 'green' : 'grey',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none'
                }}
                onMouseOver={e => e.currentTarget.style.color = 'green'}
                onMouseOut={e => e.currentTarget.style.color = voteStatus.upvoted ? 'green' : 'grey'}
            >
                Upvote
            </button>
            <span> {votes.upvotes} </span>
            <button 
                onClick={() => handleVote('downvote')} 
                style={{ 
                    color: voteStatus.downvoted ? 'red' : 'grey',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none'
                }}
                onMouseOver={e => e.currentTarget.style.color = 'red'}
                onMouseOut={e => e.currentTarget.style.color = voteStatus.downvoted ? 'red' : 'grey'}
            >
                Downvote
            </button>
            <span> {votes.downvotes} </span>
        </div>
    );
};

export default VoteButtons;
