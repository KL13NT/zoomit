## [0.3.1](https://github.com/KL13NT/zoomit/compare/v0.3.0...v0.3.1) (2022-08-23)


### Bug Fixes

* images with relative src fail to load [#9](https://github.com/KL13NT/zoomit/issues/9) ([644b3aa](https://github.com/KL13NT/zoomit/commit/644b3aa72e4f80b0b01844cdf45d47625a90184e))



# [0.3.0](https://github.com/KL13NT/zoomit/compare/v0.2.2...v0.3.0) (2022-08-23)


### Bug Fixes

* conflicting replacers don't match on retry [#8](https://github.com/KL13NT/zoomit/issues/8) ([e7dbf25](https://github.com/KL13NT/zoomit/commit/e7dbf2574c46a0651a0914aeb34670d5ab7466ee))


### Features

* shadow and border and on click dismiss ([29fc394](https://github.com/KL13NT/zoomit/commit/29fc39487d19423ca24cbceca5b3ac386d56b940))



## [0.2.2](https://github.com/KL13NT/zoomit/compare/v0.2.1...v0.2.2) (2022-08-13)


### Bug Fixes

* adding new website not added before crashes popup ([4189ba7](https://github.com/KL13NT/zoomit/commit/4189ba7bebca31147a5144d5bf49f4b65b682efa))


### Reverts

* Revert "chore(release): 0.2.2 🎉" ([8ebdae3](https://github.com/KL13NT/zoomit/commit/8ebdae3238e303a46ffa721012db898e91a61add))



## [0.2.1](https://github.com/KL13NT/zoomit/compare/v0.2.0...v0.2.1) (2022-08-13)

### Bug Fixes

- chrome incompatibility with standard WebExtensions APIs ([e3f1dbb](https://github.com/KL13NT/zoomit/commit/e3f1dbb9a6a284eb505dc177908b51b915ec6766))

## [0.2.0](https://github.com/KL13NT/zoomit/compare/v0.1.0...v0.2.0) (2022-08-13)

### Bug Fixes

- chrome incompatibility with standard WebExtensions APIs ([e3f1dbb](https://github.com/KL13NT/zoomit/commit/e3f1dbb9a6a284eb505dc177908b51b915ec6766))
- weird resizing and jittering bug when displaying images larger
  than half of the viewport ([e68b6a4](https://github.com/KL13NT/zoomit/commit/e68b6a40b0ae723dd148ec98065cffe3c6effa06))
- laggy movement of enlarged media. All responses are 60 FPS
  now ([e68b6a4](https://github.com/KL13NT/zoomit/commit/e68b6a40b0ae723dd148ec98065cffe3c6effa06))
- large memory usage caused by potential memory leak which
  originated by storing and operating on the list of websites in the
  content script ([e68b6a4](https://github.com/KL13NT/zoomit/commit/e68b6a40b0ae723dd148ec98065cffe3c6effa06))

### Features:

- popup listing and website support management. This release comes
  with a popup action that displays all currently supported websites
  alongside a form to add new websites to the support list ([afb918d](https://github.com/KL13NT/zoomit/commit/afb918d199e6e2fc87a21d463ea05d862772391c))
- greeting page with changelog and better documentation for users ([e68b6a4](https://github.com/KL13NT/zoomit/commit/e68b6a40b0ae723dd148ec98065cffe3c6effa06))
- performance optimizations and reduces memory usage by depending on
  storage rather than in-memory site management and having 1 event
  listener active at all times instead of multiple, constantly spawned
  and despawned listeners ([e68b6a4](https://github.com/KL13NT/zoomit/commit/e68b6a40b0ae723dd148ec98065cffe3c6effa06))
- storage migration system. This system's role is to maintain the
  storage, upgrade it, and apply any needed transformations in case of
  changes to the data structure Zoomit uses. This guarantees that your
  custom-added websites remain untouched as Zoomit is updated. This
  system is completely automatic and doesn't require anything further
  from you ([ddd7605](https://github.com/KL13NT/zoomit/commit/ddd76059a8f09649fab6d770a936bf6a4236e7aa))

## 0.1.0

Initial release! 🥳
