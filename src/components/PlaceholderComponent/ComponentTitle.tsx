import * as React from "react";

const ComponentTitle = () => <>App Component</>;

// Seems that when using a pure Fragment component, Webpack or Babel does not
// properly include React as a dependency for this file. Referencing React in
// some way forces the inclusion and so the split module will load properly.
React.version;

export default ComponentTitle;
