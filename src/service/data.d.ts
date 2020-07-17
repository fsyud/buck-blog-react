export interface registerParam {
  name: string;
  password: string;
  phone: string;
  email: string;
  introduce: string;
  type?: number;
}

export interface addTagParam {
  name: string;
  desc?: string;
  icon?: string
}

// 获取文章列表
export interface queryArticleParam {
  pageSize?: string;
}

// 获取文章详情
export interface getArticleDetailParam {
  id: string;
  type: number;
}

// 一级文章评论
export interface addCommentParam {
  user_id: string;
  article_id: string;
  content: string;
}

// 三级评论传递参数
export interface thirdCommentParam {
  user_id: string;
  article_id: string;
  comment_id: string;
  content: string;
  to_user: string;
}

// 获取留言板列表
export interface queryBoardParam {
  pageNum: number;
  pageSize: number;
  state: number;
}
