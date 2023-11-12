export const Button = (props, { slots }) => <button {...props}>slots.default()</button>
export const Input = (props) => <input {...props} />
// export const TimeLine = (props) => {
//   const timeline = [<div class="start">20231108 star career</div>]
//   return <div>{timeline}</div>
// }
