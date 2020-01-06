export interface TagVerb {
  key: string;
  label: string;
}

export interface ListItemData {
  name: string;
  avatar: string;
  userid: string;
  email: string;
  signature: string;
  title: string;
  tags: TagVerb[]
}
