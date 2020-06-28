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

export interface addArticleParam {
  title: string;
  author: string;
  content: string
}

export interface getArticleDetailParam {
  id: string;
  type: number;
}
