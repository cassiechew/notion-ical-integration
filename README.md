# notion-ical-integration
This is some integration that pulls events from an ical endpoint, then pushes it to a notion database.

## Use
This is built with zero installs so theoretically you will not need to install with yarn.

Pull it then make a ```config.ts``` in the ```src/config/``` folder according to the ```config.sample.ts```.

## Planned features
- Check existing events in notion to not replicate
- Have an observer to watch iCal link for changes for updating to notion
