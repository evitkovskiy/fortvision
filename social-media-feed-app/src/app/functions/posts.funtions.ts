import { IComment, ILikes, IPost } from "../entities";
import { currentTimestampDate } from "../shared/functions";

export function deleteComment({comment, post}: {comment: IComment, post: IPost}): IComment | IComment[] {
  if (post.comments) {
    let commentIndex = post.comments.findIndex((item: IComment) =>
      item.content === comment.content &&
      item.commenter === comment.commenter &&
      item.timestamp === comment.timestamp
    );

    if (commentIndex !== -1) {
      post.comments = [
        ...post.comments.slice(0, commentIndex),
        ...post.comments.slice(commentIndex + 1)
      ];
    }
  }
  return post.comments ?? [];
}

export function  addComment(content: string, post: IPost, commenter: string): IComment[] {
  const { comments = [] } = post;
  const newComment = {
    content,
    commenter,
    timestamp: currentTimestampDate()
  };

  const updatedComments = [...comments, newComment];
  return updatedComments ?? [];
}

export function updateLikes(post: IPost, currentUser: string): ILikes {
  const userName = currentUser;
  const { likes = { count: 0, usersLiked: [] } } = post;
  const { usersLiked } = likes;
  const index = usersLiked.indexOf(userName);

  if (index >= 0) {
    likes.usersLiked = [...usersLiked.slice(0, index), ...usersLiked.slice(index + 1)];
    likes.count--;
  } else {
    likes.usersLiked = [...usersLiked, userName];
    likes.count++;
  }

  return likes;
}
