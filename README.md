# Classes for working with errors

HttpError and RuntimeError are base classes. You can create new errors by extending them or create a new base class.

This package is publishing automatically after commit to master branch.

If you want to extend it, create a new branch and PR to master.

## Run prepare-husky after the first npm i

If use prepare script, it runs on npm pack and fails because npm pack is in dist dir
