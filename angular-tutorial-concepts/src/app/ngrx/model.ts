interface Posts {
  id: number,
  title: string,
  description: string
}

export interface AppState {
  name: string,
  email: string,
  mobile: string,
  id: number,
  posts:Posts[]
}