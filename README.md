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
windows powershell:
```powershell
npm run build
copy manifest.json dist\
Compress-Archive -Path dist\* -DestinationPath cath-tab-chrome-v0.1.0.zip -Force
Compress-Archive -Path dist\* -DestinationPath cath-tab-firefox-v0.1.0.xpi -Force
```

## roadmap
- background picture
- other bibles, as copyrights permit
- daily mass readings
- liturgy of the hours
