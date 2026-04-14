# Catholic New Tab

Chrome/Firefox new-tab extension that displays Bible Gateway's verse of the day.

## current features
- verse of the day on new tab
- selectable bible version
- settings drawer
- chrome + firefox compatible

## development
```bash
npm install
npm run build
```

## packaging
```bash
npm run build
cp manifest.json dist\
npx web-ext build --source-dir dist --artifacts-dir releases --overwrite-dest
```

## roadmap
- background picture
- other bibles, as copyrights permit
- daily mass readings
- liturgy of the hours

## license
MIT
