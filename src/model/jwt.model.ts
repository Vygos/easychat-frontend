export class JWT {
  access_token: string
  refresh_token: string

  constructor(init: Partial<JWT>) {
    Object.assign(this, init);
}
}
