import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../models/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../models/write';
import { removePost } from '../../lib/api/posts'

const PostViewerContainer = ({ match, history }) => {
  const { postId } = match.params; // 처음 마운트될 때 포스트 읽기 API 요청
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user
  }));

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  }

  useEffect(() => {
    dispatch(readPost(postId));

    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    }
  }, [dispatch, postId])

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PostViewer 
      post={post} 
      loading={loading} 
      error={error} 
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={user && user.id === post && post.id}
    />
  )
}

export default withRouter(PostViewerContainer);