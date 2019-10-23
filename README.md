# Editorial Emails

A prototype service to render editorial emails.

The motivation is to create something that is decoupled from the main Frontend
repo so that we can move faster.

For the MVP, the core tecnologies are: React, Node, Typescript.

TODOs:

-   [ ] lint against a whitelist of [allowed CSS
        properties](https://www.campaignmonitor.com/css/style-element/style-in-head/)
-   [ ] make deployable as a lambda
-   [ ] implement the [film-today](https://www.theguardian.com/email/film-today)
        front

On the CSS side, emails have some significant restrictions, which is it
important to be aware of:

-   all styles should be inlined (as style attributes on elements)
-   float and older layout methods (no flex/grid)
-   media queries are _mostly_ supported so we will use them
