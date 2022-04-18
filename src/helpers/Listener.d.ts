export default interface Listener<Events, EventType> {
  name: Events
  cb: (e: EventType) => void
}
