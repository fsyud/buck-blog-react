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

//
export interface addArticleParam {
  title: string;
  author: string;
  content: string
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
