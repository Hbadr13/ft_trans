import Navbar from "./Navbar";
export { Navbar };
export interface CustomLinkNavbarProps {
  href?: string;
  content?: string;
  moreStye?: string;
}

export interface BoxSearchrProps {
  searchUser: string;
  setSearchUser: (searchUser: string) => void;
  hiddenSearch: boolean;
  setHiddenSearch: (hiddenSearch: boolean) => void;
}
