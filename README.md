# QMK Compile API Frontend

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/qmk/qmk_compile_keymap/build.yml?logo=github&style=for-the-badge)](https://github.com/qmk/qmk_compile_keymap/actions/workflows/build.yml?query=branch%3Amain)
[![Discord](https://img.shields.io/discord/440868230475677696.svg?logo=discord&logoColor=white&color=7289DA&style=for-the-badge)](https://discord.gg/qmk)

## Development

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Build for production and serve files

```
yarn build && npx serve dist
```

### Generate keyboard.d.ts

```
# convert from hjson -> json
pipx run hjson -j ~/qmk_firmware/data/schemas/keyboard.jsonschema > src/assets/schemas/keyboard.jsonschema
pipx run hjson -j ~/qmk_firmware/data/schemas/definitions.jsonschema > src/assets/schemas/qmk.definitions.v1

# generate ts types from jsonschema
npx --package=json-schema-to-typescript json2ts  -i src/assets/schemas/keyboard.jsonschema  --cwd=src/assets/schemas/ -o keyboard.d.ts
```
