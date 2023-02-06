export interface UserRetrieve {
  id: number;
  name: string;
  email: string;
}

export interface LocalMember {
  member: UserRetrieve;
  dates: {
    startDate: string;
    finishDate: string;
  };
}

