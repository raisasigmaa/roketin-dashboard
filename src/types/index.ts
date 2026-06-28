export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserLocation {
  street: { number: number; name: string }
  city: string
  state: string
  country: string
}

export interface UserDOB {
  date: string
  age: number
}

export interface UserRegistered {
  date: string
  age: number
}

export interface UserPicture {
  large: string
  medium: string
  thumbnail: string
}

export interface User {
  gender: string
  name: UserName
  location: UserLocation
  email: string
  dob: UserDOB
  registered: UserRegistered
  picture: UserPicture
  nat: string
}

export interface RandomUserAPIResponse {
  results: User[]
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}

export interface DashboardStats {
  differentNationality: number
  mostGender: string
  averageAge: number
  averageMembershipYears: number
}
