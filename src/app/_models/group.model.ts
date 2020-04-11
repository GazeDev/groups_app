export class Group {
  id?: string; // guid
  title?: string;
  short_description?: string;
  description?: string; //text
  admin?: string; // guid
  posts?: string; // guid[,guid][,guid]
  metadata?: any; // metadata object with more info
}
