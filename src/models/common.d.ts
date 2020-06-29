import { Data } from 'unist';

export interface TagVerb {
  key?: string;
  color?: string;
  label?: string;
}

export interface NavType {
  article?: string;
  router?: string;
  key?: string;
}

export interface CurrentUser {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  tags?: TagVerb[];
}

export interface CurrNav {
  types?: string;
  state?: boolean;
  list?: NavType[];
}

export interface lineList {
  color?: string;
  state?: number;
  _id?: string;
  title?: string;
  content?: string;
  start_time?: string;
  end_time?: string;
}

// 时间轴
export interface TimeLine {
  code?: number;
  message?: string;
  data: {
    count?: number;
    list: lineList[];
  };
}

export interface ProjectList {
  _id?: string;
  title?: string;
  content?: string;
  start_time?: string;
  end_time?: string;
  img?: string;
  url?: string;
}

// 项目
export interface Project {
  code?: number;
  message?: string;
  data: {
    count?: number;
    list: ProjectList[];
  };
}

// 标签
export interface tagList {
  name: string;
  desc?: string;
  color?: string;
  _id: string;
}

export interface tagDefine {
  code?: number;
  message?: string;
  data: {
    count?: number;
    list: tagList[];
  };
}

export interface articleMeta {
  views: number;
  likes: number;
  comment: number;
}

export interface articeTags {
  id: number;
  name: string;
}

// 评论
export interface commentsList {
  _id: string;
  id: number;
  update_time: Data;
  create_time: Data;
  other_comments: commentsList[];
  user_id: string;
  content: string;
  article_id: string;
  is_handle: number;
  state: number;
  likes: number;
  is_top: boolean;
  user: {
    name: string;
    type: number;
    avatar: string;
    user_id: string;
  }
}

// 文章详情列表
export interface articleDetailist {
  code: number;
  message: string;
  data: {
    meta: {
      views: number;
      likes: number;
      comments: number;
    };
    keyword: Array<[]>;
    desc: string;
    numbers: string;
    img_url: string;
    type: number;
    state: number;
    origin: number;
    tags: articeTags[];
    comments: commentsList[];
    category: Array<[]>;
    _id: string;
    title: string;
    author: string;
    content: string;
    like_users: Array<[]>;
    create_time: Data;
    updara_time: Data;
    id: number;
    __v: number;
  };
}

// 文章列表
export interface artDataList {
  meta: {
    views: number;
    likes: number;
    comments: number;
  };
  desc: string;
  img_url: string;
  tags: Array<[]>;
  category: Array<[]>;
  _id: string;
  title: string;
  create_time: Data;
}

export interface articleList {
  code: number;
  message: string;
  data: {
    count: number;
    list?: artDataList[];
  };
}
