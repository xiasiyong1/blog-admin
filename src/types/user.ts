enum GenderEnum {
  MALE = 1,
  FEMALE = 1,
  UN_KNOWN = 0
}

export interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
  gender: GenderEnum;
  roles: number[];
}
