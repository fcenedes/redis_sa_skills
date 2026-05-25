# Component Inventory

Use this inventory to choose product UI patterns. It is based on the public Redis UI Storybook surface; do not reference private source repositories.

## Product Shell And Navigation

- `AppBar`: top product shell with global actions.
- `SideBar`: primary navigation with groups, footer, scroll container, and selected item state.
- `MidBar`: secondary context such as database, cluster, namespace, tabs, or selected entity.
- `AppSelectionMenu`: application, environment, workspace, or account switching.
- `Breadcrumbs`: hierarchical location when users drill into resources.
- `Tabs`: peer views within the same entity or workflow.
- `Stepper`: multi-step setup, import, migration, or review flows.

## Actions

- `Button`: primary, secondary, destructive, and neutral commands.
- `TextButton`: inline or low-emphasis actions.
- `IconButton` and `ActionIconButton`: compact toolbar actions with accessible names.
- `ToggleButton`: pressed/unpressed filters, display modes, and optional count indicators.
- `ButtonGroup`: single or multi-selection controls.
- `CopyToClipboardButton`: keys, IDs, endpoints, commands, and URLs.

## Forms And Inputs

- `FormField`: label, helper text, validation, disabled/read-only, vertical or horizontal layout.
- `TextInput`, `TextArea`, `PasswordInput`, `SearchInput`: text entry, secrets, filter search.
- `NumericInput`, `QuantityCounter`, `Slider`: numeric settings with visible constraints.
- `Select`, `MultiSelect`, `AutoCompleteSelect`: option picking, large lists, async or searchable options.
- `Checkbox`, `RadioGroup`, `Switch`: boolean, exclusive, or mode choices.
- `KeyValueList`: editable Redis-like key/value metadata, labels, headers, suggestions, and validation.

## Data Display

- `Table`: dense data surface for keys, commands, traces, streams, metrics, audit events, and plugins.
- `TableHeading`: table title, search, actions, separators, and compact controls.
- `Filters` and `SearchBar`: table filtering, query chips, custom actions, and controlled search.
- `Badge`: compact semantic or categorical status.
- `Chip` and `ChipList`: selected filters, tags, facets, with overflow handling.
- `Label`: required/optional/read-only form and metadata labels.
- `Typography`: heading, body, and code text. Use code text for keys, IDs, commands, and timestamps.

## Feedback And Status

- `Banner`: page or section-level messages; use semantic variants.
- `Toast`: transient feedback; support actions, close, update, multiple containers.
- `Loader`: indeterminate loading, inline or with text.
- `ProgressBar`: bounded progress with variants and text position.
- `HighlightedIcon`, `MoreInfoIcon`, `ProfileIcon`, `CountryFlag`: compact visual identifiers.
- `ScreenReaderAnnounce`: async updates that must reach assistive technology.

## Overlays

- `Modal`: blocking decisions, confirmation, or short forms.
- `Drawer`: inspect/edit while preserving table context; persistent or collapsible when needed.
- `Menu`: action lists and selected menu items.
- `Popover`: interactive contextual surfaces with placement and outside-click handling.
- `Tooltip`: short nonessential explanations; never the only place for critical information.

## Layout

- `FlexGroup`, `FlexItem`, `FlexSplit`, `FlexDivider`: product layout primitives.
- `Section`: collapsible or summary sections with category/value summaries.
- `Card`: individual repeated items only; avoid card-heavy dashboards when tables are clearer.
- `Overflow`: collapse excess items into an overflow count instead of wrapping unpredictably.
- `PopperProvider`: boundary/collision control for popovers, menus, and tooltips.
