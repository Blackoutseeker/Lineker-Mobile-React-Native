export interface CrateUserTemplate {
  email: string;
  filters: {
    Default: {
      filter: 'Default'
    }
  }
}

export interface LinkData {
  title: string;
  url: string;
  date: string;
  datetime: string
}