# Editorial Emails

A prototype service to render editorial emails.

The motivation is to create something that is decoupled from the main Frontend
repo so that we can move faster.

For the MVP, the core tecnologies are: React, Node, Typescript.

TODOs:

-   [x] lint against a whitelist of [allowed CSS
        properties](https://www.campaignmonitor.com/css/style-element/style-in-head/)
-   [ ] make deployable as a lambda
-   [ ] implement the [film-today](https://www.theguardian.com/email/film-today)
        front

On the CSS side, emails have some significant restrictions, which is it
important to be aware of:

-   almost all styles should be inlined (as style attributes on elements)
-   inline styles do not support pseudo-selectors and media questions, which we
    want to support, so we do these in the head, although <style> in the head is
    not universally supported
-   modern layout approaches (flex/grid) are not supported so stick to _tables
    and floats_
