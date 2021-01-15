# Karma API

## Install

```js
# npm install @karmared/api
```
or
```js
# yarn add @karmared/api
```

## Use

If you know email and password:
```js
import Karma from "@karmared/api"

const EMAIL = "example@mail.com", PASSWORD = "...";

const karma = await Karma.login(EMAIL, PASSWORD)
```

or if you know bearer token:
```js
import Karma from "@karmared/api"

const BEARER_TOKEN = "..."

const karma = new Karma({token: BEARER_TOKEN})
```

### Requests

You can see all requests on site [https://my.karma.red/graphql](https://my.karma.red/graphql).

```js
const query = `
{
  viewer {
    id
  }
}`

const response = await karma.request(query)
console.log(response) // {data: {viewer: {id: "..."}}}
```
