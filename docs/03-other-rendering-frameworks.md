# Other rendering frameworks

There are a number of other optiosn we have for rendering emails, some of which could be integrated into this project to varying degrees. Two of what seem to be the main examples are [Foundation for emails](https://get.foundation/emails.html) and [MJML](https://mjml.io/).

CSS Tricks has a nice overview of the two frameworks in contrast to each other: [Choosing a responsive email framework - CSS Tricks](https://css-tricks.com/choosing-a-responsive-email-framework%E2%80%8Amjml-vs-foundation-for-emails/). We'll also outline some of the research we've done as part of this below.

## Foundation for emails

### Overview

- Uses the [Inky templating language](https://github.com/foundation/inky) to simplify the process of creating responsive emails. It uses simple HTML tags to hide the mass of complex tables needed to build responsive layouts for email.
- Uses SASS and CSS for styling.
- Uses the Gulp build system.
- Incorporates CSS inlining into the build process.
- Requires the [ZURB stack](https://get.foundation/emails/zurb-stack.html) (?? I don't know either...) to use the Inky template language. This seems to basically incorporate all of the above into a single build process.
- The ZURB stack uses the [Panini](https://github.com/foundation/panini) flat file generator which is built off Handlebars. This allows separation of things like header and footer into partials.

### Thoughts and feelings

TBD. I'll let you know when I have some about this.

## MJML

### Overview

- Component based. Has built-in tags such as `<mj-section>` or `<mj-column>` to handle responsive layout design. Does this work with the existing layout?
  - There is the potential to [define your own components as well](https://mjml.io/documentation/#creating-a-component).
- Has a VS code extension to help with linting, previewing, compilation etc.
- Apparently keeps up-to-date with latest changes in email client requirements:
  > The abstraction it offers guarantee you to always be up-to-date with the industry practices and responsive. Email clients update their specs and requirements regularly, but we geek about that stuff - we’ll stay on top of it so you can spend less time reading up on latest email client updates and more time designing beautiful email.
- There is an MJML app that lets you live edit templates, send test emails etc., which might be useful?
