
# Globals

Set globals on nodes with "setGlobalTrue": "NAME" or "setGlobalFalse": "NAME".

Check globals on responses with "globalIsFalse:": "NAME" or "globalIsTrue": "NAME".

On responses, "onceOnlyGlobal": "NAME" functions as "globalIsFalse" but also sets the
global to true when the response is chosen.