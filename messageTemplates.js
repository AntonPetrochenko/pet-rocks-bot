const adoptionMessages = [
    (rockName) => `While rustling around your pockets, you find a pebble called ${rockName} in there.`,
    (rockName) => `This is your new pet. No, you don't have a choice in the matter. You were chosen by ${rockName} and are now honor-bound to protect it at all costs.`,
]

const feedMessages = [
    (rockName) => `You give ${rockName} some instant noodles. They are better dry.`,
    (rockName) => `Thank you for your contribution to the survival of rock kind. Please remember to feed it regularly.`
]

const findMessages = [
    (rockName,lastOwnerName) => `You hear knocking on your door. You open your door, but nobody is outside. When you look down, you notice there's a rock on yor doorstep. It introduces itself as ${rockName} and mentions something about ${lastOwnerName} neglecting it.`,
    (rockName,lastOwnerName) => `This rock was abandoned and needs your help! You can adopt it yourself or bring it to the Rock Shelter.`
]
