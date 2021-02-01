export type FriendList = {
  id: string;
  nama: string;
  telp: string;
  linkedin: string;
};

export type NewContactData = {
  newNama: string;
  newTelp: string;
  newLinkedin: string;
};

export type State = {
  contacts: Array<FriendList>;
  searchKey: string;
  selectedIndex: number;
};
