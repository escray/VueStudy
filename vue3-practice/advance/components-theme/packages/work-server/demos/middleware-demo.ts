/* eslint-disable no-console */
const context = {}

async function middleware1(ctx: unknown, next: unknown) {
  console.log('Print 001')
  await next()
  console.log('Print 004')
}

async function middleware2(ctx: unknown, next: unknown) {
  console.log('Before HTTP Response')
  await next()
  console.log('After HTTP Response')
}

async function middleware3(ctx: unknown, next: unknown) {
  console.log('Print 002')
  await next()
  console.log('Print 003');
}

Promise.resolve(
  middleware1(context, async () => {
    return Promise.resolve(
      middleware2(context, async () => {
        return Promise.resolve(
          middleware3(context, async () => {
            return Promise.resolve()
          })
        )
      })
    )
  })
).then(() => {
  console.log('Process End')
})
