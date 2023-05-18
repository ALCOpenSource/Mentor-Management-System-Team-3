export interface Mentor {
  userImageLink: string;
  name: string;
  createdDate: string;
}

export interface Tab {
  lable: string;
}

export interface Details {
  date: string;
  time?: string;
}

export interface DetailCard {
  section: "programs" | "tasks" | "certificates";
  title: string;
  imageLink: string;
  subTexts?: Details[];
}
