# Changelog

## [3.0.0]
### Changed
* Adopted the new engage theme: product cards render through the core `ProductSlider` and the theme `ProductCard`, inheriting the theme border-radius. Removed the obsolete `ThemeProvideProductCard`/`ContextBasedProductCard` card-context wrappers that predated the core slider.
* Migrated all styling from glamor to `@shopgate/engage/styles` (`makeStyles`/`useStyles`)
* The empty cart colors and the slider headline font size now come from the theme (`theme.palette.text.secondary`, `theme.palette.grey.*`, `theme.typography`).
* Replaced redux `connect` connectors with `useSelector` hooks.
* Imports now come from `@shopgate/engage/*`.
* Migrated the component tests from enzyme to React Testing Library.
* `@shopgate/engage` is now a `^7.32.0-beta.19` dev dependency and `>=7.32.0-beta.19` peer dependency (drops PWA 6 support); dropped `@shopgate/pwa-extension-kit` and the legacy babel/glamor toolchain.

### Removed
* Removed the unused ProductSlider card/price styles and the dead `PlaceholderIcon` component.

## [2.4.0]
### Removed
* Removed fallback text for headline

## [2.3.0]
### Added
* Added support for product data expiration

## [2.2.0]
### Added
* Added support for images configured in theme config

## 2.1.1
### Added
* Human readable css class for the product slider headline `recently-viewed-products__product-slider__headline`

## [2.1.0]
### Added
* Improved accessibility for screen readers

## 2.0.0
### Added
* New config `storeInFrontend` to store recently viewed list in frontend. If `storeInFrontend` is true, no pipeline will be called anymore

## 1.5.1
### Fixed
* fixed overlapping TabBar issue

## [1.5.0]
### Added
* now config for headline on pdp and cart page

## [1.4.0]
### Added
* now config for portal position

## [1.3.0]
### Added
* nl-NL translations

## [1.2.4]
### Added
* honor theme slides per view configuration

## [1.2.3]
### Fixed
* Don't show headline if there are no products

## [1.2.2]
### Added
* Use of Theme components for ProductSlider and ProductList

## [1.2.1]
### Fixed
* Long product names are being broken with browser native hyphenation.
* Updated dev dependencies in order to fix security issues.

[2.4.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v2.0.0...v2.1.0
[1.5.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.2.4...v1.3.0
[1.2.4]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/shopgate/ext-recently-viewed-products/compare/v1.2.0...v1.2.1
