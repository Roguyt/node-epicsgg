## Pull Request template

Please, go through these steps before you submit a PR.

1. Make sure the title of the Pull Request title respects the [Conventional Commits Spec](https://www.conventionalcommits.org/en/v1.0.0/#summary):

    a. Must be in the following format: `{type}({optional Github issue}): {Description}` (e.g. `feat(#13): My awesome feature`, `docs: Add PR template`).

    b. Type must be one of the following:
    
    - Displayed in changelog:
      * **feat**: A new feature
      * **fix**: A bug fix
      * **perf**: A code change that improves performance
      * **revert**: Revert a previous commit. Will not be shown if in the same release

    - Not displayed in changelog:
      * **improvement**: A feature improvement
      * **refactor**: A code change that neither fixes a bug nor adds a feature
      * **docs**: Documentation only changes
      * **build**: Changes that affect the build system or external dependencies (example scopes: gulp, yarn)
      * **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
      * **test**: Adding missing tests or correcting existing tests
      * **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
      * **chore**: Improving the code base so that it can be worked with more easily

    c. Revert commit format: `revert: {reverted commit title}` (e.g. `revert: feat(#13): My awesome feature`).

2. If your Pull Request includes breaking changes:

    a. Add `BREAKING CHANGE: {Description of the breaking change}` in your PR description. (e.g. `BREAKING CHANGE: Updated parameters of method x`). This MUST me in the squashed commit message.

    b. Add the `breaking change` label to the PR.

**PLEASE REMOVE THIS TEMPLATE BEFORE SUBMITTING**
