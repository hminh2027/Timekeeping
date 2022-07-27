import { BaseService } from "../base-service";
import { API_ENDPOINTS } from "../endpoints";

class Comment extends BaseService {
  getCommentId(id) {
    return this.http.get(`${this.basePath}/${id}`).then((res) => res.data);
  }
  postComment(data) {
    return this.http.post(`${this.basePath}`, data).then((res) => res.data);
  }
}

export const CommentService = new Comment("comment");
