**Add your own guidelines here**
## font consistent ##
- make font size consistent for entire website, adjust to 5  font sizes, font's weight to 4 weight

## HomePage Layout & Image Guidelines ##
- **Layout System:** HomePage must use a percent-based layout system with `6vw` gutters (left and right padding)
- **Section Structure:** Use two-column layout (50/50 split) on desktop with:
  - Left column: Section heading (sticky at `top-32`)
  - Right column: Content grid
- **Hero Slider:**
  - Height: `h-[80vh]`
  - Gradient overlay: `bg-gradient-to-b from-black/30 to-transparent` at top (h-32)
  - Images from `HOME_HERO_IMAGES` array
- **Image Aspect Ratio:** All content images must use `aspect-[3/4]` (portrait orientation)
- **Image Component:** Use `ImageWithFallback` component for all images
- **Image Styling:**
  - Container: `w-full bg-gray-100 overflow-hidden relative`
  - Image: `w-full h-full object-cover`
  - Hover effect: `transition-transform duration-700 ease-out group-hover:scale-105`
- **Spacing:**
  - Top padding: `pt-[96px]`
  - Section bottom margin: `mb-32 md:mb-40`
  - Gap between items: `gap-12 md:gap-16` for exhibitions, `gap-12` for activities
- **Typography:** Headings use `text-xl md:text-2xl font-normal`
- **Bilingual Support:** Render content separately for Thai and English with conditional rendering based on language state

## Menu Overlay Guidelines ##
- **Layout & Alignment:** The Menu Overlay must use a percent-based Grid & Alignment system.
- **Gutters:** Left and right gutters must be exactly `6vw`.
- **Bottom Bar:** The bottom bar should be positioned `10vh` from the bottom.
- **Typography:** All menu items (both primary and sub-menus) must use an `18px` font size, white color (`text-white`), and be strictly left-aligned.
- **Controls Alignment:** The close button and language switcher must be strictly right-aligned, snapping to the precise grid line to match the layout.
- *
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->