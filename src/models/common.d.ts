export interface TagVerb {
  key?: string;
  label?: string;
}

export interface NavType {
  article?: string;
  router?: string,
  key?: string
}

export interface CurrentUser {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  tags?: TagVerb[]
}

export interface CurrNav {
  types?: string;
  state?: boolean;
  list?: NavType[]
}
