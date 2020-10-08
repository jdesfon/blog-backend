# GrapthQl blog backend

## Technical stack

- [NestJs](https://nestjs.com/)
- [GrapthQl](https://graphql.org/)
- [TypeORM](https://typeorm.io/)
- [Postgres](https://www.postgresql.org/)

## Requirements

Having [docker](https://www.docker.com/get-started) installed and running

## Setup

Launch the application by executing the following commands in the project root directory. It contains a **docker-compose.yml** file.

```
  docker-compose build
  docker-compose up
```

To stop the application run 

```
docker-compose down
```

## Authentication API

### 1. Register a user

POST: http://localhost:3000/auth/signup
```json
{
	"firstname": "foo",
	"lastname": "bar",
	"email": "foobar@email.com",
	"password": "something"
}
```
Using CURL 👇

```sh
curl --request POST \
  --url http://localhost:3000/auth/signup \
  --header 'content-type: application/json' \
  --data '{
	"firstname": "foo",
	"lastname": "bar",
	"email": "foobar@email.com",
	"password": "something"
}'
```

Expected response: OK

### 2. Sign in

POST: http://localhost:3000/auth/login

```json
{
	"email": "foobar@email.com",
	"password": "something"
}
```

Using CURL 👇
```sh
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'content-type: application/json' \
  --data '{
	"email": "foobar1@email.com",
	"password": "butterfly"
}'
```

Expected response:

```json
{
  "access_token": "<a long string to keep for requests requiring authentication>"
}
```

### 3. Profile

GET: http://localhost:3000/auth/profile

headers
```
{
  "Authorization": "Bearer <token>"
}
```

Using CURL 👇

```sh
curl --request GET \
  --url http://localhost:3000/auth/profile \
  --header 'authorization: Bearer <token>'
```

## GraphQL API

It exposes Queries and Mutations to handle articles, comments and admin user actions.
To use the api I recommend opening the GraphQl playground at http://localhost:3000/graphql

### Queries

- article(id: Float!): Article!
- articles: [Article!]!
- myArticles: [Article!]! 🔒
- comments: [Comment!]!
- commentsByArticle(articleId: Float!): [Comment!]!

### Mutations

- createArticle(createArticleDto: CreateArticleDto!): Article! 🔒
- updateArticle(
    updateArticleDto: UpdateArticleDto!
    articleId: Float!
  ): Article! 🔒
- removeArticle(articleId: Float!): Boolean! 🔒
- createComment(
  createCommentDto: CreateCommentDto!
  articleId: Float!
): Comment! 🔒
-  updateComment(
    updateCommentDto: UpdateCommentDto!
    commentId: Float!
  ): Comment! 🔒
- removeComment(commentId: Float!): Boolean! 🔒
- updateUserRole(role: String!): User! 🔐
- removeArticleAsAdmin(articleId: Float!): Boolean! 🔐
- removeCommentAsAdmin(commentId: Float!): Boolean! 🔐

🔒 : requires auth
🔐 : requires admin role


**Examples** 

#### Query: [article]

```js
{ 
	article(id: 1) {
  	title
	}
}
```

#### Mutation: [createArticle]

```
mutation createArticle(
  $title: String!
  $body: String!
  $picture_url: String!
  $tags: [String!]!
  $isPrivate: Boolean
) {
  createArticle(
    createArticleDto: {
      title: $title
      body: $body
      picture_url: $picture_url
      tags: $tags
      isPrivate: $isPrivate
    }
  ) {
    id
    title
    body
    picture_url
    comments {
      body
    }
    tags
    updatedAt
    createdAt
  }
}
```

> httpHeaders
```
{
  "Authorization": "Bearer <token>"
}
```

> queryVariables
```
{
  "title": "foo",
  "body": "bar",
  "picture_url": "foo.jpg",
  "tags": ["grafiti"],
  "isPrivate": true
}
```

## Test

I wish I had to implement unit tests and integration tests.

## Stay in touch

- Author - [Jean-Michel Desfontaines](mailto:jdesfon@gmail.com)

