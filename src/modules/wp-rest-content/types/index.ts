export interface WPRState {
  pages: Object,
  posts: Object,
  menus: Object,
  lang: String
}

export enum ContentTypes {
  Page,
  Post,
  Menu
}