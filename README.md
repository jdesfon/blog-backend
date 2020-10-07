## GrapthQl

### Articles

// TODO handle article privacy

#### Queries

```
{ 
	article(id: 1) {
  	title
	}
}
```

#### Mutations

- createArticle

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

- Update article

```
mutation updateArticle($title: String!, $body: String!) {
  updateArticle(
    articleId: 1
    updateArticleDto: { title: $title, body: $body }
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
```
{
  "title": "bar",
  "body": "baz"
}
```

```
{
  "Authorization": "Bearer <token>"
}
```

## Description



## Installation

```sh
  docker-compose build
```
## Running the app

```sh
  docker-compose up
```

## Test


## Support


## Stay in touch

- Author - [Jean-Michel Desfontaines](mailto:jdesfon@gmail.com)

