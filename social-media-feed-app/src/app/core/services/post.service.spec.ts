import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';

// Interfaces
import { IPost, ISearch, IComment, ILikes } from '../../entities';

// Functions
import { currentTimestampDate } from '../../shared/functions';

describe('PostService', () => {
  let postService: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PostService ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    postService = TestBed.inject(PostService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const expectedPosts: IPost[] = [
    { id: 1, author: 'John', content: 'Hello', timestamp: '2021-11-30T12:00:00.000Z', likes: undefined, comments: [] },
    { id: 2, author: 'Alice', content: 'Hi there', timestamp: '2021-11-29T10:00:00.000Z', likes: undefined, comments: [] },
    { id: 3, author: 'Bob', content: 'Greetings', timestamp: '2021-11-28T08:00:00.000Z', likes: undefined, comments: [] }
  ];

  it('should get posts', () => {
    const startIndex = 0;
    const endIndex = 2;

    postService.getPosts(startIndex, endIndex).subscribe((posts: IPost[]) => {
      expect(posts.length).toBe(endIndex - startIndex);
      expect(posts).toEqual(expectedPosts.slice(startIndex, endIndex));
    });

    const req = httpMock.expectOne(`?_start=${startIndex}&_end=${endIndex}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPosts.slice(startIndex, endIndex));
  });

  it('should add post', () => {
    const newPost: IPost = { author: 'Mike', content: 'New post', timestamp: currentTimestampDate() };

    postService.addPost(newPost).subscribe((post: IPost) => {
      expect(post).toEqual({ id: 1, ...newPost, likes: undefined, comments: [] });
    });

    const req = httpMock.expectOne('');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, ...newPost, likes: undefined, comments: [] });
  });

  it('should delete post', () => {
    const postId = 1;

    postService.deletePost(postId).subscribe((res: any) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`/${postId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should filter posts', () => {
    const searchValue: ISearch = { author: 'John', content: 'Hello' };
    const startIndex = 0;
    const endIndex = 10;

    postService.filteringPost(searchValue, startIndex, endIndex).subscribe((posts: IPost[]) => {
      expect(posts).toEqual(expectedPosts);
    });

    const req = httpMock.expectOne(`?_start=${startIndex}&_end=${endIndex}&author_like=${searchValue.author}&content_like=${searchValue.content}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPosts);
  });

  it('should change likes', () => {
    const postId = 1;
    const likes: ILikes = { count: 1, usersLiked: ['John'] };
    const expectedPost: IPost = {
      id: postId,
      author: 'John',
      content: 'Hello',
      timestamp: '2021-11-30T12:00:00.000Z',
      likes,
      comments: []
    };

    postService.changeLikes(postId, likes).subscribe((post: IPost) => {
      expect(post).toEqual(expectedPost);
    });

    const req = httpMock.expectOne(`/${postId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ likes });
    req.flush(expectedPost);
  });

  it('should change comments', () => {
    const postId = 1;
    const comments: IComment[] = [{ commenter: 'John', content: 'New comment', timestamp: currentTimestampDate() }];
    const expectedPost: IPost = {
      id: postId,
      author: 'John',
      content: 'Hello',
      timestamp: '2021-11-30T12:00:00.000Z',
      likes: undefined,
      comments
    };

    postService.changeComments(comments, postId).subscribe((post: IPost) => {
      expect(post).toEqual(expectedPost);
    });

    const req = httpMock.expectOne(`/${postId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ comments });
    req.flush(expectedPost);

});
});
