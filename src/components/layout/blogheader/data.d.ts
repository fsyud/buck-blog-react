export interface TagVerb {
  key?: string;
  label?: string;
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
