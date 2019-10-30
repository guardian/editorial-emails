# Editorial Emails

A prototype service to render editorial emails.

The motivation is to create something that is decoupled from the main Frontend
repo so that we can move faster.

For the MVP, the core tecnologies are: React, Node, Typescript.

    $ yarn install // install deps
    $ yarn dev // run locally
    $ yarn [test|tslint|tsc|..] // see package.json scripts for options here

TODOs:

-   [x] lint against a whitelist of [allowed CSS
        properties](https://www.campaignmonitor.com/css/style-element/style-in-head/)
-   [x] add test framework
-   [x] integrate with src-foundations, esp typography
-   [ ] provide layout (table) helpers
-   [ ] implement the [film-today](https://www.theguardian.com/email/film-today)
        front
-   [ ] make deployable as a lambda

On the CSS side, emails have some significant restrictions, which is it
important to be aware of:

-   almost all styles should be inlined (as style attributes on elements)
-   inline styles do not support pseudo-selectors and media questions, which we
    want to support, so we do these in the head, although <style> in the head is
    not universally supported
-   modern layout approaches (flex/grid) are not supported so stick to tables
-   there are various limitations about where you can use padding

Specifically, for layout:

-   only use tables for layout
-   set width on `table` elements
-   set padding on `td` elements
-   avoid margin (it is unreliable on some older Outlook versions)
-   you can do 'responsive design' by using the 'fluid hybrid' technique (see
    [here](https://www.emailonacid.com/blog/article/email-development/a-fluid-hybrid-design-primer/)).
    Essentially, you use nested tables with `width: 100%` and `max-width: 100px`
    (e.g.). Note, a hack is required for Outlook.

To help stick to these, specific typings have been added to constrain CSS
property use - for example `tableCSS`, which differs from `tdCSS` and so on. See
the `css.ts` file for all available here.

Useful reading:

-   https://www.campaignmonitor.com/css/
-   https://www.emailonacid.com/blog/article/email-development/how-to-code-emails-for-outlook-2016/
-   https://www.emailonacid.com/blog/article/email-development/a-fluid-hybrid-design-primer/
-   https://www.theguardian.com/email/film-today
-   https://github.com/guardian/frontend/blob/master/docs/03-dev-howtos/17-working-with-emails.md#email-rendering
