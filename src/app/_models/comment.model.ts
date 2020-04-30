export class Comment {
  id?: string; // guid
  PostId: string; // guid
  AuthorId: string; // guid
  body: string;
  displayName?: string; // loaded from author
}
