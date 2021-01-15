import fetch from "cross-fetch";

type KarmaConfig = {
  url?: string;
  token: string;
};

const DEFAULT_URL = "https://my.karma.red/graphql";

const LOGIN_MUTATION =
  "mutation Login($input: LoginWithEmailAndPasswordInput!) { loginWithEmailAndPassword(input: $input) { token } }";

export class Karma {
  private bearer: string;
  public url: string = DEFAULT_URL;

  constructor(config: KarmaConfig) {
    this.bearer = config.token;
    if ("url" in config) this.url = config.url;
  }

  static async login(
    email: string,
    password: string,
    url: string = DEFAULT_URL
  ) {
    const token = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: LOGIN_MUTATION,
        variables: { input: { email, password } },
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data.loginWithEmailAndPassword.token);

    return new Karma({ token });
  }

  async request(query: string, variables: object = {}) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.bearer}`,
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
  }
}

export default Karma;
