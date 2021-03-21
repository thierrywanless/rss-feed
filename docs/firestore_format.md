# Formats

There are 2 data formats accepted by the app, Type 0 and 1.

## Type 0 - RSS source

```json
{
  "name": "Source Category",
  "subtitle": "Source subtitle",
  "sources": [
    {
      "faviconUrl": "https://firebase-storage-link-to-icon",
      "title": "Source title",
      "type": 0,
      "url": "https://link-to-rss-feed.com/feed"
    }
    ...
  ]
}
```

## Type 1 - Manual list of sources

This has been configured in case the user want's to create a knowledge base of resources not specific to an RSS feed

```json
{
  "name": "Source Category",
  "subtitle": "Source subtitle",
  "sources": [
    {
      "faviconUrl": "https://firebase-storage-link-to-icon",
      "links": [
        {
          "title": "Displayable title",
          "url": "https://link-to-source.com"
        }
        ...
      ],
      "title": "Source title",
      "type": 1,
      "url": "https://optional-link-to-content.com"
    }
    ...
  ]
}
```