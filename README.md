# Editorial Emails

A prototype service to render editorial emails.

The motivation is to create something that is decoupled from the main Frontend
repo so that we can move faster.

For the MVP, the core tecnologies are: React, Node, Typescript.

    $ yarn install // install deps
    $ yarn dev // run locally
    $ yarn [test|tslint|tsc|..] // see package.json scripts for options here

## Deploying

    $ yarn build
    $ yarn deploy

## Supported Emails & Variants

    Film Today
        Variant B
        Variant Z (archived)

    Media Briefing
        Variant B
        Variant C
        Variant Z (archived)

    Opinion
        Variant B
        Variant C

    Sport AU
        Variant B
        Variant C

## Email and CSS limitations

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

Useful snippets with bug fixes for different email clients:

-   https://litmus.com/community/snippets

## Special fixes

Fix #1 - Lotus Notes 8.5 - missing background-color in the footer section.

To fix the problem with the missing background-color on Lotus Notes 8.5, we had to remove inline CSS style which
was setting a 'background-color' to '#333333' and move this styling to 'bgcolor' attribute.
According to Campaign Monitor CSS support (https://www.campaignmonitor.com/css/color-background/background-color/)
background-color is partially supported on the table, which would normally work correctly. However, in the inline styles we were also
adding styles for 'background-repeat', 'background-position' and 'background-image', and all of the above inline styles are not supported in Lotus Notes 8.5.
Because of that, Lotus Notes 8.5 was stripping out all of the inline styles, including 'background-color', which would normally work fine.

More details on the PR can be found here: https://github.com/guardian/editorial-emails/pull/16
