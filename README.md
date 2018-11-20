# Nimiq Documentation Theme

## Motivation
For the [Nimiq Blockchain](https://nimiq.com) we wanted to design a documentation theme which has the following properties:

- Is a Jekyll theme for GitHub Pages, thus very easy to add and use
- Works with multiple `.md` files
- Automatically generates table of contents from filenames and headings
- Clean design focused on the content and its typography
- Mobile layout
- Works without JavaScript
- Adds extra features if JavaScript is enabled, e.g. search

## Installation

In your project's root folder create a `_config.yml` like this:
```
remote_theme: nimiq/doc-theme
title: "Nimiq"
description: "Developer Reference"
```

Your `readme.md` will become your `index.html`.

## Format 

Doc-theme is based on [markdown](https://daringfireball.net/projects/markdown/syntax). 
Markdown is a simple text format that allows you to define links, headings, lists, tables, and more 
(checkout this [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for details)
in a way that keeps the files still human readable and easy to edit.
Doc-theme with the help of Jekyll and Liquid (read more [here](https://jekyllrb.com/)) 
turns these markdown files (files ending with `.md`) 
into a beautiful HTML-based website that can be hosted directly from `github.io`. (See example below)

Just keep there rules in mind:

- Every page must have exactly one `# top-heading`, it will be used in the navigation as label. 
- The top heading should be the first line of each page.
- All other headings should be second-level headings like `## second-level` and below.


## Real World Examples 

- [Nimiq Developer Reference](https://nimiq.com/developer-reference)

## Additional configuration

Following custom configuration can be added to the `_config.yaml` file.

### Submodules 

Doc-Theme automatically detects submodules, i.e. folder with a `README.md` file inside. 
These modules will then be place in a dedicated section at the bottom of the navigation bar.

Submodules can be shown:
- `brief` (default, just show top-level of submodule README.md file), 
- `detailed` (also show second-level headings of each submodule
- `none` (hide submodules section)

And the title of the submodule section can be customized (default: "Submodules").

```
submodules: "detailed"
submodule_section: "Sub-Projects"
```

### Custom HTML

To add custom HTML to the header of the document, e.g. to add custom CSS, JavaScript, and more, 
1. Create a file with your custom HTML and put it into `_includes`
2. Add the file name:

```
custom_header_tags: "custom-header-tags.html"
```

### Exclude files

By default, all markdown files of all subfolders will be included into the resulting doc.
The example below excludes node modules and hidden files like Git files:

```
exclude: ["node_modules/*", "./*/*/**"]
```

## Test and Build your Documentation Locally
To test your documentation before pushing it live follow these steps to set up Jekyll for GitHub pages on your machine.

First, install all pre-requisits (this command will automatically skip what is installed already).

Fedora/RedHat:

```bash
sudo dnf install ruby ruby-devel make gcc redhat-rpm-config zlib-devel
```

Debian/Ubuntu

```bash
sudo apt install ruby ruby-devel make gcc zlib-devel
```

Then, follow [this guide](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) 
but skip step 3.


