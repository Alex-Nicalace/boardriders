interface ILinkData {
  title: string;
  to: string;
  isAccented?: boolean;
}

export interface IMenuData extends ILinkData {
  submenu?: {
    sections: {
      title: string;
      isWideSection?: boolean;
      links: ILinkData[];
    }[];
    imgLinkData?: {
      src: string;
      to: string;
      title?: string;
    };
  };
}

export type TMainMenuProps = {
  className?: string;
  data: IMenuData[];
};
