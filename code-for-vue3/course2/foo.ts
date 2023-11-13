function foo_ts(val: any) {
  return val
}

const res = foo_ts('str')

function foo_ts_generic<T extends any>(val: T): T {
  return val
}

const res_str = foo_ts_generic('str')
