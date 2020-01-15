export interface TagVerb {
  key?: string;
  color?: string;
  label?: string;
}

export interface NavType {
  article?: string;
  router?: string,
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

export interface TimeLine {
  code?: number;
  message?: string,
  data: {
    count?: number;
    list: lineList[];
  }
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

export interface Project {
  code?: number;
  message?: string,
  data: {
    count?: number;
    list: ProjectList[];
  }
}
