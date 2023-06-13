import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IComment, ILikes, IPost, ISearch } from '../../entities';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(startIndex: number, endIndex: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.requestStringWithPagination(startIndex, endIndex))
            .pipe(
              shareReplay(),
              delay(1000)
            )
  }

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>('', post);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(this.requestStringtWithPostId(postId))
  }

  filteringPost(searchValue: ISearch, startIndex: number, endIndex: number): Observable<IPost[]> {
    let params = new HttpParams();
    if (searchValue.author) {
      params = params.append('author_like', searchValue.author);
    }
    if (searchValue.content) {
      params = params.append('content_like', searchValue.content);
    }
    return this.http.get<IPost[]>(this.requestStringWithPagination(startIndex, endIndex), {params: params}).pipe(delay(1000));
  }


  changeLikes(postId: number, likes: ILikes): Observable<IPost> {
    return this.http.patch<IPost>(this.requestStringtWithPostId(postId), { likes });
  }

  changeComments(comments: IComment[], postId: number): Observable<IPost> {
    return this.http.patch<IPost>(this.requestStringtWithPostId(postId), { comments });
  }

  requestStringWithPagination = (startIndex: number, endIndex: number): string => `?_start=${startIndex}&_end=${endIndex}`;

  requestStringtWithPostId = (postId: number): string => `/${postId}`;
}
