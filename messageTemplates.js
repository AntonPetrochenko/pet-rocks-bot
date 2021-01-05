const adoptionMessages = [
    (rockName) => `While rustling around your pockets, you find a pebble called ${rockName} in there.`,
    (rockName) => `...`,
]

const feedMessages = [
    (rockName) => `You give ${rockName} some instant noodles. They are better dry.`,
    (rockName) => `...`
]

const findMessages = [
    (rockName,lastOwnerName) => `You hear knocking on your door. You open your door, but nobody is outside. When you look down, you notice there's a rock on yor doorstep. It introduces itself as ${rockName} and mentions something about ${lastOwnerName} neglecting it.`,
    (rockName,lastOwnerName) => `...`
]