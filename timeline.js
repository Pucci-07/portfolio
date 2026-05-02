// Random JoJo timeline
const timelineEvents = ['Event 1', 'Event 2', 'Event 3'];
function getRandomEvent() {
    return timelineEvents[Math.floor(Math.random() * timelineEvents.length)];
}