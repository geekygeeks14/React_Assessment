import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {Dialog,IconButton, DialogContent, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PostDetail({ postId,open,handleClose}) {
  const [post, setPost] = useState(null);

  //fetch the data using postId
  const fetchPostDetails = useCallback(async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);

  //log of re-render the child component
  useEffect(() => {
    console.log('PostDetail component re-rendered');
  });

  // Memoize the post data
  const memoizedPost = useMemo(() => post, [post]);

  return (
    <Dialog open={open} onClose={handleClose}>
    <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}>
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{ bgcolor: 'background.default' }}>
      <Typography variant='body2' fontWeight="600" textTransform="uppercase" borderBottom={1} borderColor="text.lightGrey" align='left'>
        Post Information
      </Typography>
      {memoizedPost && (
        <>
          <Box mt={2}>
            <Typography fontSize={12} variant="subtitle1" color="text.secondary" fontWeight="700">Id</Typography>
            <Typography fontSize={12} variant="body1" color="text.secondary">{memoizedPost.id}</Typography>
          </Box>
          <Box mt={2}>
            <Typography fontSize={12} variant="subtitle1" color="text.secondary" fontWeight="700">Title</Typography>
            <Typography fontSize={12} variant="body1" color="text.secondary">{memoizedPost.title}</Typography>
          </Box>
          <Box mt={2}>
            <Typography fontSize={12} variant="subtitle1" color="text.secondary" fontWeight="700">Body</Typography>
            <Typography fontSize={12} variant="body1" color="text.secondary">{memoizedPost.body}</Typography>
          </Box>
        </>
      )}
    </DialogContent>
    </Dialog>
  );
}

export default PostDetail;
