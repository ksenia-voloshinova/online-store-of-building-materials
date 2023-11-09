export interface IContactsInfo {
  seo: Record<string,string>;
  items: IContactsInfoItem[];
}

export interface IContactsInfoItem {
  id: string;
  address?: string;
  phone?: {
    text: string;
    link: string
  };
  email?: {
    text: string;
    link: string
  };
  photo?: string[]
  time?: string
  coords?: {
    longitude: number;
    latitude: number;
  }
  name: string;
}